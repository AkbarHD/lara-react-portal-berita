import { Link  } from "@inertiajs/react"
const Navbar = ({ user }) => {
    // console.log('apakah user sdah loaging', user)
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Portal Berita</a>
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Search"
                    className="input input-bordered w-24 md:w-auto"
                />
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex="0"
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex="0"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        {!user ? (
                            <>
                                <li>
                                    <Link href={route('login')} as="button">Login</Link>
                                </li>
                                <li>
                                    <Link href={route('register')} as="button">Registert</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li>
                                    <Link href={route('dashboard')} className="justify-between">
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('logout')} method="post" as="button" className="justify-between">
                                        Logout
                                    </Link>
                                </li>
                            </>

                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
