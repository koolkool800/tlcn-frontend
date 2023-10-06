import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import buyTicketService, { CreateOrders } from '@services/buyTicketService';
import { Form, message } from 'antd';
import { ResponseModel } from 'interface';
import { DeliveryInformation } from 'interface/insideTicket';
import { useState } from 'react';

const api_url = 'http://localhost:3000/api/v1';

type OnApproveData = {
  billingToken?: string | null;
  facilitatorAccessToken: string;
  orderID: string;
  payerID?: string | null;
  paymentID?: string | null;
  subscriptionID?: string | null;
  authCode?: string | null;
};

type FormValue = Omit<CreateOrders, 'ticketId' | 'deliveryMethod'> & {
  addressId: number | undefined;
  address: string | undefined;
  detailAddress: string | undefined;
  zoneCode: string | undefined;
  contact: string | undefined;
  name: string | undefined;
  phone: string | undefined;
};

type Props = {
  idTicket: string;
  methodDelivery: string;
  setPaymentSuccess: (value: boolean) => void;
};

function PaypalPayment({ idTicket, methodDelivery, setPaymentSuccess }: Props) {
  /**
   *
   * @param values
   */
  const createOderPayment = async (values: FormValue): Promise<any> => {
    try {
      const deliveryInfo: DeliveryInformation = values.addressId
        ? {
            addressId: values.addressId ? Number(values.addressId) : undefined,
          }
        : {
            name: values.name,
            phone: values.phone,
            code: values.zoneCode,
            address: values.address,
            detailAddress: values.detailAddress,
          };
      const requestParams: CreateOrders = {
        ticketId: String(idTicket),
        deliveryMethod: methodDelivery,
        deliveryInfo: deliveryInfo as any,
        voucherId: values.voucherId ? String(values.voucherId) : undefined,
        cashReceiptType: values.cashReceiptType,
        cashReceipt: values.cashReceipt?.replace(/\D/g, ''),
      };

      const res = await buyTicketService.createOrderPayment(requestParams);

      //return amount va order id
      return res.data;
    } catch (e) {
      const error = e as ResponseModel<string>;
      message.error(`HTTP_STATUS.${error.errorCode}`);
      return error.errorCode;
    }
  };

  /**
   *
   * @description pass the resellOrderId (id of the order just created) and amount (total payment) to create the order
   */
  async function createOrder(): Promise<string> {
    const values = form.getFieldsValue();

    const zoneCodeValue = form.getFieldValue('zoneCode');
    const valueForm = { ...values, zoneCode: zoneCodeValue };
    const { orderId, amount } = await createOderPayment(valueForm);

    const response = await fetch(`${api_url}/payment/paypal/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resellOrderId: Number(orderId),
        amount,
      }),
    });

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

  const form = Form.useFormInstance();

  /**
   *
   * @description capture the order after the user approves the payment, replace the resell order id is the id of the resell order
   */
  async function onApprove(data: OnApproveData, actions: any) {
    try {
      const response = await fetch(`${api_url}/payment/paypal/capture-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resellOrderId: 700024, //REPLACE
          paypalOrderId: data.orderID,
        }),
      });

      const orderData = await response.json();
      // Three cases to handle:
      //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
      //   (2) Other non-recoverable errors -> Show a failure message
      //   (3) Successful transaction -> Show confirmation or thank you message

      const errorDetail = orderData?.details?.[0];

      if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
        // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
        // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
        return actions.restart();
      } else if (errorDetail) {
        // (2) Other non-recoverable errors -> Show a failure message
        message.error(`${errorDetail.description} (${orderData.debug_id})`);
      } else {
        // (3) Successful transaction -> Show confirmation or thank you message
        // Or go to another URL

        console.log('Capture result', orderData);
        setPaymentSuccess(true);
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

export default PaypalPayment;
