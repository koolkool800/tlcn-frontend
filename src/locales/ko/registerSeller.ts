const registerSeller = {
  sellerRegistration: '판매자 등록',
  successMessage: `Your registration request has been sent to Resell Ticket. The
                  result of request will be sent to you via email and platform
                  notification.`,
  register: 'Register',
  individual: {
    title: 'Individual',
    content1: `When you register as an individual seller, you need to
                          identity authentication with PASS.`,
    content2: `As an individual seller, you need to deposit to
                          platform 50,000 won in order to make sure that you
                          will send ticket after buyer completed payment to
                          platform . This balance will be refund when the
                          transaction completed.`,
  },
  business: {
    title: '법인/개인사업자',
    content1: `When you register as 법인/개인사업자, you need to
                          supply your company email and business registration
                          certificate or copy of bankbook. Your registration
                          request will be considered and you will be received
                          the result via email and platform notification.`,
    content2: `As 법인/개인사업자, you can sell ticket on our
                          platform without deposit 50,000 won.`,
  },
};

export default registerSeller;
