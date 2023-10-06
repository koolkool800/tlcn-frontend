import { GroupType } from 'interface/event';
import { Form, Col, Row } from 'antd';
import { formatNumberWithCommas } from '@utils/formatNumberWithCommas';
import { useTranslation } from 'react-i18next';
import * as S from './style';

const TicketArea = ({
  area = [],
  onClick,
}: {
  area?: GroupType[];
  onClick: any;
}) => {
  const { t } = useTranslation();
  return (
    <S.Container>
      <Form.Item
        name="area"
        label={t('registerSellTicket.areaLabel')}
        style={{ marginBottom: 0 }}
        rules={[
          { required: true, message: t('registerSellTicket.areaMessageError') },
        ]}
      >
        <Row>
          <S.BoxWrapper>
            {area.map((data: any) => (
              <S.BoxItem
                key={data.id}
                className={data.color}
                type={data.color}
                onClick={() => onClick(data)}
              >
                <div className="price">
                  {data.minPrice < data.originalPrice
                    ? `${formatNumberWithCommas(
                        data.minPrice
                      )} - ${formatNumberWithCommas(data.originalPrice)} 원`
                    : `${formatNumberWithCommas(
                        data.originalPrice
                      )} - ${formatNumberWithCommas(data.minPrice)} 원`}
                </div>
                <div className="desc">{data.name}</div>
              </S.BoxItem>
            ))}
          </S.BoxWrapper>
        </Row>
      </Form.Item>
    </S.Container>
  );
};

export default TicketArea;
