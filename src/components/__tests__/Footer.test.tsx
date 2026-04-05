import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "@components/Footer";

describe("Footer", () => {
  it("renders the copyright text", () => {
    render(<Footer />);
    expect(screen.getByText(/visual explanations/i)).toBeInTheDocument();
  });

  it("renders the current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});
