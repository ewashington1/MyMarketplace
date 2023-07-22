<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Like;
use App\Models\Post;
use App\Models\Notification;
use Inertia\Inertia;

class LikesController extends Controller
{
    public function store(Request $request) {
        $request->validate([
            //checking if post_id is in request and exists in posts table
            'post_id' => 'required|exists:posts,id'
        ]);

        $post = Post::find($request->post_id);

        $result = auth()->user()->likes()->toggle($request->post_id);

        //if new entry attached on likes table
        if (!empty($result['attached'])) {
            $post_id = $request->post_id;
            $liker_id = auth()->id();
            NotificationsController::createLikeNotification($liker_id, $post_id);
            return true;
        }

        if (!empty($result['detached'])) {
            $post_id = $request->post_id;
            $actor_id = auth()->id();

            $notification = Notification::where('post_id', $post_id)->where('actor_id', $actor_id)->latest();
            if ($notification) {
                $notification->delete();
            }
        }

        return false;

        // //finds like if already exists, creates if not
        // $like = Like::firstOrCreate([
        //     'user_id' => auth()->id(),
        //     'post_id' => $post->id,
        // ]);

        // if ($like->wasRecentlyCreated) {
        //     // A new like was created
        //     //true for like
        //     $post_id = $request->post_id;
        //     $liker_id = auth()->id();
        //     NotificationsController::createLikeNotification($liker_id, $post_id);
        //     return true;
        // } else {
        //     // The like already existed, so we delete it
        //     $like->delete();
        //     //false for not like
        //     return false;
        // }     
    }

    //might be able to make two below functions more efficient
    public function index() {
        $postIds = auth()->user()->likes()->pluck('post_id');

        $initPosts = Post::whereIn('id', $postIds)->latest()->take(9)->get()->load('user.profile');

        $initPostCount = 9;

        $totalPostCount = $postIds->count();

        return Inertia::render('Posts/LikedPosts')->with(compact('initPosts', 'totalPostCount', 'initPostCount'));
    }

    public function addPostsLiked(Request $request) {
        $curCount = $request->curCount;

        $postIds = auth()->user()->likes()->pluck('post_id');

        $nextPosts = Post::whereIn('id', $postIds)->latest()->skip($curCount)->take(3)->get()->load('user.profile');

        return $nextPosts;
    }
}
