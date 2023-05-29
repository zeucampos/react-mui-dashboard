import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Title from "components/Title";
import { BorderLinearProgress } from "./styled";
import { useCallback, useState } from "react";
import PersonalInfo from "./PersonalInfo";
import AddressInfo from "./AddressInfo";
import UserService from "services/user";
import Success from "./Success";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Spacer } from "theme/styled";

export default function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    terms: false,
    // address: {
    cep: "",
    logradouro: "",
    complemento: "",
    numero: "",
    uf: "",
    cidade: ""
    // }
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    UserService.store(form)
      .then((res) => {
        setIsLoading(false);
        _nextStep();
      })
      .catch((e) => {
        toast.error(e.message);
      });
    setIsLoading(false);
  };

  const changeForm = useCallback(
    (key, value) => {
      setForm({ ...form, [key]: value });
    },
    [form]
  );

  const _nextStep = useCallback(
    () => setCurrentStep(currentStep + 1),
    [currentStep]
  );
  const _prevStep = useCallback(
    () => setCurrentStep(currentStep - 1),
    [currentStep]
  );

  const goLogin = () => navigate("/");

  const wizardForm = useCallback(() => {
    if (currentStep === 1)
      return (
        <PersonalInfo
          changeForm={changeForm}
          form={form}
          nextStep={_nextStep}
          redirect={goLogin}
        />
      );
    if (currentStep === 2)
      return (
        <AddressInfo
          changeForm={changeForm}
          form={form}
          prevStep={_prevStep}
          setForm={setForm}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      );
    if (currentStep === 3) return <Success redirect={goLogin} form={form} />;
  }, [form, changeForm, currentStep, _nextStep, _prevStep]);

  // useEffect(() => {}, []);

  return (
    <Container component="main" maxWidth="xs">
      <Title textAlign="center">Cadastro de usuário</Title>

      <BorderLinearProgress
        sx={{ height: 10, marginTop: 6 }}
        variant="determinate"
        value={(currentStep / 3) * 100}
      />

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
        bgcolor="light"
        boxShadow={1}
        padding={3}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {wizardForm()}
        </Box>
      </Box>
      <Spacer size={64} />
    </Container>
  );
}
