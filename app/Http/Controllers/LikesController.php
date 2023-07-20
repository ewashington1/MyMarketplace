<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Like;
use App\Models\Post;

class LikesController extends Controller
{
    public function store(Request $request) {
        $request->validate([
            //checking if post_id is in request and exists in posts table
            'post_id' => 'required|exists:posts,id'
        ]);

        $post = Post::find($request->post_id);

        //finds like if already exists, creates if not
        $like = Like::firstOrCreate([
            'user_id' => auth()->id(),
            'post_id' => $post->id,
        ]);

        if ($like->wasRecentlyCreated) {
            // A new like was created
            //true for like
            $post_id = $request->post_id;
            $liker_id = auth()->id();
            NotificationsController::createLikeNotification($liker_id, $post_id);
            return true;
        } else {
            // The like already existed, so we delete it
            $like->delete();
            //false for not like
            return false;
        }     
    }

    public function index() {
        $postIds = auth()->user()->likes->pluck('post_id');

        $posts = Post::whereIn('id', $postIds)->get();

        return $posts;
    }
}
