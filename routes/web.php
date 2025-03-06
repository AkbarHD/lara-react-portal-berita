<?php

use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', [NewsController::class, 'index']);
Route::post('/news', [NewsController::class, 'store']);
// Route::get('/news', [NewsController::class, 'show']);


Route::get('/news/{news}/edit', [NewsController::class, 'edit'])->middleware('auth');
Route::put('/news/{news}', [NewsController::class, 'update'])->middleware('auth');
Route::delete('/news/{news}', [NewsController::class, 'destroy'])->middleware('auth');
Route::get('/dashboard', [NewsController::class, 'show'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
