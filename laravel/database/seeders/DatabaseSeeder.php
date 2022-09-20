<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Genre;
use App\Models\Movie;
use App\Models\Producer;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Producer::truncate();
        Genre::truncate();
        Movie::truncate();
        User::truncate();

        $user = User::factory()->create();

        $producer1 = Producer::factory()->create();
        $producer2 = Producer::factory()->create();
        $producer3 = Producer::factory()->create();
        $producer4 = Producer::factory()->create();
        $producer5 = Producer::factory()->create();

        $genre1 = Genre::factory()->create(['name' => 'akcija']);
        $genre2 = Genre::factory()->create(['name' => 'drama']);
        $genre3 = Genre::factory()->create(['name' => 'komedija']);

        Movie::factory(5)->create([
            'producer_id' => $producer1->id,
            'genre_id' => $genre1->id,
            'user_id' => $user->id
        ]);

        Movie::factory(5)->create([
            'producer_id' => $producer2->id,
            'genre_id' => $genre1->id,
            'user_id' => $user->id
        ]);

        Movie::factory(5)->create([
            'producer_id' => $producer3->id,
            'genre_id' => $genre2->id,
            'user_id' => $user->id
        ]);

        Movie::factory(5)->create([
            'producer_id' => $producer4->id,
            'genre_id' => $genre2->id,
            'user_id' => $user->id
        ]);

        Movie::factory(5)->create([
            'producer_id' => $producer5->id,
            'genre_id' => $genre3->id,
            'user_id' => $user->id
        ]);
    }
}
