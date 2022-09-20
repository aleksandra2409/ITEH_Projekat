<?php

namespace Database\Factories;

use App\Models\Genre;
use App\Models\Producer;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Movie>
 */
class MovieFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->word(),
            'description' => $this->faker->paragraph(),
            'year' => $this->faker->year(),
            'producer_id' => Producer::factory(),
            'genre_id' => Genre::factory(),
            'user_id' => User::factory()        ];
    }
}
