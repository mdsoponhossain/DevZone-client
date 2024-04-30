import { useContext } from "react";
import CodeSnippet from "../../sharedComponents/codeSnippet/CodeSnippet";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Context } from "../../contextApi/ContextProvider";
import ErrorPage from "../../pages/errorPage/ErrorPage";

const HomeContent = () => {

    const { homedata, toTitleCase, toSentenceCase, isloading, setPageNumber, pageNumber, totalBlogs, convertUTCtoLocal } = useContext(Context);
    // console.log(homedata.length);
    const totalPages = Math.ceil(totalBlogs / 5);
    // console.log(totalPages)

    // console.log(pageNumber)
    const handleSkipData = (value) => {
        // console.log(value)
        if (pageNumber < totalPages - 1 && value === 1) {
            setPageNumber(pageNumber + value);
            // console.log(pageNumber)
        } else if (pageNumber + 1 > 1 && value === -1) {
            setPageNumber(pageNumber + value);
            // console.log(pageNumber)
        }

    }

    // console.log('loading status:', isloading)


    return (
        <div className="relative">
            <section className="max-h-[78vh] min-h-[78vh] overflow-y-auto overflow-x-hidden  rounded-none " >
                {
                    homedata.length !== 0 &&
                    <p className="flex justify-end ">
                        <span className=" fixed  bg-white pr-2 opacity-70 font-semibold">{
                            pageNumber + 1
                        } <span className="px-1">out of</span> {totalPages}</span>
                    </p>
                }
                {
                    isloading === true && <div className="h-[500px] flex justify-center items-center"><span className="loading loading-bars loading-lg block"></span></div>
                }

                {
                    homedata.length === 0 && isloading === false && <ErrorPage></ErrorPage>
                }

                {
                    homedata?.map((data, index) => <div key={index} className="card-body p-3 md:p-5 lg:p-8  text-justify  rounded-none">
                        <h2 className="card-title pl-2 mt-3 roboto-bold">{toTitleCase(data?.title)}</h2>
                        {

                            data?.date && <p className="pl-2 text-xs flex justify-end"> Posted on {convertUTCtoLocal(data?.date)}</p>

                        }


                        <p className="roboto-regular">{data?.topic}</p>
                        {
                            data?.codeOne && <CodeSnippet codes={data?.codeOne}></CodeSnippet>
                        }
                        <p className="roboto-regular">{toSentenceCase(data?.overview)}</p>
                        {
                            data?.codeTwo && <CodeSnippet codes={data?.codeTwo}></CodeSnippet>
                        }
                        <p className="mb-6 pb-6 "><span className="roboto-bold">Note:</span> {toSentenceCase(data?.note)}</p>
                        <p className="roboto-regular">{toSentenceCase(data?.description)}</p>
                    </div>)
                }
            </section>
            {/* pagination  */}
            {
                homedata.length !== 0 &&
                <div className="flex justify-between py-2 ">
                    <span className="flex gap-3 items-center">
                        <p className="font-bold text-xl mx-3 "><SlArrowLeft></SlArrowLeft></p>
                        <button onClick={() => handleSkipData(-1)} className="btn btn-sm bg-slate-100 border border-black hover:bg-slate-600 hover:text-white font-semibold">Prev</button>
                    </span>


                    <span className="flex gap-3 items-center ">
                        <button onClick={() => handleSkipData(1)} className="btn btn-sm bg-slate-100 border border-black hover:bg-slate-600 hover:text-white font-semibold">Next</button>
                        <p className="font-bold text-xl mx-3 "><SlArrowRight></SlArrowRight></p>
                    </span>
                </div>
            }

        </div>
    );
};

export default HomeContent;