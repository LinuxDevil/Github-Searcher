import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Badge from "@/components/shared/badge/badge";

describe("Badge", () => {

  beforeEach(() => {
    render(<Badge text={'test'} />);
  });

  it("should render the badge", () => {
    const badge = screen.getByText('test');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveAttribute('style', 'background-color: rgb(146, 68, 54); color: white;');
  });

});
