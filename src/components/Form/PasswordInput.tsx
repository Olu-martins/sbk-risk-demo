import { useState } from "react";
import { Input, Flex, Field, InputGroup } from "@chakra-ui/react";
import { useField } from "formik";
import { Eye, EyeSlash } from "iconsax-react";

type CustomInputChangeHandler = (newValue: string) => void;

interface IProps {
  onChange: CustomInputChangeHandler;
  placeholder: string;
  label?: string;
  type: string;
  name: string;
  showEye: boolean;
}

const PasswordInput = (props: IProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField(props.name);

  return (
    <Field.Root
      w="100%"
      flexDirection="column"
      invalid={!!meta.error && meta.touched}
    >
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
      <Flex flexDirection="column" gap="2px" width="100%">
        <InputGroup
          borderRadius="1.4rem"
          border="0.5px solid #999999"
          backgroundColor="white"
          padding="1.2rem 1.6rem"
           h="56px"
          endAddonProps={{
            border: "none",
          }}
          endAddon={
            props.showEye && (
              <Flex
                alignItems="center"
                justifyContent="center"
                backgroundColor="white"
                cursor="pointer"
                h="100%"
              >
                {showPassword ? (
                  <Eye
                    size="28px"
                    color="#4A2111"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <EyeSlash
                    size="28px"
                    color="#4A2111"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </Flex>
            )
          }
        >
          <Input
            {...props}
            {...field}
            border="none"
            _focus={{
              border: "none",
              outline: "none",
              boxShadow: "none",
            }}
            _focusVisible={{
              border: "none",
              outline: "none",
              boxShadow: "none",
            }}
            _focusWithin={{
              border: "none",
              outline: "none",
              boxShadow: "none",
            }}
            _active={{
              border: "none",
              outline: "none",
              boxShadow: "none",
            }}
            height="100%"
            _placeholder={{
              color: "#2A180E",
              fontSize: "1.6rem",
              fontWeight: 400,
            }}
            lineHeight="2rem"
            fontWeight={400}
            color="#2A180E"
            fontSize="1.8rem"
            type={showPassword ? "text" : "password"}
          />
        </InputGroup>
        {meta.error && meta.touched && (
          <Field.HelperText
            color="red.400"
            fontSize={{ base: "0.75rem", md: "0.875rem" }}
            mt={"0.25rem"}
            mb={"1rem"}
          >
            {meta.error}
          </Field.HelperText>
        )}
      </Flex>
    </Field.Root>
  );
};

export default PasswordInput;
