<?php

use Illuminate\Http\Request;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\SearchController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth')->group(function () {
    Route::get('/notifications', function() {
        auth()->user()->notifications;
    });
    
    Route::get('/addProfilesSearch', [SearchController::class, 'addProfilesSearch']);    
});


