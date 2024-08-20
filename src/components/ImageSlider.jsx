/* eslint-disable */
import React from 'react';
import Slider from 'react-slick';

const ImageSlider = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Slider {...settings}>
      {images ? images.map((item, index) => (
        <div key={index}>
          <img src={item} alt={`Profil fotoğrafı ${index + 1}`} style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
        </div>
      )) : <></>}
    </Slider>
  );
};

export default ImageSlider;
