import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "@/components/shared/input/input";

describe("Input", () => {

  const inputValue = 'hello';
  const onChange = jest.fn();

  beforeEach(() => {
    render(<Input value={inputValue} onChange={onChange}/>)
  });

  it("should render the input", () => {
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should call onChange when input value changes", () => {
    const input = screen.getByRole("textbox");
    const newValue = 'Hi Seera!';
    fireEvent.change(input, { target: { value: newValue } });
    expect(onChange).toHaveBeenCalled();
  });

});
