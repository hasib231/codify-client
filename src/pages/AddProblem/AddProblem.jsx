import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const AddClass = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  
  const onSubmit = (data) => {
    console.log("data",data);
    const formData = new FormData();
    console.log("formdata",formData);
           
          axiosSecure.post("/addNewProblem", data).then((data) => {
            console.log("after posting new problem", data.data);
            if (data.data.insertedId) {
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "New Problem Added successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        
      
  };

  return (
    <div className="w-full px-10 mb-12">
      <Helmet>
        <title>Codify | Create Problem</title>
      </Helmet>
      <h1 className="text-4xl text-center pb-2 my-text font-semibold mt-12">
        Create new Problem
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-1/2 mb-4">
          <label className="label">
            <span className="label-text font-semibold">Problem Name*</span>
          </label>
          <input
            type="text"
            placeholder="Problem Name"
            {...register("problemName", { required: true, maxLength: 120 })}
            className="input input-bordered w-full input-primary"
          />
        </div>

        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text font-semibold">
              Problem Description*
            </span>
          </label>

          <textarea
            placeholder="Problem Description"
            {...register("problemDescription", { required: true })}
            className="input input-bordered w-full input-primary"
          />
        </div>

        <div className="flex my-4">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text font-semibold">
                Problem Creator Name
              </span>
            </label>
            <input
              type="text"
              defaultValue={user?.displayName}
              {...register("userName", { required: true })}
              placeholder="Type here"
              className="input input-bordered w-full input-primary"
            />
          </div>
          <div className="form-control w-full ml-4">
            <label className="label">
              <span className="label-text font-semibold">
                Problem Creator Email
              </span>
            </label>
            <input
              type="text"
              defaultValue={user?.email}
              {...register("userEmail", { required: true })}
              placeholder="Type here"
              className="input input-bordered w-full input-primary"
            />
          </div>
        </div>
        <div className="flex my-4">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text font-semibold">Input Formate</span>
            </label>
            <input
              type="text"
              {...register("inputFormate", { required: true })}
              placeholder="Input Formate"
              className="input input-bordered w-full input-primary"
            />
          </div>
          <div className="form-control w-full ml-4">
            <label className="label">
              <span className="label-text font-semibold">Constraints</span>
            </label>
            <input
              type="text"
              {...register("constraints", { required: true })}
              placeholder="Input range"
              className="input input-bordered w-full input-primary"
            />
          </div>
        </div>

        <div className="flex my-4">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text font-semibold">Sample Input</span>
            </label>
            <input
              type="text"
              {...register("sampleInput", { required: true })}
              placeholder="For multiple input use space"
              className="input input-bordered w-full input-primary"
            />
          </div>
          <div className="form-control w-full ml-4">
            <label className="label">
              <span className="label-text font-semibold">Sample Output</span>
            </label>
            <input
              type="text"
              {...register("sampleOutput", { required: true })}
              placeholder="Sample Output"
              className="input input-bordered w-full input-primary"
            />
          </div>
        </div>

        <input
          className="btn btn mt-4 my-btn"
          type="submit"
          value="Create this problem"
        />
      </form>
    </div>
  );
};

export default AddClass;
