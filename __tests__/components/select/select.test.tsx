import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Select from "@/components/shared/select/select";

describe("Select", () => {

  const options = [
    { label: 'Users', value: 'user' },
    { label: 'Repositories', value: 'repo' }
  ];

  const onChange = jest.fn();

  beforeEach(() => {
    render(<Select defaultValue={'user'} options={options} onChange={onChange} />);
  });

  it("should render the select", () => {
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: 'Users' })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: 'Repositories' })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: 'Users' })).toHaveValue('user');
    expect(screen.getByRole("option", { name: 'Repositories' })).toHaveValue('repo');
  });

  it("should call onChange when select value changes", () => {
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: 'repo' } });
    expect(select).toHaveValue('repo');
    expect(onChange).toHaveBeenCalled();
  });

});
