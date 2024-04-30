import { useContext, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { FaSearch } from "react-icons/fa";
import './layout.css'
import { Context } from "../../contextApi/ContextProvider";
const Layout = () => {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false)

    const { user, handleLogout, setSearch, dbUser, navData, setTextSearch } = useContext(Context);
    // console.log(homedata);


    const logout = () => {
        handleLogout()
            .then(result => console.log(result?.user))
            .catch(error => console.log(error?.message))
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.searchtext.value)
        setTextSearch(e.target.searchtext.value)
    }

   
console.log(sidebarIsOpen)



    return (
        <div className="drawer bg-gray-50">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div  className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="w-full navbar  bg-base-300">
                    <div className="flex-none overflow-hidden  lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            {
                                sidebarIsOpen ?
                                    <ImCross onClick={() => setSidebarIsOpen(!sidebarIsOpen)}  ></ImCross>
                                    :
                                    <svg onClick={() => setSidebarIsOpen(!sidebarIsOpen)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            }

                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2 text-2xl font-semibold flex justify-between">
                        <div className="md:w-4/12 text-gray-700"> DevZone</div>
                        <div className="flex-none md:w-8/12">
                            {/* <ul className="menu menu-horizontal"> */}
                            <ul className="flex gap-4 text-sm">

                                {/* Navbar menu content here */}
                                <li className="hidden lg:block"><NavLink to='/'>Home</NavLink>
                                </li>
                                {
                                    dbUser?.role === 'admin' && user && <li className="hidden lg:block"><NavLink to='/upload'>Upload</NavLink></li>
                                }
                                <li className="hidden lg:block"><NavLink to='/about-us'>About Us</NavLink></li>

                                {
                                    user ?
                                        // <li className="block md:hidden"><button onClick={logout}>Logout</button></li>

                                        <div className="dropdown dropdown-end block md:hidden ">
                                            <div tabIndex={0} role="button" className="btn m-1">
                                                <li className="block md:hidden">
                                                    <div className="flex gap-2 items-center">
                                                        <img className="w-6 h-6 rounded-xl" src={user?.photoURL} alt={user?.displayName} />
                                                    </div>
                                                </li>
                                            </div>
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 ">
                                                <li>{user?.displayName}</li>
                                                <li>
                                                    <button className="btn btn-active btn-ghost hover:bg-slate-500 hover:text-white mt-3" onClick={logout}>Logout</button>
                                                </li>
                                            </ul>
                                        </div>


                                        :
                                        <li className="block md:hidden"><NavLink to='/login'>Login</NavLink></li>
                                }
                            </ul>
                        </div>
                    </div>

                    <div className="flex-none hidden md:block">
                        {/* <ul className="menu menu-horizontal"> */}
                        <ul className="flex gap-4">
                            {/* Navbar menu content here */}
                            {
                                // user && <li><button onClick={logout}>logout</button></li>
                                user &&
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn m-1">
                                        <li className="hidden md:block">
                                            <div className="flex gap-2 items-center">
                                                <img className="w-6 h-6 rounded-xl" src={user?.photoURL} alt={user?.displayName} />
                                            </div>
                                        </li>
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <li>{user?.displayName}</li>
                                        <li>
                                            <button className="btn btn-active btn-ghost hover:bg-slate-500 hover:text-white mt-3" onClick={logout}>Logout</button>
                                        </li>
                                    </ul>
                                </div>
                            }
                            {
                                !user && <li className="pr-4"><NavLink to='/login'>Login</NavLink></li>
                            }
                        </ul>
                    </div>
                </div>
                {/* Page content here */}
                <Outlet />
            </div>
            <div className="drawer-side mt-16">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 flex">
                    {/* Sidebar content here */}
                    <div className="flex gap-7">
                        <div className=" underline w-fit hover:bg-slate-500 hover:text-white hover:rounded p-2 px-[18px]"><NavLink   className='' to='/'>Home</NavLink></div>
                        <span className="h-8 my-auto border border-black"></span>
                        <div className="hover:bg-slate-500 p-2 px-[19px] hover:text-white hover:rounded underline w-fit">
                            {
                                dbUser?.role === 'admin' && user ? <NavLink   to='/upload'>Upload</NavLink> : <NavLink   to='/about-us'>About us</NavLink>
                            }

                        </div>
                    </div>

                    {/* search functionality for mobile device */}
                    <div className="my-4 relative ">
                        <form onSubmit={handleSearch} >
                            <input className="border-[2px] w-[75%] lg:w-[80%] pl-1 h-10" placeholder="Search" type="text" name="searchtext" id="" />
                            <button className="bg-slate-500 h-[41px] relative top-[1px] rounded w-10 text-white"><FaSearch className="relative left-3"></FaSearch></button>
                        </form>
                    </div>
                    {/* dynamic part is here */}
                    <section className="border border-black h-[400px] overflow-y-auto">
                        {
                            navData.map((data, index) => <section key={index} className=" px-3 py-1  text-justify">

                                <h3 className="text-center font-bold text-slate-600 text-xl">{data?.category}</h3>
                                {
                                    data?.documents &&
                                    data?.documents?.map((document, index) => <NavLink  onClick={()=>setSidebarIsOpen(sidebarIsOpen)} key={index} to={`/docs/blog/details/${document?._id}`}><p className="px-2 rounded">{document?.tag}</p></NavLink>)
                                }
                                <div className="border-t-2 border-slate-600 mt-3"></div>

                            </section>)
                        }



                    </section>
                </ul>
            </div>
        </div>
    );
};

export default Layout;