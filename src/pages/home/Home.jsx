import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import './home.css'
import { Context } from "../../contextApi/ContextProvider";
const Home = () => {
    const { setSearch, navData, setTextSearch, toTitleCase, isloading } = useContext(Context);
    // console.log(navData);






    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.searchtext.value)
        setTextSearch(e.target.searchtext.value)
    }

    return (
        <section className="md:flex bg-base-200 min-h-[88vh]">
            <div className=" md:block hidden  md:w-3/12 lg:w-3/12 md:pl-1 lg:pl-3">

                {/* searching functionality for devices of large*/}
                <div className="my-4 relative ">
                    <form onSubmit={handleSearch}>
                        <input className=" md:w-[70%] lg:w-[80%] pl-1 h-10" placeholder="Search" type="text" name="searchtext" id="" />
                        <button className="bg-slate-500 h-[41px] relative top-[1px] rounded w-10 text-white"><FaSearch className="relative left-3"></FaSearch></button>
                    </form>
                </div>

                <section className="max-h-[82vh] overflow-y-auto ">
                    {
                        isloading === true && <div className="h-[500px] flex justify-center items-center"><span className="loading loading-bars loading-lg block"></span></div>
                    }

                    {/* for updating the side bar */}
                    {
                        navData.map((data, index) => <section key={index} className=" px-3 py-1 text-justify ">
                            <h3 className="text-center roboto-bold text-slate-600 text-xl">{data?.category}</h3>

                            {
                                data?.documents &&
                                data?.documents?.map((document, index) => <NavLink  key={index} to={`/docs/blog/details/${document?._id}`}  ><p className="py-1 my-1 roboto-regular px-2 hover:bg-gray-300">{toTitleCase(document?.tag)}</p></NavLink>)
                            }

                            {data?.documents && <div className="border-t-2 border-slate-600 my-2"></div>}


                        </section>)
                    }







                </section>

            </div>

            {/* main content in the home page */}
            <div className="overflow-y-auto  w-full md:w-9/12 lg:w-9/12 ">
                <div className="card  bg-base-100 rounded-none ">
                    <Outlet></Outlet>
                </div>
            </div>
        </section>
    );
};

export default Home;