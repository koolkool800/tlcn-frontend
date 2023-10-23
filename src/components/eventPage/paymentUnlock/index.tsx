import { CONFIG } from '@constants/codeConstants';
import useAuth from '@hooks/useAuth';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { message } from 'antd';

type OnApproveData = {
  billingToken?: string | null;
  facilitatorAccessToken: string;
  orderID: string;
  payerID?: string | null;
  paymentID?: string | null;
  subscriptionID?: string | null;
  authCode?: string | null;
};

type Props = {
  setPaymentSuccess: (value: boolean) => void;
  setCloseModel: (value: boolean) => void;
};

function PaypalPaymentUnlock({ setPaymentSuccess, setCloseModel }: Props) {
  const auth = useAuth();

  /**
   *
   * @returns {paypalId : id of paypal created }
   */
  async function createOrder(): Promise<string> {
    const userEmail = auth.email;

    const response = await fetch(
      `${CONFIG.API_URL}/api/v1/payment/paypal/create-unlock`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail,
        }),
      }
    );

    const orderData = await response.json();

    if (orderData.data.paypalOrderId) {
      return orderData.data.paypalOrderId;
    } else {
      const errorDetail = orderData?.details?.[0];
      const errorMessage = errorDetail
        ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
        : JSON.stringify(orderData);

      throw new Error(errorMessage);
    }
  }

  async function onApprove(data: OnApproveData, actions: any) {
    try {
      const response = await fetch(
        `${CONFIG.API_URL}/api/v1/payment/paypal/capture-unlock`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paypalOrderId: data.orderID,
            userEmail: auth.email,
          }),
        }
      );

      const orderData = await response.json();

      const errorDetail = orderData?.details?.[0];

      if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
        return actions.restart();
      } else if (errorDetail) {
        message.error(`${errorDetail.description} (${orderData.debug_id})`);
      } else {
        console.log('Capture result', orderData);
        setPaymentSuccess(true);
        message.success('Payment success');
      }
    } catch (error) {
      console.error(error);
      message.error('Something went wrong');
    }
  }

  return (
    <>
      <PayPalScriptProvider
        options={{
          clientId:
            'AaxTON4F0JBO6rNqhi_5bFtxF4sHFr_qjKRJG5VYzbcRbMAsF1eMNhmjDPagjnAbu7Ug8p1YDWS3C3Vi',
          currency: 'USD',
          intent: 'capture',
        }}
      >
        <PayPalButtons
          style={{ layout: 'horizontal' }}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </PayPalScriptProvider>
    </>
  );
}

export default PaypalPaymentUnlock;
