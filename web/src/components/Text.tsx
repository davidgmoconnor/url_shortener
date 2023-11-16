import React from "react";

type Props = {
  children: string;
  variant?: "title" | "subtitle" | "body" | "bold" | "caption";
};

const Text = ({ children, variant = "body" }: Props) => {
  let textStyle;

  switch (variant) {
    case "title":
      textStyle = {
        fontSize: "2rem",
        fontWeight: "bold",
        marginBottom: "10px",
      };
      break;
    case "subtitle":
      textStyle = {
        fontSize: "1.5rem",
        fontWeight: "bold",
        marginBottom: "10px",
      };
      break;
    case "body":
      textStyle = {
        fontSize: "1rem",
        lineHeight: "1.4",
        marginBottom: "10px",
      };
      break;
    case "bold":
      textStyle = {
        fontSize: "1rem",
        fontWeight: "bold",
        lineHeight: "1.4",
        marginBottom: "10px",
      };
      break;
    case "caption":
      textStyle = {
        fontSize: "0.8rem",
        color: "#666",
      };
      break;
    default:
      textStyle = {};
  }

  return <div style={textStyle}>{children}</div>;
};

export default Text;
