import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Problems = () => {
    const [problemData, setProblemData] = useState([]);
    
    useEffect(() => {
      fetch("http://localhost:5000/allProblems")
        .then((res) => res.json())
          .then((data) => {
              setProblemData(data);
              console.log(data);
        });
    }, []);
    
  return (
    <div className="">
      <h2 className="text-5xl my-8 text-center">Select a problem to solve</h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-8/12 table-zebra mx-auto">
          {/* head */}
          <tbody className="text-center">
            {problemData.map((problem) => (
              <tr>
                <th>{problem.problemName}</th>

                <th>
                  <Link to={`/singleProblem/${problem._id}`}>
                    <button className="btn my-btn">Solve now</button>
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Problems;
