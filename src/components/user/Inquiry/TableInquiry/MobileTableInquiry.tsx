import Pagination, { PaginationTable } from '@components/common/Pagination';
import { dateTimeFormatString } from '@utils/format';
import { InquiryType } from 'interface/user';
import { useTranslation } from 'react-i18next';
import { STATUS } from '.';
import i18n from '../../../../i18n';
import * as S from './style';

type Props = {
  data: InquiryType[];
  loading?: boolean;
  pageTable: PaginationTable;
  handleChangePage: ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => void;
  onDetail: (id: string) => void;
};

const MobileTableInquiry = (props: Props) => {
  const { t } = useTranslation();
  const { data, loading, pageTable, handleChangePage, onDetail } = props;
  return (
    <S.WrapperMobile>
      {data?.map((item) => (
        <S.WrapperMobileItem key={item?.id}>
          <div className="item">
            <div>{t('user.createdDate')}</div>
            <div>
              {dateTimeFormatString(item?.createdAt, 'YYYY.MM.DD HH:mm:ss')}
            </div>
          </div>
          <div className="item">
            <div>{t('user.title')}</div>
            <div>{item?.title}</div>
          </div>

          <div className="item">
            <div>{t('user.status')}</div>
            <div>
              <S.Status>
                <div className={`${item.status} status mobile`}>
                  {STATUS[item.status]}
                </div>
              </S.Status>
            </div>
          </div>

          <S.Btn
            className="mobile"
            onClick={() => {
              onDetail(String(item?.id || ''));
            }}
          >
            {i18n.t('user.detail')}
          </S.Btn>
        </S.WrapperMobileItem>
      ))}
      <Pagination paginationTable={pageTable} onChangePage={handleChangePage} />
    </S.WrapperMobile>
  );
};

export default MobileTableInquiry;
