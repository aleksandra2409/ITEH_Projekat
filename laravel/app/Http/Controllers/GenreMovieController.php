<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;

class GenreMovieController extends Controller
{
    public function index($genre_id)
    {
        $movies = Movie::get()->where('genre_id', $genre_id);
        if (is_null($movies))
            return response()->json('Data not found!', 404);
        return response()->json($movies);
    }
}
