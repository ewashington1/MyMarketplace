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

        $initPosts = Post::whereIn('user_id', $users)->with('user')->latest()->take(9)->get(); //user id is in users

        if (sizeof($initPosts) == 0) {
            $allProfiles = Profile::all()->load(['user', 'user.posts']);
            return Inertia::render('LoggedInPages/UsersPreview')->with(compact('allProfiles'));
        }

        $initPosts->load('user.profile'); 

        $initPostCount = 9;

        $totalPostCount = Post::count();
        return Inertia::render('Posts/Index')->with(compact(['initPosts', 'initPostCount', 'totalPostCount']));
    }

    public function addPostsHome(Request $request) {
        $users = auth()->user()->following()->pluck('profiles.user_id');

        $curCount = $request->curCount;

        $nextPosts = Post::whereIn('user_id', $users)->with('user', 'user.profile')->latest()->skip($curCount)->take(3)->get();

        return $nextPosts;
    }

    public function explore() {
        $initPosts = Post::latest()->take(9)->get();

        $initPostCount = 9;

        $totalPostCount = Post::count();

        return Inertia::render('Posts/Explore')->with(compact(['initPosts', 'initPostCount', 'totalPostCount']));
    }

    public function addPostsExplore(Request $request) {
        $curCount = $request->curCount;

        $nextPosts = Post::latest()->skip($curCount)->take(3)->get();

        return $nextPosts;
    }

    public function store() {
        $data = request()
        ->validate([
            'image' => 'required|image',
            'price' => 'nullable|numeric',
            'caption' => 'string|max:191'
        ]);
        
        $imagePath = request('image')->store('Uploads', 'public');

        $image = Image::make(public_path("storage/{$imagePath}"))->fit(1200,1200);
        $image->save();
        
        $post = auth()->user()->posts()->create([
            'caption' => request('caption'),
            'image' => $imagePath,
            'price' => request('price')
        ]);

        

        if (request()->categories != null) {
            // Get the IDs of the categories based on their names
            $categoryIds = Category::whereIn('category', request()->categories)->pluck('id')->toArray();

            // Attach the category IDs to the post
            $post->categories()->attach($categoryIds);
        }
        
        
        return redirect('/profile/' . auth()->user()->id);


        //can also post kind of like as follows (like in tinker):
        //$post = new App\Models\Post();
        //$post->caption = $data['caption'];
        //$post->save();

        // dd(request()->all()); //gets the request a displays it
    }

    public function update(Request $request) {
        $data = request()->validate([
            'postId' => 'required',
            'price' => 'nullable|numeric',
            'caption' => 'string|max:191',
            'categories' => 'nullable'
        ]);
    
        // Retrieve the post
        $post = Post::find($data['postId']);
    
        // Update post attributes
        if (array_key_exists('price', $data)) {
            $post->price = $data['price'];
        }
        if (array_key_exists('caption', $data)) {
            $post->caption = $data['caption'];
        }
        $post->save();
    
        if (array_key_exists('categories', $data)) {
            $category_ids = Category::whereIn('category', $data['categories'])->pluck('id');
            // Sync the categories
            $post->categories()->sync($category_ids);
        }
    
        return "Success!";
    }
    

    public function edit($postId) {
        $postP = Post::find($postId);
        $postCategories = $postP->categories()->get()->pluck('category');
        $categories = Category::all();
        $owner_id = $postP->user->id;
    
        if (auth()->user()->id === $owner_id) {
            return Inertia::render('Posts/EditPost')->with(compact('postP', 'postCategories', 'categories', 'owner_id'));
        } else {
            return response()->json(['error' => 'Unauthorized'], 404);
        }
    }

    public function show(\App\Models\Post $post) {

        $user = $post->user->load('profile');

        $authUser = auth()->user();

        $userHasLikedPost = $authUser->likes->contains('post_id', $post->id);

        return Inertia::render('Posts/Show')->with(compact(['post', 'user'])); //same as Inertia::render('Posts/Show')->with(['post'=>$post]);
    }

    public function sales() {
        $sales = Payment::where('seller_id', Auth::id())->get();

        return Inertia::render('Posts/Sales')->with(compact(['sales']));
    }

    public function purchases() {
        $purchases = Payment::where('buyer_id', Auth::id())->get();

        return Inertia::render('Posts/Purchases')->with(compact(['purchases']));
    }
}
