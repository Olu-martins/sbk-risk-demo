import { Flex, Text, Input } from "@chakra-ui/react";
import PrimaryButton from "@components/Buttons/PrimaryButton";
import { ArrowRight2 } from "iconsax-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const InviteConfirmation = () => {
  const navigate = useNavigate();
  const { email } = JSON.parse(sessionStorage.getItem("invite") || "{}");
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [isError] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  const handleVerify = () => {
    console.log(otp);
    navigate("/invite/set-password");
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
              Verify your work email
            </Text>
            <Text
              fontSize="1.6rem"
              fontWeight={400}
              color="#2A180E"
              lineHeight="2rem"
            >
              We've sent a 6-digit code to {email}.
            </Text>
          </Flex>
          <Flex flexDirection="column" gap="1.6rem">
            <Flex gap="2rem">
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
            <PrimaryButton type="button" onClickFxn={handleVerify}>
              Verify email
            </PrimaryButton>
            <Flex
              gap="0.8rem"
              justifyContent="center"
              alignItems="center"
              cursor="pointer"
            >
              <Text fontSize="2.4rem" fontWeight={500} color="#4A2111">
                Resend code
              </Text>
              <Flex>
                <ArrowRight2 color="#4A2111" size="2.4rem" />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
       
      </Flex>
    </Flex>
  );
};

export default InviteConfirmation;
