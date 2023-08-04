import React from 'react';
import Banner from '../Banner/Banner';
import PopularInstructors from '../PopularInstructors';
import PopularClass from '../PopularClass';
import ExtraSection from '../ExtraSection/ExtraSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularClass></PopularClass>
            <PopularInstructors></PopularInstructors>
            {/* <ExtraSection></ExtraSection> */}
        </div>
    );
};

export default Home;