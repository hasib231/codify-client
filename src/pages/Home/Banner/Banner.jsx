import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper";

const Banner = () => {
    return (
      <div >
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img
              className="w-full"
              src="https://img.freepik.com/free-photo/html-css-collage-concept-with-person_23-2150062008.jpg?w=1380&t=st=1689041921~exp=1689042521~hmac=d8a5f9a905126b68366892416fbd1c3ddf2aa510236daf253e782cca3fafb872"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="w-full"
              src="https://img.freepik.com/free-photo/rear-view-programmer-working-all-night-long_1098-18697.jpg?w=1380&t=st=1689042021~exp=1689042621~hmac=175a767f7fb1cbfe6381ff4a660c5d057ed2da5c42f0586b10ddfa0f00056acb"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="w-full "
              src="https://img.freepik.com/free-photo/html-system-website-concept_23-2150376760.jpg?w=1380&t=st=1689042101~exp=1689042701~hmac=a25a1db487189f453521c4c3718323c4b80873244fccecfb7a930cf7bcbfb5ef"
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </div>
    );
};

export default Banner;
