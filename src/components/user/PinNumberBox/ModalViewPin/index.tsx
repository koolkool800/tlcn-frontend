import Button from '@components/common/Button';
import Modal from '@components/common/ModalConfirm';
import { H5 } from '@style/DefaultStyled';
import { message } from 'antd';
import { Copy } from 'iconsax-react';
import { useTranslation } from 'react-i18next';
import { DefaultTheme, useTheme } from 'styled-components';
import * as S from './style';

type Props = {
  open: boolean;
  onCancel: () => void;
  listPin: string[];
};

const ModalViewPin = ({ open, onCancel, listPin }: Props) => {
  const theme = useTheme() as DefaultTheme;
  const { t } = useTranslation();
  const onCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success(t('user.copySuccess'));
  };

  return (
    <Modal hiddenIcon={false} isOpen={open} onCancel={onCancel}>
      <S.ModalBody>
        <S.Wrapper>
          <div className="content-modal ">
            <H5>{t('user.viewPinDetail')}</H5>
          </div>
          <S.ListPin>
            {listPin?.map((pin: string) => (
              <div
                key={pin}
                className="pin-item"
                onClick={() => onCopy(pin)}
                aria-hidden="true"
              >
                <div>{pin}</div>
                <S.Btn>
                  <Copy size="16" />
                </S.Btn>
              </div>
            ))}
          </S.ListPin>
          <Button
            size="large"
            onClick={onCancel}
            bgcolor={theme.colors.solidBrightGreenNetrual}
            color={theme.colors.emphasisDarkColorHight}
          >
            {t('user.close')}
          </Button>
        </S.Wrapper>
      </S.ModalBody>
    </Modal>
  );
};

export default ModalViewPin;
