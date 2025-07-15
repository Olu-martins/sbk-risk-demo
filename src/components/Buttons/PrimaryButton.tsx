import { Button, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface BtnProps {
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClickFxn?: (values?: any) => void;
  type?: "button" | "submit";
  height?: string;
  fontSize?: string;
  color?: string;
}
const PrimaryButton: React.FC<BtnProps> = ({
  children,
  disabled,
  loading,
  onClickFxn,
  className,
  type = "submit",
  height = "5.6rem",
  fontSize,
  color,
}) => {
  return (
    <Button
      className={className}
      w={"full"}
      bgColor={"#4A2111"}
      color={"white"}
      h={height}
      rounded={"3.2rem"}
      p={"0.8rem 3.2rem"}
      fontWeight={"500"}
      _hover={{ bg: "#4A2111" }}
      type={type}
      disabled={disabled ? disabled : false}
      loading={loading ? loading : false}
      _disabled={{ opacity: 0.5 }}
      variant="outline"
      spinnerPlacement="end"
      onClick={onClickFxn}
      gap="10px"
    >
      <Text
        fontSize={fontSize || "2rem"}
        fontWeight={500}
        color={color || "#FFFFFF"}
        lineHeight="2.8rem"
      >
        {children}
      </Text>
    </Button>
  );
};

export default PrimaryButton;
