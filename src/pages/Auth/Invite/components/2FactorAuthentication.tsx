import { Flex, Text, Input } from "@chakra-ui/react";
import PrimaryButton from "@components/Buttons/PrimaryButton";
import QRCode from "react-qr-code";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const InviteTwoFactorAuthentication = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(2);
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

  const handleContinue = () => {
    if (step === 1) {
      setStep(step + 1);
    } else {
      console.log(code);
      navigate("/register-success");
    }
  };

  return (
    <Flex mt="6rem" padding="3rem 10rem" w="85%">
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
                <QRCode value="hey" size={150} />,
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
                    LSK-28HS-3912-72FG-MAXX-821G-L123
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          )}

          {step === 2 && (
            <Flex gap="2rem">
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
            <PrimaryButton onClickFxn={handleContinue}>
              {step === 1 ? "Continue" : "Verify"}
            </PrimaryButton>
          </Flex>
        </Flex>

       
      </Flex>
    </Flex>
  );
};

export default InviteTwoFactorAuthentication;
