import { Flex, Text } from "@chakra-ui/react";
import PrimaryButton from "@components/Buttons/PrimaryButton";
import PasswordInput from "@components/Form/PasswordInput";
import { Formik, Form } from "formik";
import { TickCircle } from "iconsax-react";
import { useNavigate } from "react-router-dom";
interface IProps {
  password: string;
}

const InviteSetPassword = () => {
  const navigate = useNavigate();
  const initialValues: IProps = {
    password: "",
  };

  const handleVerify = (values: IProps) => {
    console.log(values);
    navigate("/invite/set-password");   
  };

  const checks = [
    {
      text: "At least 10 characters",
      regex: /^.{10,}$/,
    },
    {
      text: "Numbers",
      regex: /[0-9]/,
    },
    {
      text: "Letters",
      regex: /[a-zA-Z]/,
    },
    {
      text: "Special characters",
      regex: /[!@#$%^&*()_+{}[\]:;<>,.?~/-]/,
    },
  ];

  return (
    <Flex mt="6rem" padding="3rem 10rem" w="85%">
      <Flex flexDirection="column" gap="2.3rem" w="100%">
        <Formik initialValues={initialValues} onSubmit={handleVerify}>
          {({ values, setFieldValue }) => (
            <Form>
              <Flex flexDirection="column" gap="4.8rem">
                <Flex flexDirection="column" gap="1.2rem" w="100%">
                  <Text
                    fontSize="3rem"
                    fontWeight={500}
                    color="#2A180E"
                    lineHeight="4rem"
                  >
                    Create your SBK password
                  </Text>
                  <Text
                    fontSize="1.6rem"
                    fontWeight={400}
                    color="#2A180E"
                    lineHeight="2rem"
                  >
                    This password will be used to log into your account.
                  </Text>
                </Flex>
                <Flex flexDirection="column" gap="1.2rem">
                  <Flex>
                    <PasswordInput
                      type="password"
                      name="password"
                      placeholder="Password"
                      showEye={true}
                      onChange={(value) => {
                        setFieldValue("password", value);
                      }}
                    />
                  </Flex>

                  <Flex flexDirection="column" gap="0.4rem">
                    {checks.map((check) => (
                      <Flex alignItems="center" gap="0.4rem">
                        <TickCircle
                          size="1.2rem"
                          color={
                            check.regex.test(values.password)
                              ? "#127813"
                              : "#5A5654"
                          }
                        />
                        <Text
                          fontSize="1.2rem"
                          fontWeight={400}
                          color={
                            check.regex.test(values.password)
                              ? "#127813"
                              : "#5A5654"
                          }
                          lineHeight="2rem"
                        >
                          {check.text}
                        </Text>
                      </Flex>
                    ))}
                  </Flex>
                </Flex>

                <Flex flexDirection="column" gap="1.6rem">
                  <PrimaryButton type="submit" >
                   Continue
                  </PrimaryButton>
                  
                </Flex>
              </Flex>
            </Form>
          )}
        </Formik>
       
      </Flex>
    </Flex>
  );
};

export default InviteSetPassword;
