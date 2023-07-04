<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Requests\PublicProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use App\Models\Profile;
use Intervention\Image\Facades\Image;

class ProfileController extends Controller
{
    public function index($user) { //$user gets id of user
        $user = User::with(['profile', 'posts'])->findOrFail($user); //find works with User model

        
        $follows = (auth()->user()) ? auth()->user()->following->contains($user->id) : false;

        $followers = Cache::remember('count.followers' . $user->id, 
            now()->addSeconds(30),
            function () use ($user) {
                return $user->profile->followers->count();
        }); //only calculates new followers every 30 seconds

        $following = Cache::remember('count.followers' . $user->id, 
            now()->addSeconds(30),
            function () use ($user) {
                return $user->following->count();
        }); //only calculates new followers every 30 seconds

        return Inertia::render('Profiles/Index')->with(['user'=>$user, 'follows' => $follows, 'followers' =>$followers, 'following' => $following]);

    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();
        $profile = $user->profile;

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'profile' => $profile,
            'user' => $user,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {   
        $request->user()->fill($request->validated());
        $request->user()->profile->fill($request->validated());

        $pfpData = $request['pfp'];
        if ($pfpData) {
            $pfpPath = $pfpData->store('profile', 'public');
            $pfp = Image::make(public_path("storage/{$pfpPath}"))->fit(1000,1000);
            $pfp->save();
            auth()->user()->profile()->update([
                'pfp' => $pfpPath
            ]);
        }

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();
        $request->user()->profile->save();

        return Redirect::route('profile.edit');
    }


    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
