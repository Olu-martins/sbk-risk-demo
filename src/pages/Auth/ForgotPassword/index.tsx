import { Flex, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "@components/Form/Input";
import PrimaryButton from "@components/Buttons/PrimaryButton";
import { useForgotPasswordMutation } from "@api/features/auth.api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
interface IFormValues {
  email: string;
}

const ForgotPassword = () => {
  const navigate = useNavigate();
  const initialValues: IFormValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .test(
        "is-valid-work-email",
        "Please use your work email address",
        (value) => {
          if (!value) return false;
          const personalDomains = [
            "gmail.com",
            "yahoo.com",
            "hotmail.com",
            "outlook.com",
            "aol.com",
            "icloud.com",
            "mail.com",
            "protonmail.com",
            "zoho.com",
          ];
          const domain = value.split("@")[1]?.toLowerCase();
          return Boolean(domain && !personalDomains.includes(domain));
        }
      )
      .required("Work email address is required"),
  });

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (values: IFormValues) => {
    try {
      const response = await forgotPassword(values).unwrap();
      if (response) {
        toast.success(response.message);
        navigate("/");
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = error as any;
      toast.error(data?.message);
    }
  };

  return (
    <Flex mt="6rem" padding="3rem 14rem" w="80%">
      <Flex flexDirection="column" gap="3rem" w="100%">
        <Flex flexDirection="column" gap="1.2rem" w="100%">
          <Text
            fontSize="3rem"
            fontWeight={500}
            color="#2A180E"
            lineHeight="4rem"
          >
            Forgot Password
          </Text>
          <Text
            fontSize="1.6rem"
            fontWeight={400}
            color="#2A180E"
            lineHeight="2rem"
          >
            Please enter your email associated with your account, we’ll send an
            email with instructions to reset your password.
          </Text>
        </Flex>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Flex flexDirection="column" gap="3rem" w="100%">
              <Flex flexDirection="column" gap="2.2rem" w="100%">
                <Input
                  label="Work Email Address"
                  name="email"
                  type="email"
                  placeholder="Work Email Address"
                />
              </Flex>
              <Flex mt="2rem">
                <PrimaryButton
                  type="submit"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  Reset Password
                </PrimaryButton>
              </Flex>
            </Flex>
          </Form>
        </Formik>
      </Flex>
    </Flex>
  );
};

export default ForgotPassword;
