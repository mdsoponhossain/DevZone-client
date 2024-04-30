const AboutUs = () => {
    return (
        <section className="min-h-[90.4vh]">
            <div className="flex justify-center">
                <img src="https://i.ibb.co/D9nHj2q/about-us.png" alt="" />
            </div>
            <div className="md:h-[300px] md:w-[80%] mx-auto md:flex md:justify-evenly items-center md:p-5 p-2">
                <div className=" w-1/2 md:w-1/4 mx-auto mb-4 md:mb-0">
                    <img src="https://avatars.githubusercontent.com/u/138350367?v=4" alt="" />
                </div>

                <div className="md:w-3/5 text-justify md:text-xl md:p-2">
                    <h1 className="roboto-medium">Welcome to DevZone!</h1>
                    <p className="roboto-regular">DevZone is making the solution that problems we face when we are developing a web application. At first, I made a plan for making a personal note that I faced when developing the web application.Even I note down that I learn for the first time. I think, it will helpful for me and the others.</p>

                </div>
            </div>
        </section>
    );
};

export default AboutUs;