import React from "react";
export type buttonType = {
  bgColor: string;
  textColor: string;
  text: string;
  type: string;
  handleClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
};

export type inputType = {
  placeholder: string;
};

export type Modaltype = {
  children: React.ReactNode;
  direction: string;
};
