<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('receiver_id');
            // $table->unsignedBigInteger('profile_id');
            $table->string('message');
            $table->boolean('read');
            $table->timestamps();
            $table->index('receiver_id');
            
            //post_id for eloquent relationships between post and noti
            $table->unsignedBigInteger('post_id')->nullable();

            //actor for eloquent relationships between actor (user who made action) and notification
            $table->unsignedBigInteger('actor_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
