import { Input as InputComponent, Field, Flex } from "@chakra-ui/react";
import { useField } from "formik";

interface IProps {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  fontSize?: string;
  textColor?: string;
}

export default function Input(props: IProps) {
  const [field, meta] = useField(props.name);
  return (
    <Field.Root
      w="100%"
      flexDirection="column"
      gap="1rem"
      invalid={!!meta.error && meta.touched}
    >
      {props.label && (
        <Field.Label
          fontSize="1.4rem"
          fontWeight={400}
          color="#2A180E"
          lineHeight="1.8rem"
        >
          {props.label}
        </Field.Label>
      )}
      <Flex w="100%" flexDirection="column" gap="0.5rem">
        <InputComponent
          {...props}
          {...field}
          h="5rem"
          bgColor={props.isDisabled ? "#F1F1F1" : "#fff"}
          border="0.5px solid #999999"
          padding="1.2rem 1.6rem"
          _placeholder={{
            color: "#2A180E",
            fontSize: "1.6rem",
            fontWeight: 400,
          }}
          borderRadius="1.4rem"
          lineHeight="2rem"
          fontSize={props.fontSize || "1.6rem"}
          fontWeight={400}
          color={props.textColor || "#2A180E"}
          disabled={props.isDisabled}
          autoFocus={false}
        />
        {meta.error && meta.touched && (
          <Field.HelperText
            color="red.400"
            fontSize={{ base: "0.75rem", md: "1rem" }}
            mb={"1rem"}
          >
            {meta.error}
          </Field.HelperText>
        )}
      </Flex>
    </Field.Root>
  );
}
