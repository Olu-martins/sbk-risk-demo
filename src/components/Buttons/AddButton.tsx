import { Button, Text } from "@chakra-ui/react";
import { AddCircle } from "iconsax-react";
import { FC } from "react";

type AddButtonType = {
  onClick: () => void;
  buttonText: string;
};

const AddButton: FC<AddButtonType> = ({ onClick, buttonText }) => {
  return (
    <Button
      display="flex"
      gap="12px"
      alignItems="center"
      color="#fff"
      bgColor="#004FFF"
      p="10px 15px"
      minW="max-content"
      borderRadius="8px"
      h="40px"
      onClick={onClick}
    >
      <AddCircle size={16} color="#fff" />
      <Text fontWeight="500" fontSize="14px" lineHeight="20px" className="shrink-0">
        {buttonText}
      </Text>
    </Button>
  );
};

export default AddButton;
