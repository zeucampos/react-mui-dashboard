import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography
} from "@mui/material";
import { useAds } from "providers/AdProvider";
import { FlexColumn } from "theme/styled";
import { decimalToReal } from "utils/index";

const mp = new window.MercadoPago(process.env.REACT_APP_MP_PUBLIC_KEY);

const CreditCard = () => {
  const { current } = useAds();
  const [identificationTypes, setIdentificationTypes] = useState([]);
  const [installments, setInstallments] = useState([]);
  const [cardNumberElement, setCardNumberElement] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardForm = mp.cardForm({
      amount: current.plan?.price,
      autoMount: true,
      form: {
        id: "paymentForm",
        cardholderName: {
          id: "cardholderName",
          placeholder: "Nome completo"
        },
        cardholderEmail: {
          id: "cardholderEmail",
          placeholder: "E-mail"
        },
        cardNumber: {
          id: "cardNumber",
          placeholder: "Número do cartão"
        },
        cardExpirationMonth: {
          id: "cardExpirationMonth",
          placeholder: "Mês de vencimento"
        },
        cardExpirationYear: {
          id: "cardExpirationYear",
          placeholder: "Ano de vencimento"
        },
        securityCode: {
          id: "securityCode",
          placeholder: "CVV"
        },
        installments: {
          id: "installments",
          placeholder: "Parcelas"
        },
        identificationType: {
          id: "identificationType",
          placeholder: "Tipo de documento"
        },
        identificationNumber: {
          id: "identificationNumber",
          placeholder: "Número do documento"
        },
        issuer: {
          id: "issuer",
          placeholder: "Banco emissor"
        }
      },
      callbacks: {
        onFormMounted: (error) => {
          if (error) return console.warn("Form Mounted handling error:", error);
          console.log("Form mounted");
        },
        onSubmit: (event) => {
          event.preventDefault();

          const formData = cardForm.getCardFormData();

          // Enviar os dados do cartão para o seu servidor e fazer o pagamento
          fetch("/process_payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
          })
            .then((response) => {
              return response.json();
            })
            .then((result) => {
              if (result.status === "approved") {
                alert("Pagamento aprovado!");
              } else {
                alert("Pagamento recusado!");
              }
            })
            .catch((error) => {
              console.error(error);
              alert("Ocorreu um erro ao processar o pagamento!");
            });
        },
        onFetching: (resource) => {
          console.log("Fetching resource:", resource);

          // Animação de loading

          return () => {
            // Parar a animação de loading
          };
        }
      }
    });
  };

  async function getInstallments(binData) {
    const { bin } = binData;

    if (bin.length >= 8) {
      const res = await mp.getInstallments({
        amount: current.plan?.price,
        bin,
        paymentTypeId: "credit_card"
      });

      setInstallments(res[0].payer_costs);
    }
  }

  const getIdentificationTypes = useCallback(async () => {
    try {
      const identificationTypes = await mp.getIdentificationTypes();

      setIdentificationTypes(identificationTypes);

      const cardNumber = mp.fields
        .create("cardNumber", {
          placeholder: "Número do cartão"
        })
        .mount("cardNumber");
      setCardNumberElement(cardNumber);

      const expirationDateElement = mp.fields
        .create("expirationDate", {
          placeholder: "MM/YY"
        })
        .mount("expirationDate");

      const securityCodeElement = mp.fields
        .create("securityCode", {
          placeholder: "Código de segurança"
        })
        .mount("securityCode");
    } catch (e) {
      return console.error("Error getting identificationTypes: ", e);
    }
  }, []);

  cardNumberElement?.on("binChange", getInstallments);

  useEffect(() => {
    if (identificationTypes.length === 0) getIdentificationTypes();
  }, []);

  return (
    <>
      <Card
        sx={{
          backgroundColor: (theme) => theme.palette.grey[200]
        }}
      >
        <CardHeader
          title={`Plano ${current.plan?.title}`}
          subheader={`${current.title}`}
          titleTypographyProps={{ align: "center" }}
          subheaderTypographyProps={{
            align: "center"
          }}
        />
        <FlexColumn alignItems="center">
          <p>Lorem Ipsum...</p>
        </FlexColumn>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "baseline",
              mb: 2
            }}
          >
            <Typography variant="h3" color="text.primary">
              {decimalToReal(current.plan?.price)}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} id="paymentForm">
        <div id="cardNumber" className="container"></div>
        <div id="expirationDate" className="container"></div>
        <div id="securityCode" className="container"></div>
        <input type="text" id="cardholderName" />
        {/* <select id="issuer"></select> */}
        <select id="installments">
          {installments &&
            installments.map((e) => (
              <option key={e.recommended_message}>
                {e.recommended_message}
              </option>
            ))}
        </select>
        <select id="identificationType">
          {identificationTypes &&
            identificationTypes.map((e) => (
              <option key={e.name}>{e.name}</option>
            ))}
        </select>
        <input type="text" id="identificationNumber" placeholder="CPF" />
        <input type="email" id="cardholderEmail" />

        <button type="submit" id="submit">
          Pagar
        </button>
        <progress value="0" className="progress-bar">
          Carregando...
        </progress>
        <Button variant="contained" color="primary" type="submit">
          Pay
        </Button>
      </form>
    </>
  );
};

export default CreditCard;
