<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $userList = [
            [
                'name' => 'John Doe',
                'email' => 'johndoe@gmail.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Jane Doe',
                'email' => 'janedoe@gmail.com',
                'password' => Hash::make('password'),
            ],
        ];

        DB::table('users')->insert($userList);

        User::factory(10)->create();
    }
}
