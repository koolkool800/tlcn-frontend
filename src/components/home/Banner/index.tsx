/* eslint-disable import/no-extraneous-dependencies */
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { BannerType } from 'interface/banner';
import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import BannerImage from '../../../assets/images/bannerImage.png';
import * as S from './style';

type Props = {
  banners: BannerType[];
};

function Banner({ banners }: Props) {
  const slider = useRef<any>();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const next = () => {
    slider?.current?.slickNext();
  };
  const previous = () => {
    slider?.current?.slickPrev();
  };

  if (banners.length === 0) {
    return <></>;
  }

  return (
    <S.SliderWrapper>
      <Slider
        ref={(c) => {
          slider.current = c;
        }}
        {...settings}
      >
        {banners.map((banner) => (
          <div className="item-slider" key={banner.id}>
            <img src={banner.banner} alt={banner.category} />
          </div>
        ))}
      </Slider>
      <S.containerPreviousBtn onClick={previous}>
        <ArrowLeft2 size="50" color="white" variant="Bold" />
      </S.containerPreviousBtn>
      <S.containerNextBtn onClick={next}>
        <ArrowRight2 size="50" color="white" variant="Bold" />
      </S.containerNextBtn>
    </S.SliderWrapper>
  );
}

export default React.memo(Banner);
