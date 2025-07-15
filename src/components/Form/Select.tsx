import { Flex, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import SelectComponent from "react-select";

export interface ISelectOptions {
  id: number | string;
  label: string | ReactNode;
  value: string | any;
}
interface Iprops {
  options: ISelectOptions[];
  placeholder: string;
  label?: string;
  onChange: any;
  value?: ISelectOptions | ISelectOptions[];
  multiple?: boolean;
  disabled?: boolean;
  minWidth?: string;
}
export function CustomSelect({
  options,
  placeholder,
  label,
  onChange,
  value,
  multiple,
  disabled,
  minWidth,
}: Iprops) {
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      borderRadius: "0.8rem",
      outline: "none",
      borderColor: "#CBD5E0",
      height: "fit",
      padding: "0.126rem",
      fontSize: "1.5rem",
      width: "100%",
      cursor: "pointer",
      bgColor: disabled ? "#F1F1F1" : "#fff",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#F4F4F4" : "white",
      color: "black",
      fontSize: "1.2rem",
      "&:hover": {
        backgroundColor: "#F4F4F4",
        color: "black",
      },
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: "#606060",
    }),
    menu: (provided: any) => ({
      ...provided,
      zIndex: 2000,
    }),
  };
  return (
    <Flex
      className="select-width"
      flexDirection="column"
      width="100%"
      whiteSpace={"nowrap"}
      minWidth={minWidth ? minWidth : "fit-content"}
    >
      {label && (
        <Text as="label" fontSize="14px" fontWeight={500} whiteSpace={"nowrap"}>
          {label}
        </Text>
      )}
      <SelectComponent
        options={options}
        styles={customStyles}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        isMulti={multiple || false}
        menuPortalTarget={document.getElementById("custom-menu-portal")}
        menuPosition="fixed"
        isDisabled={disabled || false}
      />
    </Flex>
  );
}

interface SelectProps {
  options: ISelectOptions[];
  name?: string;
  value?: string;
  onChange: any;
  placeholder: string;
}
export const SelectInput = ({
  options,
  name,
  placeholder,
  onChange,
  value,
}: SelectProps) => {
  return (
    <select
      name={name}
      style={{
        borderRadius: "0.8rem",
        outline: "none",
        border: "1px solid #CBCBCB",
        height: "40px",
        fontSize: "1.2rem",
        width: "100%",
        fontWeight: 500,
        gap: "1rem",
        backgroundColor: "#fff",
      }}
      value={value}
      onChange={onChange}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.value} className="text-[1.4rem]">
          {option.label}
        </option>
      ))}
    </select>
  );
};
