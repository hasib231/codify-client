import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: classes = [], refetch } = useQuery(["class"], async () => {
    const res = await axiosSecure.get("/class");
    console.log(classes);
    return res.data;
  });

  const handleMakeApprove = (classData) => {
    fetch(`http://localhost:5000/class/approve/${classData._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${classData.className} class is approved!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  const handleMakeDeny = (classData) => {
    fetch(`http://localhost:5000/class/deny/${classData._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${classData.className} class is denied!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="w-full mb-24">
      <Helmet>
        <title>Sports Club | Manage users</title>
      </Helmet>
      <h1 className="text-4xl text-center pb-2 my-text font-semibold mt-5">
        Manage Users
      </h1>
      <h3 className="text-2xl font-semibold my-4 text-center">
        Total Class: {classes.length}
      </h3>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr className="my-color1">
              <th>#</th>
              <th>Class Image</th>
              <th>Class name</th>
              <th>Instructor name</th>
              <th>Instructor email</th>
              <th>Available seats</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
              <th>Action</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classData, index) => (
              <tr key={classData._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={classData.image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>{classData.className}</td>
                <td>{classData.instructorName}</td>
                <td>{classData.instructorEmail}</td>
                <td>{classData.availableSeats}</td>
                <td>{classData.price}</td>
                <td className="my-text font-semibold">{classData.status}</td>
                <td>
                  {classData.status === "pending" ? (
                    <button
                      onClick={() => handleMakeApprove(classData)}
                      className="btn  my-btn  text-white"
                    >
                      <FaUserShield></FaUserShield>
                      Approve
                    </button>
                  ) : (
                    <button disabled className="btn  my-btn  text-white">
                      <FaUserShield></FaUserShield>
                      Approve
                    </button>
                  )}
                </td>
                <td>
                  {classData.status === "pending" ? (
                    <button
                      onClick={() => handleMakeDeny(classData)}
                      className="btn my-btn text-white"
                    >
                      <FaUserShield></FaUserShield>
                      Deny
                    </button>
                  ) : (
                    <button disabled className="btn  my-btn text-white">
                      <FaUserShield></FaUserShield>
                      Deny
                    </button>
                  )}
                </td>
                <td>
                  <button className="btn  my-btn text-white ">
                    Send Feedback
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClasses;
