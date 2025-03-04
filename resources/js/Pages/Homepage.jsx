import React from "react"
import { Link, Head } from "@inertiajs/react"
import Navbar from "@/Components/Navbar"
export default function Homepage(props){
    console.log(props)
    return(

        <div className=" min-h-screen bg-slate-50">
             <Navbar />
            <Head title={props.title}/>
            <div>
                {props.news ? props.news.map((data, i) => {
                    return(
                        <div key={i} className="p-4 m-4 bg-white text-black shadow-lg rounded-md">
                            <p className="text-2xl">{data.title}</p>
                            <p className="text-sm">{data.description}</p>
                            <i>{data.category}</i> <br />
                            <i>{data.author}</i>
                        </div>
                    )
                }) :
                    <p>No data</p>
                }
            </div>
        </div>
    )
}
