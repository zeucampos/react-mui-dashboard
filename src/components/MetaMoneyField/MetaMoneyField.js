import { TextField } from "@mui/material";
import { CurrencyInput } from "react-currency-mask";

export default function MetaMoneyField(props) {
  const { value, onChange, ...rest } = props;

  return (
    <>
      {/* <CurrencyFormat
        value={item?.price}
        displayType={"text"}
        thousandSeparator={true}
        decimalScale={2}
        // decimalSeparator=","
        prefix={"R$"}
        inputMode=""
      /> */}
      <CurrencyInput
        value={value}
        onChangeValue={(event, originalValue, maskedValue) => {
          console.log(event, originalValue, maskedValue);
          onChange(originalValue);
        }}
        InputElement={<TextField {...rest} />}
      />
    </>
  );
}
