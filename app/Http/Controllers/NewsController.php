<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewsCollection;
use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $news = new NewsCollection(News::latest()->paginate(5));
        // dd($news);
        return Inertia::render('Homepage', [
            'title' => 'Portal Berita',
            'news' => $news
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $news = News::create([
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
            'author' => auth()->user()->email
        ]);

        return redirect()->back()->with('message', 'Data berita berhasil ditambahkan');
    }
    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {

        $myNews = $news::where('author', auth()->user()->email)->get();
        // kalau mau cek dd arahin urlnya ke /news
        // dd($myNews);
        return Inertia::render('Dashboard', [
            'myNews' => $myNews
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(News $news)
    {
        return Inertia::render('EditNews', ['news' => $news]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, News $news)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'category' => 'required',
        ]);

        $news->update([
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
        ]);

        return redirect()->route('dashboard')->with('message', 'Berita berhasil diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $news)
    {
        $news->delete();
        return redirect()->route('dashboard')->with('message', 'Berita berhasil dihapus!');
    }
}
