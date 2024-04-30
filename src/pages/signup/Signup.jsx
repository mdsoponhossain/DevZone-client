import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Context } from "../../contextApi/ContextProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const { signupWithEmail, updateUserProfile } = useContext(Context);
    // console.log(signupWithEmail)
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
    } = useForm();

    const onSubmit = ({ email, password, name, photo }) => {
        const data = { email, password, name, photo, role: 'user' };
        // console.log(name, photo)
        signupWithEmail(email, password)
            .then(() => {
                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(() => {
                        // fetch('http://localhost:5000/users/user', {
                        fetch('https://syntax-high-lighter-server.vercel.app/users/user', {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
                        })
                            .then(res => res.json())
                            .then(result => {
                                if (result?.message === 'success') {
                                    Swal.fire({
                                        position: "top-center",
                                        icon: "success",
                                        title: "Your Sign up is successfully completed",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/')
                                }
                            })
                    }

                    )
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="hero min-h-[91vh]   md:bg-base-200">
            <div className="hero-content h-fit w-full p-0  md:p-4 md:w-[70%] mx-auto ">

                <div className="card shrink-0 w-full max-w-sm md:shadow-xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body p-4 md:p-8">
                        <h1 className="text-4xl font-bold text-center">Sign up</h1>

                        {/* social login */}
                        <div className="flex gap-[40px] w-28 mt-3  mx-auto">
                            <FaGoogle className="text-4xl"></FaGoogle>
                            <FaGithub className="text-4xl"></FaGithub>
                        </div>
                        <p className="text-2xl text-center font-bold py-0 my-0">Or</p>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register("name")} placeholder="Enter Your Name" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" {...register("photo")} placeholder="Photo URL" className="input input-bordered" required />
                        </div>

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
                            <input type="password" {...register("password")} placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-active btn-ghost hover:bg-slate-500 hover:text-white">Signup</button>
                        </div>
                        <p>Are new here? Please <a href="/login" className="border border-black px-3 pt-2 pb-4 my-3 btn btn-sm">login</a></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;