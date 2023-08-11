import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Select from "@/components/select/select";

describe("Select", () => {

  it("should render the select", () => {
    const options = [
      { label: 'Users', value: 'user' },
      { label: 'Repositories', value: 'repo' }
    ];
    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {};
    render(<Select defaultValue={'user'} options={options} onChange={onChange} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: 'Users' })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: 'Repositories' })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: 'Users' })).toHaveValue('user');
    expect(screen.getByRole("option", { name: 'Repositories' })).toHaveValue('repo');
  });
});
