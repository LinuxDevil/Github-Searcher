import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "@/components/shared/button/button";

describe("Button", () => {

  const onClick = jest.fn();

  beforeEach(() => {
    render(<Button onClick={onClick} text='Search'/>)
  });

  it("should render the button", () => {
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should call onClick when the button is clicked", () => {
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

});
