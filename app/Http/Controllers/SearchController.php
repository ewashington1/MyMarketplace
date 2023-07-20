<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\Builder;

class SearchController extends Controller
{
    //must adjust for infinite scroll (must send initPosts, initPostCount, totalPostCount)
    public function index(Request $request) {
        $posts = [];

        $initPostCount = 9;

        $searchTerm = $request->searchTerm;

        $posts = Post::where('caption', 'like', '%' . $searchTerm . '%')->latest();

        $initPosts = $posts->latest()->take(9)->get()->load('user.profile');

        $totalPostCount = $posts->count();

        return Inertia::render('Posts/SearchIndex')->with(compact(['initPosts', 'totalPostCount', 'initPostCount', 'searchTerm']));
    }

    //must implement addPosts for infinite scroll (must send next 3 posts)
    public function addPostsSearch(Request $request) {
        $curCount = request()->curCount;

        $nextPosts = Post::where('caption', 'like', '%' . $request->searchTerm . '%')->latest()->skip($curCount)->take(3)->get()->load('user.profile');

        return $nextPosts;
        
    }


    //this is probably terrible runtime tbh
    public function categoryIndex(Request $request) {
        $categories = $request->categories;

        $allPosts = Post::whereHas('categories', function ($query) use ($categories) {
            $query->whereIn('category', $categories);
        });

        $totalPostCount = $allPosts->count();
        $posts = $allPosts->latest()->take(9)->get();

        if (count($posts) === 0) {
            return "No posts with matching categories:";
        }

        return [
            'posts' => $posts,
            'totalPostCount' => $totalPostCount
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
