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
use Illuminate\Support\Facades\Auth;


class NotificationsController extends Controller 
{
    public function index() {
        return Inertia::render('Posts/Notifications');
    }
}