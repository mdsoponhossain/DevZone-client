import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UploadForm = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
    } = useForm()
    const onSubmit = (data) => {
        console.log(data)
        // fetch('http://localhost:5000/docs/doc/upload', {
        fetch('https://syntax-high-lighter-server.vercel.app/docs/doc/upload', {
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
                        title: "Your blog is successfully uploaded",
                        showConfirmButton: false,
                        timer: 1500
                      });
                      navigate('/')
                }
            })
    }

    return (
        <div className="max-w-7xl w-[95%] max-h-[91vh] overflow-y-auto mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body p-2 md:p-8">

                <div className="md:flex justify-between">
                    {/* topic section */}
                    <div className="form-control md:w-[48%]">
                        <label className="label">
                            <span className="label-text">Writing Topic</span>
                        </label>
                        <input {...register("tag")} type="writing topic" placeholder="Writing Topic" className=" pl-1 md:pl-3 input input-bordered" required />
                    </div>

                    {/* category section */}
                    <div className="form-control  md:w-[48%]">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <input {...register("category")} type="category" placeholder="Enter Your Writing Category" className="input input-bordered pl-1 md:pl-3" required />
                    </div>

                </div>

                {/* title section */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input {...register("title")} type="title" placeholder="Title" className="input input-bordered pl-1 md:pl-3" required />
                </div>

                {/* Install Command*/}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Code Snippet</span>
                    </label>
                    <textarea  {...register("codeOne")} className='border-2 pl-1 md:pl-4' placeholder='Codes Snippet' cols="20" rows="5"></textarea>
                </div>

                {/*  overview section */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text"> Overview</span>
                    </label>
                    <textarea {...register("overview")} className='border-2 pl-1 md:pl-3' placeholder=' Overview' cols="20" rows="5"></textarea>
                </div>

                {/* Codes snippet*/}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Codes Snippet</span>
                    </label>
                    <textarea  {...register("codeTwo")} className='border-2 pl-1 md:pl-4' placeholder='Code Snippet' cols="20" rows="5"></textarea>
                </div>

                {/* Notes*/}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Note</span>
                    </label>
                    <input {...register("note")} type="note" placeholder="Note" className="input input-bordered pl-1 md:pl-3" required />
                </div>

                {/* description*/}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea {...register("description")} className='border-2 pl-1 md:pl-4' placeholder='Description' cols="20" rows="5"></textarea>
                </div>



                <div className="form-control mt-6">
                    <button className="btn btn-active btn-ghost hover:bg-slate-500 hover:text-white">Upload</button>
                </div>
            </form>
        </div>
    );
};

export default UploadForm;