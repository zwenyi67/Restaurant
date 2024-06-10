<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MenuFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->sentence($nbWords = 3),
            'image' => $this->faker->imageUrl($width = 640, $height = 480),
            'price' => $this->faker->randomFloat(2, 10, 1000),
            'status' =>  'available',
            'menu_type_id' => '1',
            'description' => $this->faker->paragraph($nbSentences = 3, $variableNbSentences = true), 
        ];
    }
}
