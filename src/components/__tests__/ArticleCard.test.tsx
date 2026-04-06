import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ArticleCard from "@components/ArticleCard";
import type { PostCard } from "@/types";

vi.mock("@lib/sanity", () => ({
  urlFor: () => ({
    width: () => ({
      height: () => ({
        url: () => "https://example.com/image.jpg",
      }),
    }),
  }),
}));

const mockPost: PostCard = {
  _id: "1",
  title: "Decision Trees",
  slug: { _type: "slug", current: "decision-trees" },
  author: { name: "John Doe" },
  mainImage: {
    _type: "image",
    asset: { _ref: "image-abc-300x200-jpg", _type: "reference" },
  },
  categories: [{ title: "Supervised Learning" }],
  publishedAt: "2026-01-15T00:00:00Z",
};

describe("ArticleCard", () => {
  it("renders the post title", () => {
    render(<ArticleCard post={mockPost} />);
    expect(screen.getByText("Decision Trees")).toBeInTheDocument();
  });

  it("renders category chips", () => {
    render(<ArticleCard post={mockPost} />);
    expect(screen.getByText("Supervised Learning")).toBeInTheDocument();
  });

  it("renders a 'Dive In' link", () => {
    render(<ArticleCard post={mockPost} />);
    const link = screen.getByRole("link", { name: /dive in/i });
    expect(link).toHaveAttribute("href", "/posts/decision-trees");
  });

  it("renders the main image", () => {
    render(<ArticleCard post={mockPost} />);
    const img = screen.getByRole("img", { name: "Decision Trees" });
    expect(img).toBeInTheDocument();
  });

  it("renders without mainImage", () => {
    const postNoImage = { ...mockPost, mainImage: undefined };
    render(<ArticleCard post={postNoImage} />);
    expect(screen.getByText("Decision Trees")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders without categories", () => {
    const postNoCats = { ...mockPost, categories: undefined };
    render(<ArticleCard post={postNoCats} />);
    expect(screen.queryByText("Supervised Learning")).not.toBeInTheDocument();
  });
});
