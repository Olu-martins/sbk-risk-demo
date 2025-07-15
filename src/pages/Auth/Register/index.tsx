import { Flex, Link, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "@components/Form/Input";
import PrimaryButton from "@components/Buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { useSendOtpMutation } from "@api/features/auth.api";
import { toast } from "react-hot-toast";
interface IFormValues {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
}

const Register = () => {
  const navigate = useNavigate();
  const initialValues: IFormValues = {
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    companyName: Yup.string().required("Company name is required"),
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
  const [sendOtp, { isLoading }] = useSendOtpMutation();

  const handleSubmit = async (values: IFormValues) => {
    try {
      const formBody = {
        email: values.email,
        name: values.firstName,
      };
      const response = await sendOtp(formBody).unwrap();
      if (response) {
        sessionStorage.setItem("register", JSON.stringify(values));
        navigate("/register/confirmation");
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };

  return (
    <Flex padding="3rem 10rem" my="auto" w="85%">
      <Flex flexDirection="column" gap="3rem" w="100%">
        <Flex flexDirection="column" gap="1.2rem" w="100%">
          <Text
            fontSize="3rem"
            fontWeight={500}
            color="#2A180E"
            lineHeight="4rem"
          >
            Create your SBK Account
          </Text>
          <Text
            fontSize="1.6rem"
            fontWeight={400}
            color="#2A180E"
            lineHeight="2rem"
          >
            Already have an account?{" "}
            <Link color="red.400" fontWeight={600} href="/login">
              Log in
            </Link>
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
                  label="First Name"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                />

                <Input
                  label="Company Name"
                  name="companyName"
                  type="text"
                  placeholder="Company Name"
                />
                <Input
                  label="Work Email Address"
                  name="email"
                  type="email"
                  placeholder="Work Email Address"
                />
              </Flex>
              <Flex>
                <PrimaryButton loading={isLoading} type="submit">
                  Continue
                </PrimaryButton>
              </Flex>
            </Flex>
          </Form>
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

export default Register;
