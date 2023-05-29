import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Spacer } from "theme/styled";
import { useAds } from "providers/AdProvider";
import { Star } from "@mui/icons-material";
import PlanService from "services/plan";
import { Payment, StatusScreen, initMercadoPago } from "@mercadopago/sdk-react";
import PaymentService from "services/payment";
import { decimalToReal } from "utils/index";
import AdService from "services/ad";
import { toast } from "react-toastify";

const customization = {
  visual: {
    style: {
      theme: "bootstrap",
    },
  },
  paymentMethods: {
    ticket: "all",
    bankTransfer: "all",
    creditCard: "all",
    pix: "all",
    // debitCard: "all",
    mercadoPago: "all",
  },
};

initMercadoPago(process.env.REACT_APP_MP_PUBLIC_KEY, {
  locale: "pt-BR",
});

const Checkout = () => {
  const [payment, setPayment] = useState();
  const { current, setCurrent } = useAds();

  const fetchPlan = async () => {
    const res = await PlanService.show(current.ad_plan_id);
    setCurrent({
      ...current,
      plan: res.data,
    });
  };

  const findPayment = async () => {
    const res = await AdService.findPayment(current.id);
    if (res) {
      toast.info("Continue o pagamento do seu plano de anuncio.");
      setPayment({ id: res.mp_id });
    }
  };

  useEffect(() => {
    fetchPlan();
    findPayment();
    // return () => {
    //   console.log("Checkout unmounted");
    //   const form = document.getElementById("paymentBrick_container");
    //   if (form) form.remove();
    // };
  }, []);

  const initialization = useMemo(
    () => ({
      amount: current.plan?.price || 1,
      // preferenceId: "<PREFERENCE_ID>"
    }),
    [current]
  );

  const onSubmit = async ({ formData }) => {
    const payment = await PaymentService.process({
      item: current,
      paymentInfo: formData,
    });

    setPayment(payment);
  };

  const onError = async (error) => {
    // callback called for all Brick error cases
    console.log(error);
  };

  const onReady = async () => {
    /*
      Callback called when Brick is ready.
      Here you can hide loadings from your site, for example.
    */
  };

  const paymentForm = useCallback(() => {
    if (!payment)
      return (
        <Payment
          initialization={initialization}
          customization={customization}
          onSubmit={onSubmit}
          // onReady={onReady}
          // onError={onError}
        />
      );
  }, [initialization, onSubmit]);

  const paymentStatus = useCallback(() => {
    if (payment)
      return (
        <StatusScreen
          customization={{
            visual: {
              style: {
                theme: "bootstrap",
              },
            },
          }}
          initialization={{ paymentId: payment.id }}
          onReady={onReady}
          onError={onError}
        />
      );
  }, [payment]);

  return (
    <Box>
      <Spacer size={64} />

      <Card
        sx={{
          borderColor: (theme) =>
            current?.plan?.title.toLowerCase() === "black"
              ? theme.palette.primary.main
              : theme.palette.grey[200],
          borderWidth: 4,
          borderStyle: "solid",
          boxShadow: "none",
        }}
      >
        <CardHeader
          title={current?.plan?.title}
          titleTypographyProps={{ align: "center" }}
          action={
            current?.plan?.title.toLowerCase() === "black" ? (
              <Star color="primary" />
            ) : null
          }
          subheaderTypographyProps={{
            align: "center",
          }}
        />
        <Typography textAlign="center">{current?.plan?.description}</Typography>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "baseline",
            }}
          >
            <Typography textAlign="center">
              {current?.plan?.installments} {"x "}
            </Typography>
            <Spacer size={8} />
            <Typography variant="h4" fontWeight="bold" color="text.primary">
              {decimalToReal(current?.plan?.installment_value || 0)}
            </Typography>
          </Box>
          <Typography
            // variant="p"
            textAlign="center"
            fontWeight="500"
            // color="text.primary"
          >
            Valor total: {decimalToReal(current?.plan?.price)}
          </Typography>
        </CardContent>
      </Card>
      <Spacer />

      {paymentForm()}
      {paymentStatus()}
    </Box>
  );
};
export default Checkout;
