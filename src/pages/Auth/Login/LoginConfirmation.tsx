import { Flex, Text, Input } from "@chakra-ui/react";
import PrimaryButton from "@components/Buttons/PrimaryButton";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MfaResponse } from "+types";
import { useVerifyMfaMutation } from "@api/features/auth.api";
import { useGlobalContext, UserInfo } from "@contexts/GlobalContext";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "@api/data/store";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  REMEMBER_ME,
  setCredentials,
} from "@api/data/authSlice";

const LoginConfirmation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data } = useLocation().state as { data: MfaResponse };
  const { setIsAuthenticated, updateUserData } = useGlobalContext();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [isError] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const rememberMe = localStorage.getItem(REMEMBER_ME) || false;
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const otpArray = pastedData
      .split("")
      .map((char) => char.replace(/[^0-9]/g, ""));

    setOtp(otpArray);
    inputRefs.current.forEach((input, index) => {
      if (input) {
        input.value = otpArray[index] || "";
      }
    });
  };
  const [verifyMfa, { isLoading }] = useVerifyMfaMutation();
  const handleVerify = async () => {
    try {
      const formBody = {
        mfaToken: otp.join(""),
        tempToken: data.tempToken,
      };
      const response = await verifyMfa(formBody).unwrap();
      if (response.data) {
        updateUserData(response.data as unknown as UserInfo);
        if (rememberMe) {
          localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
          localStorage.setItem(REFRESH_TOKEN, response.data.refreshToken);
        } else {
          sessionStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
          sessionStorage.setItem(REFRESH_TOKEN, response.data.refreshToken);
        }
        dispatch(setCredentials({ user: response.data }));
        setIsAuthenticated(true);
        navigate("/dashboard");
      }
    } catch (error) {
      const err = error as { data?: { message?: string } };
      console.log(err);
      toast.error(err.data?.message || "An error occurred");
    }
  };

  return (
    <Flex mt="6rem" padding="3rem 10rem" w="75%">
      <Flex flexDirection="column" gap="2.3rem" w="100%">
        <Flex flexDirection="column" gap="4.8rem">
          <Flex flexDirection="column" gap="1.2rem" w="100%">
            <Text
              fontSize="3rem"
              fontWeight={500}
              color="#2A180E"
              lineHeight="4rem"
            >
              Enter your verification code
            </Text>
            <Text
              fontSize="1.6rem"
              fontWeight={400}
              color="#2A180E"
              lineHeight="2rem"
            >
              Use your authenticator app to generate a code and enter it below.
            </Text>
          </Flex>
          <Flex flexDirection="column" gap="1.6rem">
            <Flex gap="2rem" justifyContent="space-between">
              {[...Array(6)].map((_, index) => (
                <>
                  <Input
                    key={index}
                    ref={(el: HTMLInputElement | null) => {
                      inputRefs.current[index] = el;
                    }}
                    value={otp[index]}
                    backgroundColor="#F7F7F2"
                    onPaste={index === 0 ? handlePaste : undefined}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[index] = e.target.value;
                      setOtp(newOtp);

                      if (e.target.value && index < 5) {
                        inputRefs.current[index + 1]?.focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (
                        (e.key === "Backspace" || e.key === "Delete") &&
                        !otp[index] &&
                        index > 0
                      ) {
                        inputRefs.current[index - 1]?.focus();
                      }
                    }}
                    w="5.6rem"
                    h="5.6rem"
                    textAlign="center"
                    fontSize="2.8rem"
                    maxLength={1}
                    borderRadius="1.2rem"
                    border={isError ? "1px solid #F03E26" : "1px solid #4A2111"}
                    _focus={{
                      borderColor: isError ? "#F03E26" : "#4A2111",
                      boxShadow: "none",
                    }}
                    _hover={{
                      borderColor: isError ? "#F03E26" : "#4A2111",
                    }}
                    color="#000000"
                  />
                </>
              ))}
            </Flex>
            {isError && (
              <Text fontSize="1.2rem" fontWeight={400} color="#F03E26">
                Wrong authentication code
              </Text>
            )}
          </Flex>

          <Flex flexDirection="column" gap="1.6rem">
            <PrimaryButton
              loading={isLoading}
              disabled={isLoading}
              type="button"
              onClickFxn={handleVerify}
            >
              Verify
            </PrimaryButton>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LoginConfirmation;
