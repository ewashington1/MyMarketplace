<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use Intervention\Image\Facades\Image;
use App\Models\Post;
use App\Models\Category;
use App\Models\Profile;

class PostsController extends Controller
{

    public function __construct() {
        $this->middleware('auth');
    }

    public function create() {
        $categories = Category::get();

        return Inertia::render('Posts/Create')->with(compact(['categories']));
    }

    public function index() {
        $users = auth()->user()->following()->pluck('profiles.user_id');

        $posts = Post::whereIn('user_id', $users)->with('user')->latest()->get(); //user id is in users

        if (sizeof($posts) == 0) {
            $allProfiles = Profile::all()->load(['user', 'user.posts']);
            return Inertia::render('LoggedInPages/UsersPreview')->with(compact('allProfiles'));
        }

        foreach ($posts as &$post) {
            $user = $post->user;
            $user->load('profile'); // Load the "profile" relation for the user
        }

        return Inertia::render('Posts/Index')->with(compact(['posts']));
    }

    public function store() {
        $data = request()
        ->validate([
            'image' => 'required|image',
        ]);
        
        $imagePath = request('image')->store('Uploads', 'public');

        $image = Image::make(public_path("storage/{$imagePath}"))->fit(1200,1200);
        $image->save();

        auth()->user()->posts()->create([
            'caption' => request('caption'),
            'image' => $imagePath,
            'categories' => implode(request('categories')),
            'price' => request('price')
        ]);
        
        return redirect('/profile/' . auth()->user()->id);


        //can also post kind of like as follows (like in tinker):
        //$post = new App\Models\Post();
        //$post->caption = $data['caption'];
        //$post->save();

        // dd(request()->all()); //gets the request a displays it
    }

    public function show(\App\Models\Post $post) {

        $user = $post->user->load('profile');

        return Inertia::render('Posts/Show')->with(compact(['post', 'user'])); //same as Inertia::render('Posts/Show')->with(['post'=>$post]);
    }
}
