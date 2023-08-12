import { ChangeEvent, HTMLInputTypeAttribute } from "react";
import "./input.scss";

interface IInputProps {
  value: string;
  placeholder?: string;
  inputType?: HTMLInputTypeAttribute;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ value, placeholder = "Enter something...", inputType = "text", onChange }: IInputProps) {
  return (
    <input className="input" type={inputType} value={value} placeholder={placeholder} onChange={onChange} />
  );
}
