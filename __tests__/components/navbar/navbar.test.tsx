import { render, screen } from "@testing-library/react";
import Navbar from "@/components/shared/navbar/navbar";
import "@testing-library/jest-dom";

describe("Navbar", () => {
  it("should render the navbar", () => {
    render(<Navbar />);
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(3);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Search" })).toHaveAttribute("href", "/search");
  });
});
