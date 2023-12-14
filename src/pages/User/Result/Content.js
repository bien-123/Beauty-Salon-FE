import React, { Component } from 'react';
import Slider from 'react-slick';
import { contentResult } from '../../../constans/storage';

class Content extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
    };
    return (
      <>
        <div className="max-w-[1050px] m-auto mb-8">
          <div className="m-auto flex flex-col items-start justify-start py-4 gap-2  text-start">
            <div className="hr-underline">
              <div className="text-2xl text-[#02a7aa] font-bold mb-4 text-start">
                Kết quả sau khi quá trình điều trị
              </div>
            </div>
          </div>
          <Slider {...settings}>
            {contentResult.map((item, index) => (
              <div className="mr-2" key={index}>
                <img src={item.image} alt="Hình ảnh kết quả"></img>
              </div>
            ))}
          </Slider>
        </div>
        <div className="max-w-[1050px] m-auto">
          <iframe
            width="100%"
            height="523"
            src="https://www.youtube.com/embed/1VkGfJqtRZ4"
            title="MUA 1 TẶNG 3 – Da căng bóng, bật tông trắng sáng"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </>
    );
  }
}

export default Content;
