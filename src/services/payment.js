import http from "./http";

const report = async (filters) => {
  const res = await http.service.get(`/financial-report`, { params: filters });
  return res.data;
};

const process = async (formData) => {
  const res = await http.service.post(`/process-payment`, formData);
  return res.data;
};

const PaymentService = {
  report,
  process,
};

export default PaymentService;
