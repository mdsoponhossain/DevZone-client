import { useContext } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Context } from "../../contextApi/ContextProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const { hanldeLogin } = useContext(Context);
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
    } = useForm();

    const onSubmit = ({ email, password }) => {
        console.log(email, password)
        hanldeLogin(email, password)
            .then(() => {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Your login is successfully completed",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/')
            })
            .catch(error => console.log(error.message))
    }

    return (
        <div className="hero min-h-[91vh]   md:bg-base-200">
            <div className="hero-content h-fit w-full p-0  md:p-4 md:w-[70%] mx-auto ">

                <div className="card shrink-0 w-full max-w-sm md:shadow-xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body p-4 md:p-8">
                        <h1 className="text-4xl font-bold text-center">Login</h1>

                        {/* social login */}
                        <div className="flex gap-[40px] w-28 mt-3  mx-auto">
                            <FaGoogle className="text-4xl"></FaGoogle>
                            <FaGithub className="text-4xl"></FaGithub>
                        </div>
                        <p className="text-2xl text-center font-bold py-0 my-0">Or</p>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register("email")} placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="current-password" {...register("password")} placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-active btn-ghost hover:bg-slate-500 hover:text-white">Login</button>
                        </div>
                        <p>Are new here? Please <a href="/signup" className="border border-black px-3 pt-2 pb-4 my-3 btn btn-sm">Sign up</a></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;