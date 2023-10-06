import useParam from '@hooks/useParam';
import { PaginationProps } from 'antd';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import * as S from './style';

export type PaginationTable = {
  totalElement: number;
  current: number;
  pageSize: number;
};
type Props = {
  paginationTable: PaginationTable;
  onChangePage: ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => void;
  hasPushParams?: boolean;
};
function Pagination({
  paginationTable,
  onChangePage,
  hasPushParams = true,
}: Props) {
  const location = useLocation();
  const params = useParam();

  /**
   * event when change page current
   * @param pageIndex
   * @param pageSize
   * @returns {void}
   */
  const onChangePagination: PaginationProps['onChange'] = (
    page,
    pageSize
  ): void => {
    onChangePage({ page, pageSize });
  };

  /**
   * get total page
   * @returns number
   */
  const totalPage = useMemo(() => {
    return Math.ceil(
      paginationTable.totalElement / paginationTable.pageSize || 1
    );
  }, [paginationTable.totalElement, paginationTable.pageSize]);

  return (
    <S.PaginationAnt
      current={paginationTable.current}
      pageSize={paginationTable.pageSize}
      total={paginationTable.totalElement}
      // showSizeChanger={false}
      hideOnSinglePage
      onChange={onChangePagination}
      itemRender={(page, type, originalElement) => {
        if (['jump-prev', 'jump-next'].includes(type)) {
          return originalElement;
        }

        if (!hasPushParams) {
          return originalElement;
        }

        const newParams = typeof params === 'object' ? { ...params } : {};
        newParams.page = String(page);
        const newURL = new URLSearchParams(newParams).toString();

        if (type === 'prev') {
          return (
            <NavLink
              to={`${location.pathname}?${newURL}`}
              onClick={(e) => {
                if (page <= 0) e.preventDefault();
              }}
            >
              <span className="ant-pagination-item-link">
                <ArrowLeft2 />
              </span>
            </NavLink>
          );
        }
        if (type === 'next') {
          return (
            <NavLink
              to={`${location.pathname}?${newURL}`}
              onClick={(e) => {
                if (page > totalPage) e.preventDefault();
              }}
            >
              <span className="ant-pagination-item-link">
                <ArrowRight2 />
              </span>
            </NavLink>
          );
        }
        return <NavLink to={`${location.pathname}?${newURL}`}>{page}</NavLink>;
      }}
    />
  );
}

export default Pagination;
