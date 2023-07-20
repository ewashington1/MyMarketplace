<?php

use App\Http\Controllers\PostsController;
use App\Http\Controllers\ChirpController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\NotificationsController;
use App\Http\Controllers\LikesController;


use App\Http\Controllers\FollowsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SearchController;
use App\Mail\NewUserWelcomeMail;
use App\Models\Category;



/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/email', function() {
    return new NewUserWelcomeMail();
});

//dashboard
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.updatePublic'); //update Public
});

Route::post('/follow/{user}', [FollowsController::class, 'store'])->name('follow.user');

Route::get('/home', [PostsController::class, 'index'])->name('home');

//explore
Route::get('/explore', [PostsController::class, 'explore'])->name('explore');

//search
Route::get('/search', function() {
    return Inertia::render('LoggedInPages/Search');
})->middleware(['auth', 'verified'])->name('search');

//categories
Route::get('/categories', function() {
    $categories = Category::get();
    return Inertia::render('Posts/Categories')->with(compact(['categories']));
})->middleware(['auth', 'verified'])->name('categories');

//purchases
Route::get('/purchases', [PostsController::class, 'purchases'])->middleware(['auth', 'verified'])->name('purchases');

//sales
Route::get('/sales', [PostsController::class, 'sales'])->middleware(['auth', 'verified'])->name('sales');

//notification
// Route::get('/notification', function() {
//     return Inertia::render('LoggedInPages/Notifications');
// })->middleware(['auth', 'verified'])->name('notification');

//user profile
Route::get('/profile/{user}', [ProfileController::class, 'index'])->name('profile.show');

Route::get('/search', function() {
    return Inertia::render('Posts/Search');
})->name('search');

Route::post('/search', [SearchController::class, 'index'])->name('searchCompletion');
// Route::get('/search/{searchTerm}', [SearchController::class, 'index'])->name('getSearchCompletion');

// //edit profile
// Route::get('/profile/{user}/edit', [ProfileController::class, 'edit'])->name('profile.edit');

Route::get('/post/create', [PostsController::class, 'create'])->name('post.create');
Route::post('/post', [PostsController::class, 'store'])->name('post');

Route::get('/post/{post}', [PostsController::class, 'show'])->name('post.show');

Route::post('pay', [PaymentController::class, 'pay'])->name('payment');
Route::get('success', [PaymentController::class, 'success']);
Route::get('error', [PaymentController::class, 'error']);

//try to use api for the following functions
Route::get('/addPostsExplore', [PostsController::class, 'addPostsExplore']);
Route::get('/addPostsHome', [PostsController::class, 'addPostsHome']);
Route::get('/addPostsSearch', [SearchController::class, 'addPostsSearch']);
Route::get('/addPostsCategories', [SearchController::class, 'addPostsCategories']);


//filter for categories (use api)
Route::get('/filter', [SearchController::class, 'categoryIndex']);

//why the name?
Route::get('/notifications', [NotificationsController::class, 'index'])->name('notifications');

Route::post('/likes', [LikesController::class, 'store'])->name('likes.store');

require __DIR__.'/auth.php';
