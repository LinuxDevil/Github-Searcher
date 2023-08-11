import React from "react";
import './input.scss';

interface IInput {
  value: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({value, placeholder='Enter something...', type='text', onChange}: IInput) {
  return (
    <input className='input' type={type} value={value} placeholder={placeholder} onChange={onChange} />
  );
}
