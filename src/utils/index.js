export const capitalize = (s) => {
  if (!s) return ``;

  let vs = `${s}`;
  return `${vs.charAt(0).toUpperCase()}${vs.slice(1)}`;
};

export const decimalToReal = (value) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

export const API_URL = "http://127.0.0.1:8080";
