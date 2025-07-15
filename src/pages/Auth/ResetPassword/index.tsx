import { Flex, Text } from "@chakra-ui/react";
import PrimaryButton from "@components/Buttons/PrimaryButton";
import PasswordInput from "@components/Form/PasswordInput";
import { Formik, Form } from "formik";
import { TickCircle } from "iconsax-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useResetPasswordMutation } from "@api/features/auth.api";
import { toast } from "react-hot-toast";
interface IProps {
  password: string;
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("t");
  const initialValues: IProps = {
    password: "",
  };

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleVerify = async (values: IProps) => {
    try {
      const formBody = {
        password: values.password,
        token: token || "",
      };
      const response = await resetPassword(formBody).unwrap();
      if (response) {
        toast.success(response.message);
        navigate("/");
      }
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err.data?.message || "An error occurred");
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
                    Set New Password
                  </Text>
                  <Text
                    fontSize="1.6rem"
                    fontWeight={400}
                    color="#2A180E"
                    lineHeight="2rem"
                  >
                    After saving your password, you'll be taken back to login.
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
                  <PrimaryButton
                    type="submit"
                    loading={isLoading}
                    disabled={isLoading}
                  >
                    Save Password
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

export default ResetPassword;
