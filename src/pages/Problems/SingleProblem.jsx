import React from 'react';
import { useLoaderData } from 'react-router-dom';

const SingleProblem = () => {
    const singleProblemData = useLoaderData();
    console.log(singleProblemData);
    return (
        <div>
            <h1>yo</h1>
        </div>
    );
};

export default SingleProblem;