import {
  Text as ChakraText,
  TextProps as ChakraTextProps,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
interface TextProps extends Omit<ChakraTextProps, "variant"> {
  variant?: "title" | "body";
  link?: string;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = "body",
  color,
  className,
  link,
  ...props
}) => {
  const navigate = useNavigate();
  const textStyles = {
    title: {
      fontSize: "2.4rem",
      fontWeight: "700",
      color: color || "#2A180E",
      lineHeight: "3.2rem",
    },
    body: {
      fontSize: "1.6rem",
      fontWeight: "400",
      color: color || "#2A180E",
      lineHeight: "2.4rem",
    },
  };

  return (
    <ChakraText
      {...textStyles[variant]}
      className={className}
      {...props}
      cursor={link ? "pointer" : "default"}
      onClick={() => {
        if (link) {
          navigate(link);
        }
      }}
    >
      {children}
    </ChakraText>
  );
};

export const AppTitle: React.FC<Omit<TextProps, "variant">> = (props) => (
  <Text {...props} variant="title" />
);

export const AppText: React.FC<Omit<TextProps, "variant">> = (props) => (
  <Text {...props} variant="body" />
);
