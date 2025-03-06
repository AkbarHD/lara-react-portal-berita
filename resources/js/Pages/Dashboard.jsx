import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { useState, useEffect } from 'react'
import { Inertia } from '@inertiajs/inertia'

export default function Dashboard({ auth, flash, myNews }) {
  // harus sama isi parameter dengan yang dikirim dari controller
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [isNotif, setIsNotif] = useState(false)
  const [newsToDelete, setNewsToDelete] = useState(null) // Untuk menyimpan berita yang ingin dihapus

  useEffect(() => {
    console.log('Flash message:', flash)
    console.log('My News:', myNews) // cek apakah ada data myNews
    if (flash.message) {
      setIsNotif(true)
      setTimeout(() => setIsNotif(false), 3000) // Notifikasi hilang setelah 3 detik
    }
  }, [flash, myNews])

  //   handleSubmit() akan mengirim data ke route /news dengan method POST
  const handleSubmit = () => {
    const data = {
      title,
      description,
      category,
    }
    Inertia.post('/news', data, {
      preserveState: true,
      onSuccess: () => {
        setTitle('')
        setDescription('')
        setCategory('')
      },
    })
  }

  //  handleDelete() akan menghapus data berita berdasarkan ID
  const handleDelete = (id) => {
    // if (confirm('Yakin ingin menghapus berita ini?')) {
    //   Inertia.delete(`/news/${id}`)
    // }

    if (newsToDelete) {
      Inertia.delete(`/news/${newsToDelete.id}`, {
        onSuccess: () => setNewsToDelete(null),
      })
    }
  }

  // handleEdit() akan mengarahkan ke halaman edit berita
  const handleEdit = (id) => {
    Inertia.get(`/news/${id}/edit`)
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Berita saya
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6  ">
            {/* Notifikasi dengan DaisyUI */}
            {isNotif && (
              <div
                key={flash.message}
                className="alert alert-success shadow-lg mb-4"
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>{flash.message}</span>
                </div>
              </div>
            )}
            <input
              type="text"
              placeholder="Type here"
              className="input m-2 w-full rounded-lg"
              onChange={(title) => setTitle(title.target.value)}
            />
            <input
              type="text"
              placeholder="Type here"
              className="input m-2 w-full rounded-lg"
              onChange={(description) =>
                setDescription(description.target.value)
              }
            />
            <input
              type="text"
              placeholder="Type here"
              className="input-2 w-full m-2 rounded-lg"
              onChange={(category) => setCategory(category.target.value)}
            />
            <button className="btn btn-primary m-2" onClick={handleSubmit}>
              Submit
            </button>
            {/* <button className="btn btn-primary m-2" onClick={handleSubmit}>Submit</button> */}
          </div>
        </div>

        {/* Data Berita */}
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-10">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2 text-black">Daftar Berita</h2>

            {/* Looping Berita */}
            {myNews.length > 0 ? (
              myNews.map((news) => (
                <div
                  key={news.id}
                  className="card bg-base-100 w-full lg:w-96 shadow-sm mb-4"
                >
                  <div className="card-body">
                    <h2 className="card-title">
                      {news.title}
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>{news.description}</p>
                    <div className="card-actions justify-end">
                      <div className="badge badge-outline">{news.category}</div>
                      <button
                        onClick={() => handleEdit(news.id)}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </button>
                      {/* <button onClick={() => handleDelete(news.id)} className="btn btn-error btn-sm">Delete</button> */}
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => setNewsToDelete(news)}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Belum ada berita.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal Konfirmasi Hapus */}
      {newsToDelete && (
        <dialog id="delete-modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Konfirmasi Hapus</h3>
            <p className="py-4">
              Apakah Anda yakin ingin menghapus berita "
              <b>{newsToDelete.title}</b>"?
            </p>
            <div className="modal-action">
              <button className="btn btn-error" onClick={handleDelete}>
                Hapus
              </button>
              <button className="btn" onClick={() => setNewsToDelete(null)}>
                Batal
              </button>
            </div>
          </div>
        </dialog>
      )}
    </AuthenticatedLayout>
  )
}
