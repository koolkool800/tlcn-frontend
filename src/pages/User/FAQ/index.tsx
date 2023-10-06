import BackButton from '@components/common/BackButton';
import InputSearch from '@components/common/InputSearch';
import Pagination, { PaginationTable } from '@components/common/Pagination';
import Accordion from '@components/user/FAQ/Accordion';
import Tabs from '@components/user/FAQ/Tabs';
import { ROUTE_USER } from '@constants/routes';
import useDimensions from '@hooks/useDimensions';
import { SpinAnt } from '@pages/SignUp/AuthPending/style';
import userService from '@services/userService';
import { H5 } from '@style/DefaultStyled';
import { getOffset } from '@utils/table';
import { ResponseListModel, ResponseModel } from 'interface';
import { FaqCategoryType, FaqType } from 'interface/user';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './style';

const FAQ = () => {
  const { isMobile } = useDimensions();
  const { t } = useTranslation();
  const [category, setCategory] = useState<FaqCategoryType[]>([]);
  const [faqs, setFaqs] = useState<FaqType[]>([]);
  const [categoryActive, setCategoryActive] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [paginate, setPaginate] = useState<PaginationTable>({
    current: 1,
    pageSize: 10,
    totalElement: 0,
  });

  const fetchCategory = async () => {
    try {
      const resCategory: ResponseModel<FaqCategoryType[]> =
        await userService.getFaqCategory();
      setCategory(resCategory?.data || []);
      if (resCategory?.data?.length) {
        setCategoryActive(String(resCategory?.data[0].categoryId || ''));
      }
    } catch (err) {
      /* empty */
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchFaq = async () => {
    setLoading(true);
    try {
      const resFaq: ResponseListModel<FaqType> = await userService.getFaq({
        categoryId: String(categoryActive || ''),
        q: search,
        offset: getOffset(paginate.current, paginate.pageSize),
      });
      setFaqs(resFaq?.data?.data || []);
      setPaginate({
        ...paginate,
        totalElement: resFaq?.data?.length || 0,
      });
    } catch (err) {
      /* empty */
    }
    setLoading(false);
  };

  useEffect(() => {
    if (categoryActive) {
      fetchFaq();
    }
  }, [categoryActive, search, paginate?.current]);

  const handleOnTabsChange = (activeKey: string) => {
    setCategoryActive(activeKey);
  };

  const handleChangePaginate = ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => {
    setPaginate({
      ...paginate,
      pageSize,
      current: page,
    });
  };

  return (
    <S.Container>
      {isMobile && (
        <BackButton
          link={ROUTE_USER.USER_MY_PAGE}
          label={t('user.supportCustomerCenter')}
        />
      )}
      <H5>{t('user.faq')}</H5>
      <S.Wrapper>
        <S.Search>
          <div className="desktop">
            <InputSearch
              placeholder="Search"
              handleValuesChange={(value: any) => {
                setSearch(value?.name || '');
              }}
            />
          </div>
        </S.Search>
        <S.TabWrapper>
          <Tabs
            onChange={handleOnTabsChange}
            defaultActiveKey="memberShip"
            items={category?.map((cate: FaqCategoryType) => ({
              label: cate.categoryName,
              key: String(cate.categoryId),
            }))}
          />
          <S.Search>
            <div className="mobile">
              <InputSearch
                handleValuesChange={(value: any) => {
                  setSearch(value?.name || '');
                }}
              />
            </div>
          </S.Search>
          <SpinAnt spinning={loading}>
            <>
              <div>
                {faqs?.map((item: FaqType) => (
                  <Accordion key={item.faqId} item={item} />
                ))}
              </div>
              <Pagination
                onChangePage={handleChangePaginate}
                paginationTable={{
                  current: paginate.current,
                  pageSize: paginate.pageSize,
                  totalElement: paginate.totalElement,
                }}
              />
            </>
          </SpinAnt>
        </S.TabWrapper>
      </S.Wrapper>
    </S.Container>
  );
};

export default FAQ;
