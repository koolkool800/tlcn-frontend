import { useState } from 'react';
import Applied from '../../../assets/images/Applied.png';
import Expired from '../../../assets/images/Expired.png';
import * as S from './styles';

type VoucherTicketProps = {
  title: string;
  expDate: string;
  status: 'expired' | 'used' | 'applied';
};

const STATUS_VOUCHER = {
  applied: 0,
  used: 1,
  expired: 2,
};

function VoucherTicket({ expDate, title, status }: VoucherTicketProps) {
  const [isApplied, setIsApplied] = useState(false);
  return (
    <S.VoucherTicketContainer
      isapplied={JSON.stringify(isApplied)}
      status={STATUS_VOUCHER[status]}
    >
      {(STATUS_VOUCHER[status] === 2 || STATUS_VOUCHER[status] === 1) && (
        <div className="overlay" />
      )}
      <div className="content-wrap">
        <div className="circle circle-top-right" />
        <div className="title">{title}</div>
        <div className="exp-date">{expDate}</div>
        <div className="desc">
          All user that owned this coupon, discount 30% value of item (max
          W100,000)
        </div>
        <div className="circle circle-bottom-right" />
      </div>
      <div className="square-dots-line" />
      <div className="action">
        {STATUS_VOUCHER[status] !== 1 && STATUS_VOUCHER[status] !== 2 ? (
          <button
            type="button"
            onClick={() => {
              setIsApplied(!isApplied);
            }}
          >
            {isApplied ? 'Cancel' : 'Apply'}
          </button>
        ) : (
          <img
            src={STATUS_VOUCHER[status] === 1 ? Applied : Expired}
            alt="action"
            width={100}
          />
        )}
      </div>
    </S.VoucherTicketContainer>
  );
}

export default VoucherTicket;
