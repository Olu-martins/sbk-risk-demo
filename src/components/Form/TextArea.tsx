import { Textarea, Text, Flex } from "@chakra-ui/react";
import { useField } from "formik";

interface IProps {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  rows?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextAreaComponent(props: IProps) {
  const [field, meta] = useField(props.name);
  return (
    <Flex w="100%" flexDirection="column">
      {props.label && (
        <Text
          as="label"
          fontSize="14px"
          fontWeight={500}
          color="#344054"
          lineHeight="20px"
        >
          {props.label}
        </Text>
      )}
      <Textarea
        {...props}
        {...field}
        // h="44px"
        bgColor="#fff"
        border="1px solid #D0D5DD"
        padding="8px 16px"
        _placeholder={{
          color: "#667085",
          fontSize: "14px",
          fontWeight: 400,
        }}
        borderRadius="8px"
        fontSize="16px"
        lineHeight="24px"
        rows={props.rows}
        height="auto"
      />
      {meta.error && meta.touched && (
        <Text
          color="red.400"
          fontSize={{ base: "0.75rem", md: "0.875rem" }}
          mt={"0.25rem"}
          mb={"1rem"}
        >
          {meta.error}
        </Text>
      )}
    </Flex>
  );
}
