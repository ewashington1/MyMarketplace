<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $guarded = [];    

    public function user() {
        //specifies that the column name is receiver_id in the table
        return $this->belongsTo(User::class, 'receiver_id');
    }

    public function post() {
        return $this->belongsTo(Post::class);
    }

    public function actor() {
        return $this->belongsTo(User::class, "actor_id");
    }

}
