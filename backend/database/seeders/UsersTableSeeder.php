<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        DB::table('users')->insert([
            'name' => $faker->name,
            'email' => $faker->unique()->safeEmail,
            'password' => Hash::make('password123'), // Replace with a secure password
            'phone' => $faker->phoneNumber,
            'picture' => $faker->imageUrl(),
            'role' => 'Learner', // You can set different roles (Admin, Mentor, Learner)
            'can_host' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        
        DB::table('users')->insert([
            'name' => $faker->name,
            'email' => $faker->unique()->safeEmail,
            'password' => Hash::make('password123'), // Replace with a secure password
            'phone' => $faker->phoneNumber,
            'picture' => $faker->imageUrl(),
            'role' => 'Mentor', // You can set different roles (Admin, Mentor, Learner)
            'can_host' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // You can add more users here if needed
    }
}
