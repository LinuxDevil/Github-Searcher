import "./select.scss";
import { ChangeEvent } from "react";

interface ISelectProps {
  defaultValue: string;
  options: SelectOptionType[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

type SelectOptionType = {
  label: string;
  value: string;
}

export default function Select({ defaultValue, options = [], onChange }: ISelectProps) {
  return (
    <select className="select" defaultValue={defaultValue} onChange={onChange}>
      {options.map(({label, value}, index) =>
        <option key={value} value={value}>{label}</option>
      )}
    </select>
  );
}
