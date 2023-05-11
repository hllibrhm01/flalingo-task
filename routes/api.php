<?php

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

Route::post('/login', [App\Http\Controllers\Api\Auth\AuthController::class,'authenticate']);
Route::post('/register', [App\Http\Controllers\Api\Auth\AuthController::class,'register']);

Route::group(['middleware' => 'auth:sanctum'], function() {
// Route::group(['middleware' => 'auth'], function() {
    Route::get('/auth/user', function (Request $request) {
        return ['data' => $request->user()];
    });
    Route::post('/tasks', [App\Http\Controllers\TaskController::class,'store']);
    Route::get('/tasks', [App\Http\Controllers\TaskController::class,'getAllTasks']);
    Route::get('/tasks/{id}', [App\Http\Controllers\TaskController::class,'getTask']);
    Route::post('/tasks/{id}', [App\Http\Controllers\TaskController::class,'updateTask']);
    Route::delete('/tasks/{id}', [App\Http\Controllers\TaskController::class,'deleteTask']);
    Route::delete('/logout', [App\Http\Controllers\Api\Auth\AuthController::class,'logout']);
});