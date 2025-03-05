import React from 'react'
import { Link, Head } from '@inertiajs/react'
import Navbar from '@/Components/Navbar'
import NewsLists from '@/Components/Homepage/NewsLists'
import Paginator from '@/Components/Homepage/Paginator'
export default function Homepage(props) {
  console.log(props)
  return (
    <div className=" min-h-screen bg-slate-50">
      <Head title={props.title} />
      {/* navbar */}
      <Navbar />
      {/* content */}
      <div className='flex justify-center items-center gap-4 p-4 flex-col lg:flex-row lg:flex-wrap lg:items-stretch '>
       <NewsLists news={props.news.data} />
      </div>
      <div className="text-black flex items-center justify-center p-8">
        <Paginator meta={props.news.meta} />
      </div>
    </div>
  )
}
