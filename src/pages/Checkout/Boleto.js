import React, { useState } from "react";
import axios from "axios";

const Boleto = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [value, setValue] = useState(0);
  const [boletoUrl, setBoletoUrl] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/checkout", {
        name,
        email,
        cpf,
        value
      });
      setBoletoUrl(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="name">Nome Completo</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="cpf">CPF</label>
        <input
          type="text"
          id="cpf"
          value={cpf}
          onChange={(event) => setCpf(event.target.value)}
          required
        />

        <label htmlFor="valor">Valor</label>
        <input
          type="number"
          id="value"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          required
        />
        <button type="submit">Gerar Boleto</button>
      </form>
      {boletoUrl && (
        <div>
          <h3>Boleto Gerado</h3>
          <a href={boletoUrl} target="_blank" rel="noreferrer">
            Imprimir Boleto
          </a>
        </div>
      )}
    </div>
  );
};
export default Boleto;
