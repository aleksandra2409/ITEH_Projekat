<?php

namespace App\Http\Controllers;

use App\Http\Resources\MovieCollection;
use App\Http\Resources\MovieResource;
use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $movies = Movie::all();
        return new MovieCollection($movies);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)

    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'description' => 'required|string|max:255',
            'year' => 'required|string|max:100',
            'producer_id' => 'required',
            'genre_id' => 'required'
        ]);

        if ($validator->fails())
            return response()->json($validator->errors());

        $movie = Movie::create([
            'name' => $request->name,
            'description' => $request->description,
            'year' => $request->year,
            'producer_id' => $request->producer_id,
            'genre_id' => $request->genre_id,
            'user_id' => Auth::user()->id,
        ]);

        return response()->json(['Post is created successfully.', new MovieResource($movie)]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Movie $movie)
    {
        return new MovieResource($movie);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Movie $movie)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'description' => 'required|string|max:255',
            'year' => 'required|string|max:100',
            'producer_id' => 'required',
            'genre_id' => 'required'
        ]);

        if ($validator->fails())
            return response()->json($validator->errors());

        $movie->name = $request->name;
        $movie->description = $request->description;
        $movie->year = $request->year;
        $movie->producer_id = $request->producer_id;
        $movie->genre_id = $request->genre_id;

        $movie->save();

        return response()->json(['Post is updated successfully.', new MovieResource($movie)]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Movie $movie)
    {
        $movie->delete();

        return response()->json('Movie is deleted successfully!');
    }
}
