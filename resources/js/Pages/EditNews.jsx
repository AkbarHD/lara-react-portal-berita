import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'

export default function EditNews({ auth, news, errors }) {
  const { data, setData, put } = useForm({
    title: news.title,
    description: news.description,
    category: news.category,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    put(`/news/${news.id}`)
  }

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Edit Berita" />
      <div className="max-w-7xl mx-auto p-6 bg-white shadow rounded-lg">
        <h2 className="text-xl font-bold mb-4">Edit Berita</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData('title', e.target.value)}
            className="input input-bordered w-full mb-2"
            placeholder="Judul Berita"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
          <input
            type="text"
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
            className="input input-bordered w-full mb-2"
            placeholder="Deskripsi"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
          <input
            type="text"
            value={data.category}
            onChange={(e) => setData('category', e.target.value)}
            className="input input-bordered w-full mb-2"
            placeholder="Kategori"
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </form>
      </div>
    </AuthenticatedLayout>
  )
}
