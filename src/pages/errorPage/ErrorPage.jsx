
const ErrorPage = () => {
    return (
        <div className="bg-white">
            <img src="https://i.ibb.co/bzqbMxL/error-page.png" alt="" />
            <p className="md:text-2xl font-semibold md:text-center text-wrap px-1 hidden md:block">We're sorry, the page you requested could not be found. <br /> 
                Please go back to the homepage</p>
            <p className="md:text-2xl font-semibold text-center text-wrap px-1 block md:hidden">We're sorry, the page you requested could not be found.  
                Please go back to the homepage</p>
            <div className="flex justify-center">
                <a href="/"> <button className="btn btn-active  w-[120px] rounded-[40px] hover:bg-slate-500 hover:text-white  mt-4 font-bold">Go Home</button>
                </a>
            </div>
        </div>
    );
};

export default ErrorPage;