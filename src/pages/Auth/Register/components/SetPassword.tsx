import { Flex, Text } from "@chakra-ui/react";
import PrimaryButton from "@components/Buttons/PrimaryButton";
import PasswordInput from "@components/Form/PasswordInput";
import { Formik, Form } from "formik";
import { TickCircle } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "@api/features/auth.api";
import { toast } from "react-hot-toast";
interface IProps {
  password: string;
}

const SetPassword = () => {
  const navigate = useNavigate();
  const { email, firstName, lastName, companyName } = JSON.parse(
    sessionStorage.getItem("register") || "{}"
  );
  const initialValues: IProps = {
    password: "",
  };

  const [register, { isLoading }] = useRegisterMutation();

  const handleSetPassword = async (values: IProps) => {
    try {
      const formBody = {
        email: email,
        fullName: `${firstName} ${lastName}`,
        businessName: companyName,
        password: values.password,
      };
      const response = await register(formBody).unwrap();
      if (response.data) {
        navigate("/register/2fa", { state: { data: response.data } });
      }
    } 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message);
    }
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
        <Formik initialValues={initialValues} onSubmit={handleSetPassword}>
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
                  <PrimaryButton loading={isLoading} type="submit">
                    Continue
                  </PrimaryButton>
                </Flex>
              </Flex>
            </Form>
          )}
        </Formik>
        <Flex>
          <Text
            textAlign={"center"}
            fontSize="1.4rem"
            fontWeight={400}
            color="#5A5654"
            lineHeight="1.8rem"
          >
            You're joining as an admin of this company. Admins create the
            company account and invite other team members. Permission levels can
            be changed in company settings later.
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SetPassword;
