import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PaginationControl from "../common/pagination/pagination-control";
import { useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

jest.mock("@/components/ui/pagination", () => {
  const originalModule = jest.requireActual("@/components/ui/pagination");
  return {
    ...originalModule,
    PaginationEllipsis: () => <div data-testid="pagination-ellipsis">...</div>,
  };
});

const useSearchParamsMock = useSearchParams as jest.Mock;

describe("PaginationControl Component", () => {
  const renderComponent = (
    props: React.ComponentProps<typeof PaginationControl>,
  ) => {
    return render(
      <React.Suspense fallback={<div>Loading...</div>}>
        <PaginationControl {...props} />
      </React.Suspense>,
    );
  };

  beforeEach(() => {
    useSearchParamsMock.mockReturnValue(new URLSearchParams());
  });

  it("should use page from searchParams when url is not provided", () => {
    useSearchParamsMock.mockReturnValue(new URLSearchParams("page=5"));
    renderComponent({ currentPage: 3, lastPage: 10 });

    const page3Link = screen.getByTestId("pagination-link-3");
    expect(page3Link).toHaveAttribute("href", "?page=3");
    console.log(page3Link);
    expect(page3Link).toHaveAttribute("data-active", "true");
  });

  describe("pagination range logic", () => {
    it("should display dots on the right when near the beginning", () => {
      renderComponent({ currentPage: 3, lastPage: 10 });
      const content = screen.getByRole("list");
      const items = Array.from(content.children).map((li) => li.textContent);
      // Items are: Previous, 1, 2, 3, 4, 5, ..., 10, Next
      const pageItems = items.slice(1, -1);
      expect(pageItems).toEqual(["1", "2", "3", "4", "5", "...", "10"]);
    });

    it("should display dots on the left when near the end", () => {
      renderComponent({ currentPage: 8, lastPage: 10 });
      const content = screen.getByRole("list");
      const items = Array.from(content.children).map((li) => li.textContent);
      const pageItems = items.slice(1, -1);
      expect(pageItems).toEqual(["1", "...", "6", "7", "8", "9", "10"]);
    });

    it("should display dots on both sides when in the middle", () => {
      renderComponent({ currentPage: 10, lastPage: 20 });
      const content = screen.getByRole("list");
      const items = Array.from(content.children).map((li) => li.textContent);
      const pageItems = items.slice(1, -1);
      expect(pageItems).toEqual(["1", "...", "9", "10", "11", "...", "20"]);
    });
  });

  it("should construct hrefs with url prop when provided", () => {
    renderComponent({ currentPage: 5, lastPage: 10, url: "test-url" });

    const prevButton = screen.getByTestId("pagination-previous-button");
    const nextButton = screen.getByTestId("pagination-next-button");
    const pageLink = screen.getByTestId("pagination-link-6");

    expect(prevButton).toHaveAttribute("href", "/test-url/4");
    expect(nextButton).toHaveAttribute("href", "/test-url/6");
    expect(pageLink).toHaveAttribute("href", "/test-url/6");
  });

  it("should render ellipsis correctly when needed", () => {
    renderComponent({ currentPage: 10, lastPage: 20 });
    const ellipsisElements = screen.getAllByTestId("pagination-ellipsis");
    expect(ellipsisElements.length).toBe(2);
  });

  it("should not render anything if lastPage is 1 or less", () => {
    const { container } = renderComponent({ currentPage: 1, lastPage: 1 });
    expect(container.firstChild).toBeNull();
  });

  it("should render all pages if total pages is less than the threshold for adding dots", () => {
    renderComponent({ currentPage: 1, lastPage: 6 });
    const content = screen.getByRole("list");
    const items = Array.from(content.children).map((li) => li.textContent);
    const pageItems = items.slice(1, -1);
    expect(pageItems).toEqual(["1", "2", "3", "4", "5", "6"]);
    expect(screen.queryByTestId("pagination-ellipsis")).not.toBeInTheDocument();
  });
});
