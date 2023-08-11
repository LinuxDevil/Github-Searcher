import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "@/components/shared/card/card";

describe("Card", () => {

  beforeEach(() => {
    render(<Card> <p>Testing the card</p> </Card>);
  });

  it("should render the card", () => {
    const card = screen.getByText('Testing the card').parentElement;
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('card');
  });

});
