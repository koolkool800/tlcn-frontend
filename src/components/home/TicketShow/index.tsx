import { Col, Row } from 'antd';
import {
  ContainerSection,
  TitleSectionHompage,
} from '../../../style/DefaultStyled';
import theme from '../../../style/themes/default';
import CardTicket from '../CardTicket';
import * as S from './styles';

type TicketShowType = {
  titleSection: string;
  data?: any;
};
function TicketShow({ data, titleSection }: TicketShowType) {
  const render = (x = 4) => {
    return new Array(x).fill(
      <Col>
        <CardTicket
          title="Taeyeon 2023 - Seoul"
          location="Olympic Gymnastics Stadium"
          price="155,000원"
        />
      </Col>
    );
  };
  return (
    <ContainerSection>
      <S.TicketShowWrap>
        <TitleSectionHompage>{titleSection}</TitleSectionHompage>
        <Row
          gutter={[
            { lg: theme.paddingGrid.lg, sm: theme.paddingGrid.sm },
            { lg: theme.paddingGrid.xxxl, sm: theme.paddingGrid.xl },
          ]}
        >
          {render()}
        </Row>
        <div className="btn-more">see more</div>
      </S.TicketShowWrap>
    </ContainerSection>
  );
}

export default TicketShow;
