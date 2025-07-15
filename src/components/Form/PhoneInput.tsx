import { Field } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import Phone, { CountryData, PhoneInputProps } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface Iprops extends PhoneInputProps {
  label?: string;
  name: string;
  value: string;
  error?: string;
  touched?: boolean;
  country?: string;
  onChangeCountry?: (country: string) => void;
}

const PhoneInput = (props: Iprops) => {
  const { setFieldValue } = useFormikContext();

  const handleChange = (value: string, country: CountryData) => {
    setFieldValue(props.name, value);
    setFieldValue("country_code", country.countryCode);
    if (props.onChangeCountry) {
      props.onChangeCountry(country.countryCode);
    }
  };
  return (
    <Field.Root w="100%" flexDirection="column">
      {props.label && (
        <Field.Label
        fontSize="1.6rem"
        fontWeight={400}
        color="#2A180E"
        lineHeight="2rem"
        >
          {props.label}
        </Field.Label>
      )}

      <Phone
        {...props}
        country={props.country || "ng"}
        inputProps={{
          name: props.name,
          id: props.name,
          value: props.value,
        }}
        value={props.value}
        autoFormat={false}
        containerClass="w-[100%] focus:border border border-[#4A2111] gap-3 py-2 px-5 rounded-[1.2rem]"
        buttonStyle={{
          background: "transparent",
          border: "none",
        }}
        inputStyle={{
          width: "100%",
          border: "none",
        }}
        dropdownStyle={{
          background: "#F5F5F5",
        }}
        onChange={handleChange}
        enableSearch={true}
      />
      {props.error && props.touched && (
        <Field.HelperText
          color="red.400"
          fontSize={{ base: "0.75rem", md: "0.875rem" }}
          mt={"0.25rem"}
          mb={"1rem"}
        >
          {props.error}
        </Field.HelperText>
      )}
    </Field.Root>
  );
};

export default PhoneInput;
