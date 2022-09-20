<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;

class ProducerMovieController extends Controller
{
    public function index($producer_id)
    {
        $movies = Movie::get()->where('producer_id', $producer_id);
        if (is_null($movies))
            return response()->json('Data not found!', 404);
        return response()->json($movies);
    }
}
