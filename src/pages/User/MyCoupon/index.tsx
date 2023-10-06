import Button from '@components/common/Button';
import VoucherDiscountV2 from '@components/common/VoucherDiscountV2';
import AddVoucher from '@components/user/Coupon/AddVoucher';
import userService from '@services/userService';
import { H5, H6 } from '@style/DefaultStyled';
import { getOffset } from '@utils/table';
import { ResponseListModel } from 'interface';
import { FilterType } from 'interface/general';
import { VoucherType } from 'interface/user';
import lodash from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DefaultTheme, useTheme } from 'styled-components';
import * as S from './style';

const MyCoupon = () => {
  /** Theme ********************************************************************************* */
  const theme = useTheme() as DefaultTheme;
  const { t } = useTranslation();

  /** State ********************************************************************************** */
  const [modalGetCoupon, setModalSetCoupon] = useState(false);
  const [vouchers, setVouchers] = useState<VoucherType[]>([]);
  const [totalPage, setTotalPage] = useState<number>(100);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 10,
    sortBy: 'updatedAt:desc',
    page: 1,
  });

  /** * Load list voucher */
  const loadVoucher = async (params: FilterType) => {
    try {
      const response: ResponseListModel<VoucherType> =
        await userService.getVoucher({
          offset: params.offset,
          limit: params.limit,
          sortBy: params.sortBy,
        });

      let newVoucher = [...vouchers].concat(response?.data?.data || []);
      newVoucher = lodash.uniqBy(newVoucher, (e: VoucherType) => {
        return e.id;
      });

      setVouchers(newVoucher);
      setTotalPage(response?.data?.length || 0);
    } catch (err) {
      /** * error */
    }
  };

  /** * Load list voucher first load page */
  useEffect(() => {
    loadVoucher(filter);
  }, []);

  const showSeeMore = useMemo(() => {
    return Math.ceil(totalPage / filter.limit) > 1;
  }, [totalPage]);

  /** * handle the load more list voucher when clicking see more */
  const handleClickSeeMore = async () => {
    setLoading(true);
    const newFilter = { ...filter };
    newFilter.page += 1;
    newFilter.offset = getOffset(newFilter.page, newFilter.limit);
    setFilter(newFilter);
    await loadVoucher(newFilter);

    setLoading(false);
  };

  /** *
   * @param isReload: boolean // reload voucher when get voucher success
   */
  const handleCloseCouponModal = (isReload = false) => {
    setModalSetCoupon(false);
    if (isReload) {
      loadVoucher(filter);
    }
  };

  return (
    <S.Container>
      <H5>{t('user.myCoupon')}</H5>

      <S.Gap20>
        <S.WrapperGetCoupon>
          <Button
            loading={loading}
            style={{ width: 'auto' }}
            color={theme.colors.black}
            bgcolor={theme.colors.primary500}
            onClick={() => setModalSetCoupon(true)}
          >
            {t('user.getCoupon')}
          </Button>
        </S.WrapperGetCoupon>
        <H6>{t('user.voucherAvailableCoupon')}</H6>
        {vouchers?.length > 0 ? (
          <>
            <S.List>
              {vouchers.map(({ voucher }: VoucherType) => (
                <VoucherDiscountV2 key={voucher.id} voucher={voucher} />
              ))}
            </S.List>

            {showSeeMore && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  loading={loading}
                  style={{ width: 'auto' }}
                  onClick={handleClickSeeMore}
                >
                  {t('user.seeMore')}
                </Button>
              </div>
            )}
          </>
        ) : (
          <S.NoContent>
            <H6>{t('user.noVoucher')}</H6>
          </S.NoContent>
        )}
      </S.Gap20>

      <AddVoucher open={modalGetCoupon} setOpen={handleCloseCouponModal} />
    </S.Container>
  );
};

export default MyCoupon;
