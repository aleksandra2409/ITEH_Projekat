<?php
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\GenreMovieController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\ProducerController;
use App\Http\Controllers\ProducerMovieController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('producers', [ProducerController::class, 'index']);
Route::get('producer/{id}', [ProducerController::class, 'show']);

Route::get('genres', [GenreController::class, 'index']);
Route::get('genre/{id}', [GenreController::class, 'show']);

Route::resource('movies', MovieController::class)->only(['index']);

Route::resource('producers.movies', ProducerMovieController::class)->only(['index']);
Route::resource('genres.movies', GenreMovieController::class)->only(['index']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/user', function (Request $request) {
        return auth()->user();
    });
    Route::resource('movies', MovieController::class)->only(['update', 'store', 'destroy']);

    Route::post('/logout', [AuthController::class, 'logout']);
});