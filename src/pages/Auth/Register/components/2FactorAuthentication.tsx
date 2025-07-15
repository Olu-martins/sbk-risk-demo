import { Flex, Text, Input, Image } from "@chakra-ui/react";
import PrimaryButton from "@components/Buttons/PrimaryButton";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RegisterResponse } from "+types";
import { useCompleteMfaMutation } from "@api/features/auth.api";
import { toast } from "react-hot-toast";

const TwoFactorAuthentication = () => {
  const navigate = useNavigate();
  const { data } = useLocation().state as { data: RegisterResponse };
  const [step, setStep] = useState(1);
  const [code, setCode] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const codeArray = pastedData
      .split("")
      .map((char) => char.replace(/[^0-9]/g, ""));

    setCode(codeArray);
    inputRefs.current.forEach((input, index) => {
      if (input) {
        input.value = codeArray[index] || "";
      }
    });
  };

  const [completeMfa, { isLoading }] = useCompleteMfaMutation();

  const handleContinue = async () => {
    try {
      if (step === 1) {
        setStep(step + 1);
      } else {
        if (code.length !== 6) {
          toast.error("Please enter a 6-digit code");
          return;
        }
        const formBody = {
          token: data.token,
          code: code.join(""),
        };
        const response = await completeMfa(formBody).unwrap();
        if (response.data) {
          navigate("/register-success");
        }
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
              Set up two-factor authentication
            </Text>
            <Text
              fontSize="1.6rem"
              fontWeight={400}
              color="#2A180E"
              lineHeight="2rem"
            >
              {step === 1
                ? "Scan this QR code with your two-factor authentication device to set up your account."
                : "Enter the code from your authentication app"}
            </Text>
          </Flex>
          {step === 1 && (
            <Flex flexDirection="column" gap="2.4rem">
              <Flex justifyContent="center" alignItems="center">
                <Image src={data.mfa.qrCode} alt="qr-code" />,
              </Flex>
              <Flex flexDirection="column" gap="0.8rem">
                <Text
                  fontSize="1.6rem"
                  fontWeight={400}
                  color="#4A2111"
                  lineHeight="2rem"
                  padding="0 1rem"
                >
                  Can't scan QR code? Enter Key manually instead
                </Text>
                <Flex
                  border="1px solid #999999"
                  bgColor="#F7F7F2"
                  borderRadius="1.2rem"
                  padding="1.2rem 1.6rem"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text
                    textAlign="center"
                    fontSize="1.6rem"
                    fontWeight={400}
                    color="#000"
                    lineHeight="2rem"
                  >
                    {data.mfa.secret}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          )}

          {step === 2 && (
            <Flex gap="3rem">
              {[...Array(6)].map((_, index) => (
                <>
                  <Input
                    key={index}
                    ref={(el: HTMLInputElement | null) => {
                      inputRefs.current[index] = el;
                    }}
                    value={code[index]}
                    backgroundColor="#F7F7F2"
                    onPaste={index === 0 ? handlePaste : undefined}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const newCode = [...code];
                      newCode[index] = e.target.value;
                      setCode(newCode);

                      if (e.target.value && index < 5) {
                        inputRefs.current[index + 1]?.focus();
                      }
                    }}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      if (
                        (e.key === "Backspace" || e.key === "Delete") &&
                        !code[index] &&
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
                    border={"1px solid #4A2111"}
                    _focus={{
                      borderColor: "#4A2111",
                      boxShadow: "none",
                    }}
                    _hover={{
                      borderColor: "#4A2111",
                    }}
                    color="#000000"
                  />
                </>
              ))}
            </Flex>
          )}

          <Flex flexDirection="column" gap="1.6rem">
            <PrimaryButton
              onClickFxn={handleContinue}
              loading={isLoading}
              disabled={isLoading}
            >
              {step === 1 ? "Continue" : "Verify"}
            </PrimaryButton>
          </Flex>
        </Flex>

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

export default TwoFactorAuthentication;
