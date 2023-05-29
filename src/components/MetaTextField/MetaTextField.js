import { useMemo, useState } from "react";

import FieldError from "utils/fieldError";
import Formatters from "utils/formatter";
import Validators from "utils/validators";

import { TextField } from "@mui/material";

export default function MetaTextField(props) {
  const { maskType, onChangeText, validations, onValidate, ...rest } = props;

  const [successFilled, setSuccessFilled] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");

  const maskFactory = useMemo(() => {
    if (!maskType) return null;

    const formatterName = maskType.toLowerCase();
    const properties = Formatters[formatterName];

    return properties;
  }, [maskType]);

  const validate = (text) => {
    if (!text) {
      setErrorMessage(undefined);
      setSuccessFilled(undefined);
      return;
    }

    const validationResult = validations.every((validatorName) => {
      const validator = Validators[validatorName];

      if (!validator) return false;

      const valid = validator(text);
      if (valid === false) {
        setErrorMessage(FieldError[validatorName]);
        setSuccessFilled(false);
        return false;
      } else {
        setErrorMessage("");
        setSuccessFilled(true);
        return true;
      }
    });

    if (onValidate) onValidate(validationResult);
    setSuccessFilled(validationResult);
  };

  const handleChange = (event) => {
    const text = event.target.value;

    if (maskFactory) {
      const value = maskFactory.format(text);
      onChangeText(value);

      if (text.length < maskFactory.minLength) {
        setErrorMessage(undefined);
        setSuccessFilled(undefined);
      }

      if (text.length >= maskFactory.minLength && validations) {
        validate(text);
      } else if (validations) {
        validate(text);
      }
    } else {
      if (validations) validate(text);
      onChangeText(text);
    }
  };

  return (
    <>
      <TextField
        margin="0"
        onChange={handleChange}
        {...rest}
        helperText={errorMessage?.length ? errorMessage : null}
      />
    </>
  );
}
