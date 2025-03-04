import React from 'react'
import { Link, Head } from '@inertiajs/react'
import Navbar from '@/Components/Navbar'
import NewsLists from '@/Components/Homepage/NewsLists'
export default function Homepage(props) {
  console.log(props)
  return (
    <div className=" min-h-screen bg-slate-50">
      <Head title={props.title} />
      {/* navbar */}
      <Navbar />
      {/* content */}
      <div className='flex justify-center items-center gap-4 flex-col lg:flex-row lg:flex-wrap lg:items-stretch mt-8'>
       <NewsLists news={props.news.data} />
      </div>
    </div>
  )
}
