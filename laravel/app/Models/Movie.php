<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;

    protected $fillable  = ['name', 'description', 'year', 'producer_id', 'genre_id', 'user_id'];

    public function producer()
    {
        return $this->belongsTo(Producer::class);
    }

    public function genre()
    {
        return $this->belongsTo(Genre::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
