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
use App\Models\Payment;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;


//this class has a bunch of static methods, but i think we're technically supposed to put something like this into what's
//called a service class
class NotificationsController extends Controller 
{
    public function index() {
        //we probably don't need profile_id as a column in the notis table because we can just load it like below
        $notifications = auth()->user()->notifications->load('post')->load('actor.profile')->sortByDesc('updated_at')->values()->toArray();
        
        return Inertia::render('Posts/Notifications')->with(compact(['notifications']));
    }

    //timestamp automatically saved -- we don't need as param
    public static function createFollowNotification($follower_id, $followed_profile_id) {
        $follower_username = User::find($follower_id)->profile->username;

        //need to find user associated with followed profile (profile id might be different from userId)
        $followed_user_id = Profile::find($followed_profile_id)->user->id;

        $newNotification = new Notification();
        $newNotification->message = " started following you.";
        //why are user and profile id both necessary
        $newNotification->receiver_id = $followed_user_id;
        // $newNotification->profile_id = $followed_profile_id;
        $newNotification->read = false;
        $newNotification->actor_id = $follower_id;
        $newNotification->save();

        return $newNotification;

    }

    //delete notification function
    public static function deleteFollowNotification() {

    }

    public static function createLikeNotification($liker_id, $post_id) {
        $notification_receiver_id = Post::find($post_id)->user->id;
        $liker_username = User::find($liker_id)->profile->username;

        $newNotification = new Notification();
        $newNotification->message = " liked your post.";
        $newNotification->receiver_id = $notification_receiver_id;
        // $newNotification->profile_id = User::find($notification_receiver_id)->profile->id;
        $newNotification->read = false;
        $newNotification->post_id = $post_id;
        $newNotification->actor_id = $liker_id;
        $newNotification->save();

        return $newNotification;
    }

    //delete like notification 
    public static function deleteLikeNotification() {

    }

    public static function createPurchaseNotification($buyer_id, $post_id) {
        $notification_receiver_id = Post::find($post_id)->user->id;
        $buyer_username = User::find($buyer_id)->profile->username;

        $newNotification = new Notification();
        $newNotification->message = " bought your post.";
        $newNotification->receiver_id = $notification_receiver_id;
        // $newNotification->profile_id = User::find($notification_receiver_id)->profile->id;
        $newNotification->read = false;
        $newNotification->actor_id = $buyer_id;
        $newNotification->save();

        return $newNotification;
    }
}