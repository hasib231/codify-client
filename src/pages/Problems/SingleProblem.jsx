import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";


const SingleProblem = () => {
    const singleProblemData = useLoaderData();
    const [axiosSecure] = useAxiosSecure();
    const [outputData, setOutputData] = useState(null);
    const [cpuTime, setCpuTime] = useState(null);
    const [memory, setMemory] = useState(null);
    // const [ifAccept, setIfAccept] = useState("Not Accepted");
    const [language2, setLanguage2] = useState(null);
    const [userCode2, setUserCode2] = useState(null);


//   const [code, setCode] = useState("print('hello world');");
  // console.log(singleProblemData);
  const {
    _id,
    constraints,
    inputFormate,
    problemDescription,
    problemName,
    sampleInput,
    sampleOutput,
    userEmail,
    userName,
  } = singleProblemData;

  const handleSubmitCode = (event) => {
    event.preventDefault();
    const form = event.target;
    const language = form.category.value;
      const userCode = form.description.value;
      setLanguage2(language);
      setUserCode2(userCode);
      
      var now = new Date();
      var current_date = now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      var now = new Date();
      var current_time = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

    const codeData = {
      language,
      userCode,
      sampleInput,
      userEmail,
      userName,
      current_date,
      current_time,
      problemId : _id,
    };

    axiosSecure.post("/submitCode", codeData).then((codeData) => {
      console.log("after submit", codeData.data);
      if (codeData.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Problem submitted",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
      
    
    };
    
     const options = {
       method: "POST",
       url: "https://online-code-compiler.p.rapidapi.com/v1/",
       headers: {
         "content-type": "application/json",
         "X-RapidAPI-Key": "20296d590cmsh4389ffe30cea551p1dcd94jsn01cf70e6c68a",
         "X-RapidAPI-Host": "online-code-compiler.p.rapidapi.com",
       },
       data: {
         language: `${language2}`,
         version: "latest",
         code: `${userCode2}`,
         input: `${sampleInput}`,
       },
     };

     useEffect(() => {
       axios
         .request(options)
         .then(function (response) {
             setOutputData(response.data.output);
             setCpuTime(response.data.cpuTime);
             setMemory(response.data.memory);
             console.log(response.data);
            //  if (response.data.output === sampleOutput) {
            //      setIfAccept("Accepted");
            //  }
         })
         .catch(function (error) {
           console.error(error);
         });
     }, [userCode2]);
//   const codeString = `
//    print("hello word")
//     `;
  return (
    <div className="grid md:grid-cols-2 gap-10 p-12">
      <div className="">
        <h1 className="text-3xl font-bold text-center">{problemName}</h1>
        <p className=" text-center m-3">Created by: {userName}</p>
        <hr />
        <p className="mt-5">{problemDescription}</p>
        <h3 className="font-bold mt-5 mb-2">Input Format</h3>
        <p>{inputFormate}</p>
        <h3 className="font-bold mt-5 mb-2">Constraints</h3>
        <p>{constraints}</p>
        <h3 className="font-bold mt-5 mb-2">Sample Input</h3>
        <p className="bg-slate-200 p-5 font-semibold rounded-md">
          {sampleInput}
        </p>
        <h3 className="font-bold mt-5 mb-2">Sample Output</h3>
        <p className="bg-slate-200 p-5 font-semibold rounded-md">
          {sampleOutput}
        </p>
        <h3 className="font-bold mt-5 mb-2">Explanation</h3>
        <p>{constraints}</p>
      </div>
      <div className="">
        <form onSubmit={handleSubmitCode}>
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text font-semibold">Select Language</span>
            </label>
            <select name="category" className="select select-bordered">
              <option>python3</option>
              <option>cpp</option>
              <option>c++</option>
            </select>
          </div>

          <div className="form-control mt-5 ">
            <label className="label">
              <span className="label-text font-semibold">
                Paste your code here
              </span>
            </label>
            <textarea
              name="description"
              className="textarea textarea-bordered bg-black text-white"
              placeholder="print('hello word');"
              rows="10"
            ></textarea>
          </div>

          {/* <div className="form-control mt-5 ">
              <label className="label">
                <span className="label-text font-semibold">
                  Paste your code here
                </span>
              </label>
              <textarea
                name="description"
                className="textarea textarea-bordered bg-black text-white"
                placeholder="print('hello word');"
                
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <SyntaxHighlighter
                language="python" // use SyntaxHighlighter to display the code with the language of your choice
                style={prism} // use the style you imported
              >
                {code}
              </SyntaxHighlighter>
            </div> */}

          <div className="form-control mt-8 mb-12 ">
            <input
              className="btn my-btn btn-block w-3/12 ms-auto"
              type="submit"
              value="submit"
            />
          </div>
        </form>
        <div className="bg-black text-white p-5 rounded-md">
          {/* <h2>{ ifAccept}</h2> */}
          <h2 className="font-semibold">
            Expected output for sample input : {sampleOutput}
          </h2>
          <h2 className="font-semibold">
            Your output for sample input : {outputData}
          </h2>
          <h2 className="font-semibold">Cpu Time : {cpuTime}</h2>
          <h2 className="font-semibold">Memory Usage: {memory}</h2>
        </div>
      </div>
    </div>
  );
};

export default SingleProblem;
