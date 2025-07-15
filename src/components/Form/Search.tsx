import { InputGroup, Input, Flex } from "@chakra-ui/react";
import { SearchNormal1 } from "iconsax-react";
import { Dispatch, SetStateAction } from "react";


const Search = ({
  search,
  setSearch,
  placeholder,
}: {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  placeholder?: string;
}) => {
  return (
    <InputGroup
      p="0.5rem 1rem"
      borderRadius="0.5rem"
      gap="0.625rem"
      border="1px solid #DCDCDC"
      bgColor="#fff"
      w="full"
      h="40px"
      alignItems="center"
      startAddon={
        <Flex bgColor="#fff" border="none" p="0">
          <SearchNormal1 />
        </Flex>
      }
    >
      <Input
        type="text"
        placeholder={placeholder ? placeholder : "Search"}
        border="none"
        fontSize="16px"
        lineHeight="1.5rem"
        color="#828282"
        value={search}
        w={{ base: "auto", sm: "12rem", md: "15rem", lg: "20rem" }}
        onChange={(e) => setSearch(e.target.value)}
        _focus={{ border: "none" }}
      />
    </InputGroup>
  );
};

export default Search;
