import { useContext } from "react";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import useStudent from "../hooks/useStudent";

const SingleClass = ({ item }) => {
  const { className, image, price, instructorName, availableSeats, _id } = item;
  const { user } = useContext(AuthContext);
  const [isStudent] = useStudent();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelectClass = (item) => {
    console.log(item);
    if (user && user.email) {
      const classData = {
        courseId: _id,
        className,
        image,
        price,
        email: user.email,
        enrollStatus: "selected",
      };
      fetch("http://localhost:5000/selectedClass", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(classData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Course selected successful",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please login to select the course",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <div
      className={`card w-96 shadow-xl ${
        availableSeats === 0 ? "bg-red-100" : "bg-indigo-100"
      }`}
    >
      <figure>
        <img className="h-64" src={item.image} alt="Shoes" />
      </figure>
      <p className="absolute right-0 mr-4 mt-4 px-4 bg-indigo-600 text-white rounded-md">
        ${price}
      </p>
      <div className="card-body flex flex-col items-center">
        <h2 className="card-title">Course Name: {className}</h2>
        <p className="font-semibold">Instructor name: {instructorName}</p>
        <p className="font-semibold">Available seats: {availableSeats}</p>
        <div className="card-actions justify-end">
          {availableSeats === 0 || !isStudent ? (
            <button disabled className="btn my-btn mt-4">
              Select this course
            </button>
          ) : (
            <button
              onClick={() => handleSelectClass(item)}
              className="btn my-btn mt-4"
            >
              Select this course
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleClass;
