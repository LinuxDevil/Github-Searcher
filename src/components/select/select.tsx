import "./select.scss";

interface ISelect {
  defaultValue: string;
  options: SelectOptionType[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

type SelectOptionType = {
  label: string;
  value: string;
}

export default function Select({ options = [], defaultValue, onChange }: ISelect) {
  return (
    <select className="select" defaultValue={defaultValue} onChange={onChange}>
      {options.map(({label, value}, index) =>
        <option key={value} value={value}>{label}</option>
      )}
    </select>
  );
}
