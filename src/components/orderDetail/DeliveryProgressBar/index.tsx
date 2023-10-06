import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './style';

type Props = {
  steps: { title: string }[];
  currentStepTitle?: string;
};

const DeliveryProgressBar = ({ steps, currentStepTitle }: Props) => {
  const { t } = useTranslation();

  const currentStep = useMemo(() => {
    return steps.findIndex((step) => step.title === currentStepTitle);
  }, [currentStepTitle, steps]);

  const renderSteps = () => {
    return steps?.map((step, index) => (
      <S.Step isActive={currentStep >= index} key={step.title}>
        <p>{t(`user.order.delivery.${step.title}`)}</p>
        <div className="status-bar" />
      </S.Step>
    ));
  };
  return (
    <S.DeliveryProgressContainer>
      <div className="progress-wrap">{renderSteps()}</div>
    </S.DeliveryProgressContainer>
  );
};

export default DeliveryProgressBar;
