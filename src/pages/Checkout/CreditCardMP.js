import { Payment, initMercadoPago } from "@mercadopago/sdk-react";
import { useAds } from "providers/AdProvider";

import { useMemo } from "react";
import PaymentService from "services/payment";

initMercadoPago(process.env.REACT_APP_MP_PUBLIC_KEY);

const customization = {
  paymentMethods: {
    ticket: "all",
    bankTransfer: "all",
    creditCard: "all",
    mercadoPago: "all"
  }
};

const CreditCard = () => {
  const { current } = useAds();

  const initialization = useMemo(
    () => ({
      amount: current.plan?.price
    }),
    [current]
  );

  const onSubmit = async ({ formData }) => {
    return await PaymentService.create({
      item: current,
      payment: formData
    });
  };

  const onError = async (error) => {
    // callback called for all Brick error cases
    console.log(error);
  };

  const onReady = async () => {};

  return (
    <>
      <div id="cardPaymentBrick_container"></div>

      <Payment
        initialization={initialization}
        customization={customization}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onError}
      />
    </>
  );
};

export default CreditCard;
