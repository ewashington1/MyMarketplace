<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function index(Request $request) {
        $allPosts = Post::with('user')->latest()->get();
        $posts = [];


        if ($request->searchBy == "Caption") {
            foreach($allPosts as &$post) {
                if(str_contains($post->caption, $request->searchTerm)) {
                    array_push($posts, $post);
                    
                    $post->user->load('profile');
                }
            }
        }

        if ($request->searchBy == "Category") {

            $categories = $request->searchTerm;

            foreach($allPosts as &$post) {
                $bool = false;
                foreach($categories as &$cat) {
                    $bool = str_contains($post->categories, $cat);
                    if(!$bool) {
                        break;
                    }
                }
                if ($bool) {
                    $post->user->load('profile');
                    array_push($posts, $post);
                }
            }
            if (empty($posts)) {
                return Inertia::render('Posts/NoPostsFound')->with(compact(['categories']));
            }
        }



        return Inertia::render('Posts/Index')->with(compact(['posts']));



    }
}
