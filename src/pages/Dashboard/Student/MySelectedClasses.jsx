import { Helmet } from "react-helmet-async";
import { FaKey, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useMyClass from "../../../hooks/useMyClass";

const MySelectedClasses = () => {
  const [myClass, refetch] = useMyClass();

  const total = myClass.reduce((sum, item) => item.price + sum, 0);

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/myClass/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your class has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <div className="w-11/12 mb-12">
      <Helmet>
        <title>Sports Club | My Selected classes </title>
      </Helmet>
      <h1 className="text-4xl text-center pb-2 my-text font-semibold mt-12 mb-5">
        My Selected Classes
      </h1>
      <h3 className="text-2xl text-center">Total Class: {myClass.length}</h3>
      <h3 className="text-2xl my-5 text-center">Total Price: ${total}</h3>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr className="my-color1">
              <th>#</th>
              <th>Image</th>
              <th>Class name</th>
              <th>Price</th>
              <th>Pay</th>
              <th>Delete Class</th>
            </tr>
          </thead>
          <tbody>
            {myClass.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-16 h-16">
                      <img
                        src={item.image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>{item.className}</td>
                <td className="">${item.price}</td>
                <td>
                  <Link to={`/dashboard/payment/${item._id}`}>
                    <button className="btn my-btn btn-sm">PAY</button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(item)}
                    className="btn btn-ghost bg-red-600  text-white"
                  >
                    <FaTrashAlt></FaTrashAlt>
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

export default MySelectedClasses;
