import { InputGroup, Flex, Text } from "@chakra-ui/react";
import { ChangeEventHandler, useRef } from "react";

export default function FileUpload(props: {
  accept: string;
  multiple: boolean;
  children: React.ReactNode;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  label?: string;
}) {
  const { accept, multiple, children, label } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => inputRef.current?.click();

  return (
    <Flex w="100%" flexDirection="column">
      {label && (
        <Text
          as="label"
          fontSize="14px"
          fontWeight={500}
          color="#344054"
          lineHeight="20px"
          mb={2}
        >
          {label}
        </Text>
      )}

      <InputGroup onClick={handleClick} w="100%">
        <>
          <input
            type={"file"}
            multiple={multiple || false}
            hidden
            accept={accept}
            onChange={props.handleChange}
            ref={(e) => {
              inputRef.current = e;
            }}
          />
          {children}
        </>
      </InputGroup>
    </Flex>
  );
}
