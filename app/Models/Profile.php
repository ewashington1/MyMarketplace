<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Profile extends Model
{
    use HasFactory;

    protected $appends = ['is_followed_by_auth_user'];

    public function followers() {
        return $this->belongsToMany(User::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function notifications() {
        return $this->belongsToMany(Notification::class);
    }

    protected $fillable = [
        'displayName',
        'bio',
        'url',
        'pfp,',
        'username'
    ];

    public function getIsFollowedByAuthUserAttribute() {
        return $this->followers->contains(auth()->user());
    }


}

