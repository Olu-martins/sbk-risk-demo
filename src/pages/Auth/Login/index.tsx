import { Alert, Checkbox, Flex, Link, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "@components/Form/Input";
import PrimaryButton from "@components/Buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";
import PasswordInput from "@components/Form/PasswordInput";
import { useState } from "react";
import { useLoginMutation } from "@api/features/auth.api";
import { useGlobalContext, UserInfo } from "@contexts/GlobalContext";
import { useAppDispatch } from "@api/data/store";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  REMEMBER_ME,
  setCredentials,
} from "@api/data/authSlice";
import { AuthResult } from "+types";
import toast from "react-hot-toast";
interface IFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { setIsAuthenticated, updateUserData } = useGlobalContext();
  const [rememberMe, setRememberMe] = useState(false);
  const initialValues: IFormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // const handleSubmit = async () => {
  //   navigate("/dashboard");
  // }

  const [login, { isLoading, isError }] = useLoginMutation();

  const handleSubmit = async (values: IFormValues) => {
    try {
      const response = await login(values).unwrap();
      if (response.data) {
        if (rememberMe) {
          localStorage.setItem(REMEMBER_ME, "true");
        }
        if (response.data.requiresMFA) {
          navigate("/login/confirmation", {
            state: { data: response.data },
          });
        } else {
          const { accessToken, refreshToken } = response.data as AuthResult;
          updateUserData(response.data as unknown as UserInfo);
          if (rememberMe) {
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);
          } else {
            sessionStorage.setItem(ACCESS_TOKEN, accessToken);
            sessionStorage.setItem(REFRESH_TOKEN, refreshToken);
          }
          dispatch(
            setCredentials({
              user: response.data,
            })
          );
          setIsAuthenticated(true);
          navigate("/dashboard");
        }
      }
    } catch (error) {
      const { data } = error as unknown as { data: { message: string } };
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
            Login to your SBK Account
          </Text>
          <Text
            fontSize="1.6rem"
            fontWeight={400}
            color="#2A180E"
            lineHeight="2rem"
          >
            Don't have an account?{" "}
            <Link color="red.400" fontWeight={600} href="/register">
              Sign up
            </Link>
          </Text>
        </Flex>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <Flex flexDirection="column" gap="3rem" w="100%">
                <Flex flexDirection="column" gap="2.2rem" w="100%">
                  {isError && (
                    <Alert.Root
                      alignItems="center"
                      backgroundColor="transparent"
                      status="error"
                    >
                      <Alert.Indicator color="#F03E26" fontSize="1.6rem" />
                      <Alert.Title
                        color="#F03E26"
                        fontSize="1.4rem"
                        fontWeight={400}
                        lineHeight="2rem"
                      >
                        Sorry, you entered an incorrect email address or
                        password
                      </Alert.Title>
                    </Alert.Root>
                  )}
                  <Input
                    label="Work Email Address"
                    name="email"
                    type="email"
                    placeholder="Work Email Address"
                  />
                  <PasswordInput
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Password"
                    showEye={true}
                    onChange={(value) => {
                      setFieldValue("password", value);
                    }}
                  />
                  <Flex justifyContent="space-between" alignItems="center">
                    <Flex alignItems="center" gap="1.2rem">
                      <Checkbox.Root
                        variant="solid"
                        checked={rememberMe}
                        onCheckedChange={(e) => setRememberMe(!!e.checked)}
                      >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label fontSize="1.4rem" color="#2A180E">
                          Remember me
                        </Checkbox.Label>
                      </Checkbox.Root>
                    </Flex>
                    <Link
                      color="red.400"
                      fontWeight={600}
                      href="/forgot-password"
                    >
                      Forgot Password?
                    </Link>
                  </Flex>
                </Flex>
                <Flex mt="2rem">
                  <PrimaryButton
                    loading={isLoading}
                    disabled={isLoading}
                    type="submit"
                  >
                    Log in
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

export default Login;