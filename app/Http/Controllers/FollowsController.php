<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FollowsController extends Controller
{

    public function __construct() {
        $this->middleware('auth');
    }
    
    public function store(\App\Models\User $user){
        $follower_id = auth()->id();
        $followed_profile_id = $user->profile->id;
    
        // Toggle the follow
        $result = auth()->user()->following()->toggle($user->profile);
    
        // Check if a new entry was created
        if (!empty($result['attached'])) {
            // A new entry was created, so create the notification
            NotificationsController::createFollowNotification($follower_id, $followed_profile_id);
        }
    
        return $result;
    }
    
}
