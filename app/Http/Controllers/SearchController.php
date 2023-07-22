<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Inertia\Inertia;
use App\Models\Profile;
use Illuminate\Database\Eloquent\Builder;

class SearchController extends Controller
{
    //must adjust for infinite scroll (must send initPosts, initPostCount, totalPostCount)
    public function index(Request $request) {
        
        $searchTerm = $request->searchTerm;

        $initPostCount = 9;
        $posts = Post::where('caption', 'like', '%' . $searchTerm . '%')->latest();
        $initPosts = $posts->latest()->take(9)->get()->load('user.profile');
        $totalPostCount = $posts->count();

        $initProfileCount = 9;
        $profiles = Profile::where('username', 'like', '%' . $searchTerm . '%')->latest();
        $initProfiles = $profiles->latest()->take(9)->get()->load('user.profile');
        $totalProfileCount = $profiles->count();

        return compact('initPosts', 'totalPostCount', 'initProfiles', 'totalProfileCount');
    }

    //must implement addPosts for infinite scroll (must send next 3 posts)
    public function addPostsSearch(Request $request) {
        $curCount = $request->curCount;

        $nextPosts = Post::where('caption', 'like', '%' . $request->searchTerm . '%')->latest()->skip($curCount)->take(3)->get();

        return $nextPosts;
        
    }

    public function addProfilesSearch(Request $request) {
        $curCount = $request->curCount;

        $nextProfiles = Profile::where('username', 'like', '%' . $request->searchTerm . '%')->latest()->skip($curCount)->take(9)->get()->load('user.profile');

        return $nextProfiles;
    }


    //this is probably terrible runtime tbh
    public function categoryIndex(Request $request) {
        $categories = $request->categories;

        $allPosts = Post::whereHas('categories', function ($query) use ($categories) {
            $query->whereIn('category', $categories);
        });

        $totalPostCount = $allPosts->count();
        $posts = $allPosts->latest()->take(9)->get();
        $initPostCount = 9;

        if (count($posts) === 0) {
            return "No posts with matching categories:";
        }

        return [
            'posts' => $posts,
            'totalPostCount' => $totalPostCount,
            'initPostCount' => $initPostCount,
        ];
    
    }

    public function addPostsCategories(Request $request) {
        $curCount = $request->curCount;
        $categories = $request->categories;

        $posts = Post::whereHas('categories', function ($query) use ($categories) {
            $query->whereIn('category', $categories);
        })->latest()->skip($curCount)->take(3)->get();

        return $posts;

    }

}
