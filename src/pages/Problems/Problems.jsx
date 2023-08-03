import React, { useState, useEffect } from "react";
import axios from "axios";

const codeData = `
        
 #include <iostream>
using namespace std;

int main() {
    int n;
    long factorial = 1.0;

    cout << "Enter a positive integer: ";
    cin >> n;

    if (n < 0)
        cout << "Error! Factorial of a negative number doesn't exist.";
    else {
        for(int i = 1; i <= n; ++i) {
            factorial *= i;
        }
        cout << "Factorial of " << n << " = " << factorial;    
    }

    return 0;
}

      `;
const options = {
  method: "POST",
  url: "https://online-code-compiler.p.rapidapi.com/v1/",
  headers: {
    "content-type": "application/json",
    "X-RapidAPI-Key": "20296d590cmsh4389ffe30cea551p1dcd94jsn01cf70e6c68a",
    "X-RapidAPI-Host": "online-code-compiler.p.rapidapi.com",
  },
  data: {
    language: "cpp",
    version: "latest",
    code: `${codeData}`,
    input: "4",
  },
};
const Problems = () => {
    const [outputData, setOutputData] = useState(null);
    useEffect(() => {
        axios.request(options).then(function (response) {
        setOutputData(response.data.output);
        console.log(response.data);
        }).catch(function (error) {
        console.error(error);
        })
    },[])
    return (
      <div>
        <h2>{outputData}</h2>
      </div>
    );
};

export default Problems;
