<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class RestaurantTableFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'number' => $this->faker->unique()->numberBetween(1, 20),
            'capacity' => $this->faker->numberBetween(2, 12),
            'location' => $this->faker->randomElement(['Indoor', 'Outdoor', 'Window-side']),
            'status' => 'available',
            'description' => $this->faker->sentence(),
        ];
    }
}
