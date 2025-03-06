import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { useState, useEffect } from 'react'
import { Inertia } from '@inertiajs/inertia'

export default function Dashboard({ auth, flash }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [isNotif, setIsNotif] = useState(false)

  useEffect(() => {
    console.log("Flash message:", flash);
    if (flash.message) {
      setIsNotif(true)
      setTimeout(() => setIsNotif(false), 3000) // Notifikasi hilang setelah 3 detik
    }
}, [])


  const handleSubmit = () => {
    const data = {
      title,
      description,
      category,
    }
    Inertia.post('/news', data, {
        preserveState: true,
        onSuccess: () => {
            setTitle('');
            setDescription('');
            setCategory('');
        },
    });
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
      </div>
    </AuthenticatedLayout>
  )
}
