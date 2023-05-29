const Formatter = {
  cpf: {
    maxLength: 14,
    minLength: 14,
    placeholder: "000.000.000-00",
    format: (str) =>
      str
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1"),
  },
  username: {
    format: (str) => str.replace(/[^a-z A-Z]+/g, ""),
  },
  number: {
    format: (str) => str.replace(/\D/g, ""),
  },
  zipcode: {
    maxLength: 9,
    minLength: 5,
    format: (str) =>
      str
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d)/, "$1 $2")
        .replace(/(\d{5})(\d{3})/, "$1 $2"),
  },
  phone: {
    maxLength: 13,
    minLength: 11,
    placeholder: "00 00000 0000",
    format: (str) => {
      if (!str) return "";
      str = str.replace(/\D/g, "");
      str = str.replace(/^(\d{2})(\d)/g, "$1 $2");
      str = str.replace(/(\d)(\d{4})$/, "$1 $2");
      return str;
    },
  },
  ptDate: {
    format: (strDate) => strDate.split("T")[0].split("-").reverse().join("/"),
  },
};

export default Formatter;
