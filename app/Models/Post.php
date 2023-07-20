<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $guarded = [];

    //includes the value of the is_liked_by_auth_user attribute in the JSON of Post model
    protected $appends = ['is_liked_by_auth_user'];

    //notice naming convention between attribute and this function below
    public function getIsLikedByAuthUserAttribute() {
        $authUser = auth()->user();

        return $authUser->likes->contains(Post::find($this->id));
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function likes() {
        return $this->hasMany(Like::class);
    }

    public function categories() {
        return $this->belongsToMany(Category::class);
    }

    
}
