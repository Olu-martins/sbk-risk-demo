import { Button } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface BtnProps {
  children: ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  onClickFxn?: (values?: any) => Promise<void> | any;
  className?: string;
  type?: "button" | "submit";
}
const SecondaryButton: React.FC<BtnProps> = ({
  children,
  disabled,
  isLoading,
  onClickFxn,
  className,
  type="submit"
}) => {
  return (
    <Button
      className={className}
      w={"full"}
      color={"white"}
      h={"4rem"}
      rounded={"1rem"}
      px={"2rem"}
      fontWeight={"md"}
      _hover={{ bg: "primary1X" }}
      type={type}
      disabled={disabled ? disabled : false}
      loading={isLoading ? isLoading : false}
      _disabled={{ opacity: 0.5 }}
      loadingText="Submitting"
      variant="outline"
      spinnerPlacement="end"
      onClick={onClickFxn}
      gap="10px"
    >
      {children}
    </Button>
  );
};

export default SecondaryButton;
