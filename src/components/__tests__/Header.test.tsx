import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Header from "@components/Header";

describe("Header", () => {
  it("renders the brand name", () => {
    render(<Header />);
    expect(screen.getByText("MLU-")).toBeInTheDocument();
    expect(screen.getByText("EXPLAIN")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /articles/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
  });
});
