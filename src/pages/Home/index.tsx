import Banner from '@components/home/Banner';
import Category from '@components/home/Category';
import DataTableHome from '@components/home/DataTableHome';
import SliderCustom from '@components/home/SliderCustom';
import TopEvent from '@components/home/TopEvent';
import { EVENT_TYPE } from '@constants/codeConstants';
import bannerService from '@services/bannerService';
import { BannerType } from 'interface/banner';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './style';

function Home() {
  const { t } = useTranslation();
  const [subBanners, setSubBanners] = useState<BannerType[]>([]);
  useLayoutEffect(() => {
    window.onpopstate = () => {
      window.location.reload();
    };
  }, []);
  const fetchData = async () => {
    const subBannersResponse = await bannerService.getSubBanners();
    setSubBanners(
      subBannersResponse.data.data.filter(
        (banner) => banner.status === 'ACTIVE'
      )
    );
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <S.Layout>
      <SliderCustom />
      {/* <section>
        <Category />
      </section> */}
      <section className="background">
        <TopEvent
          filter={{
            eventTypes: '',
          }}
        />
      </section>
      <section>
        <Banner banners={subBanners} />
      </section>
      <section>
        <TopEvent
          filter={{
            eventTypes: EVENT_TYPE.CONCERT,
            limit: 8,
          }}
          title={t('home.concert')}
        />
      </section>
      <section>
        <Banner banners={subBanners} />
      </section>
      <section>
        <TopEvent
          filter={{
            eventTypes: EVENT_TYPE.SPORT,
            limit: 4,
          }}
          title={t('home.sport')}
          expandBanner={<Banner banners={subBanners} />}
        />
      </section>
      <section>
        <Banner banners={subBanners} />
      </section>
      <section>
        <TopEvent
          filter={{
            eventTypes: EVENT_TYPE.ART_GALLERY,
            limit: 4,
          }}
          title={t('home.artGallery')}
        />
      </section>
      <section>
        <Banner banners={subBanners} />
      </section>
      <section>
        <TopEvent
          filter={{
            eventTypes: EVENT_TYPE.MUSICAL,
            limit: 4,
          }}
          title={t('home.other')}
        />
      </section>
      <section>
        <Banner banners={subBanners} />
      </section>
      <section>
        <DataTableHome />
      </section>
    </S.Layout>
  );
}

export default Home;
