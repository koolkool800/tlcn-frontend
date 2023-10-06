import Pagination, { PaginationTable } from '@components/common/Pagination';
import { Spin } from 'antd';
import dayjs from 'dayjs';
import { PinReceivedType } from 'interface/user';
import { useTranslation } from 'react-i18next';
import * as S from './style';

type Props = {
  data: PinReceivedType[];
  loading?: boolean;
  pageTable: PaginationTable;
  handleChangePage: ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => void;
};

const MobileTablePinSent = (props: Props) => {
  const { t } = useTranslation();
  const { data, loading, pageTable, handleChangePage } = props;
  return (
    <Spin spinning={loading}>
      <S.WrapperMobile>
        {data?.map((item) => (
          <S.WrapperMobileItem key={item?.orderNumber}>
            <div className="item">
              <div>{t('user.orderNumber')}</div>
              <div>{item?.orderNumber}</div>
            </div>
            <div className="item">
              <div>{t('user.orderDate')}</div>
              <div>{dayjs(item?.orderDate).format('YYYY.MM.DD')}</div>
            </div>
            <div className="item">
              <div>{t('user.productInformation')}</div>
              <div>
                {item?.productInformation?.title} -
                {item?.productInformation?.place}
              </div>
            </div>
            <div className="item">
              <div>{t('user.pinCodeTitle')}</div>
              <div>*******</div>
            </div>
            <div className="item">
              <div>{t('user.sentTime')}</div>
              <div>{dayjs(item?.sentDate).format('YYYY.MM.DD')}</div>
            </div>
          </S.WrapperMobileItem>
        ))}
        <Pagination
          paginationTable={pageTable}
          onChangePage={handleChangePage}
        />
      </S.WrapperMobile>
    </Spin>
  );
};

export default MobileTablePinSent;
