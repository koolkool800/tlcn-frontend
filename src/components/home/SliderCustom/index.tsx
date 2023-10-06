import { isURL } from '@utils/helper';
import { Grid } from 'antd';
import { BannerType } from 'interface/banner';
import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import bannerService from '@services/bannerService';
import * as S from './style';

function SliderCustom() {
  const [itemActive, setItemActive] = useState(0);
  const [events, setEvents] = useState<BannerType[]>([]);
  const [customPaging, setCustomPaging] = useState({});
  const slider = useRef<any>();
  const { xs } = Grid.useBreakpoint();

  /** * Load list event */
  const loadTopEvent = async () => {
    try {
      const responseBanner = await bannerService.getBanner();
      setEvents(
        responseBanner.data.data.filter(
          (banner) => banner.status === 'ACTIVE'
        ) || []
      );
    } catch (err) {
      /* empty */
    }
  };
  useEffect(() => {
    loadTopEvent();
  }, []);
  useEffect(() => {
    if (events.length > 0) {
      setCustomPaging({
        customPaging(i: number) {
          return (
            <div className="container-paging">
              <div
                className={`img-container ${
                  itemActive === i ? 'item-active' : ''
                }`}
                style={{
                  backgroundImage: `url(${events[i]?.thumbnail})`,
                }}
              />
            </div>
          );
        },
      });
    }
  }, [events, itemActive]);

  const handleClickProducts = (item: any) => {
    if (isURL(item.link)) {
      window.open(item.link, '_parent');
    }
  };
  return (
    <S.SliderWrapper>
      <Slider
        ref={(c) => {
          slider.current = c;
        }}
        dots
        infinite
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        arrows={false}
        autoplay
        pauseOnHover={false}
        autoplaySpeed={3000}
        beforeChange={(oldIndex: number, newIndex: number) => {
          setItemActive(newIndex);
        }}
        {...customPaging}
      >
        {events.map((item) => {
          return (
            <div
              className="item-slider"
              key={item.id}
              onClick={() => handleClickProducts(item)}
              aria-hidden="true"
            >
              <div
                className="img-bg"
                style={{
                  backgroundImage: `url(${!xs ? item.banner : item.thumbnail})`,
                  cursor: 'pointer',
                }}
              />
            </div>
          );
        })}
      </Slider>
      {xs && (
        <div className="container-index">
          <span>{`${itemActive + 1} / ${events.length}`}</span>
        </div>
      )}
    </S.SliderWrapper>
  );
}

export default React.memo(SliderCustom);
