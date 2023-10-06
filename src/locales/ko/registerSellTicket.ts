const registerSellTicket = {
  registerTitle: '티켓 판매 등록',
  headerConfirmTicket: '사업자등록번호',
  theSeatsAdjacent: '연석',

  areaLabel: '구역 선택',
  areaMessageError: '최소 1개의 구역을 선택해주세요',

  sectionLabel: '상세 좌석 위치',
  sectionPlaceholder: '섹션 선택',
  sectionMessageError: '최소 1개의 섹션을 선택해주세요',

  floorPlaceholder: '층 선택',
  floorMessageError: '최소 1개의 층을 선택해주세요',

  rowPlaceholder: '열 선택',
  rowMessageError: '최소 1개의 열을 선택해주세요',

  seatPlaceholder: '좌석 정보 입력 (선택)',

  quantityLabel: ' 티켓 수 선택',
  quantityPlaceHolder: ' 티켓 수 선택',
  quantityMessageError: '최소 1개의 수량을 선택해주세요',

  priceLabel: '예상가격(티켓당)',
  priceErrorMinPrice: '가격은 ~ 이상이거나 같아야 합니다',
  priceErrorOverwhelmPrice: '가격은 소수점 이하 10자리 이하여야 합니다',

  pricePlaceHolder: '예상 가격을 입력해 주세요',

  couponLabel: '쿠폰 선택',
  couponPlaceholder: '쿠폰 선택',

  nextButton: '다음',
  registerButton: '등록',

  seatPosition: '좌석 정보',

  salePrice: '판매 가격',
  saleCommissions: '판매 수수료',
  discountCoupon: '할인 쿠폰',
  shippingFee: '배송비',
  AMR: '실제 수령 금액',

  penaltyTitle: '패널티 정책',
  penaltyDes: `구매자에게 티켓 또는 PIN 전달이 되지 않을 시, 판매자에게 상품 가격의 15%의 패널티가 발생합니다
상품에 문제가 발생하여 구매자가 해당 이벤트에 입장 불가시 판매자에게 상품 가격의 10% 패널티가 발생합니다`,

  confirmTitle: '판매 등록이 완료되었습니다.',
  confirmDesc1: '티켓이 정상적으로 마켓에 등록되었습니다.',
  confirmDesc2: '구매자가 나타나면 알림이 발송됩니다.',

  sellerShipInfo: '판매자 배송 정보',

  pinTransactionDesc1:
    '구매자가 시스템 비용을 지불한 후 플랫폼을 통해 티켓의 PIN 번호를 구매자에게 전송해야 합니다.',
  pinTransactionDesc2:
    '구매자가 티켓을 수령하였으므로 24시간 이후 판매내역에서 출금이 가능합니다.',
  sellerShipInfoDesc1:
    '구매자가 플랫폼 비용을 결제한 후 48시간 이내에 배송 단위를 통해 회사 주소로 티켓을 전송해야 합니다.',
  expiredDate: '유통 기한',
  uploadCertificate: '인증서 업로드',
  uploadCertificatePlaceholder: '사업자등록증을 업로드해주세요!',
};

export default registerSellTicket;
