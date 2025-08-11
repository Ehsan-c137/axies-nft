import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PaginationList from "../common/pagination/pagination-list";
import "@testing-library/jest-dom";

const mockItems = [
  { id: 1, name: "Item Alpha" },
  { id: 2, name: "Item Bravo" },
  { id: 3, name: "Item Charlie" },
];

const MockDataCard = ({ id, name }: { id: number; name: string }) => (
  <div key={id}>{name}</div>
);

const renderItem = (item: { id: number; name: string }) => (
  <li key={item.id}>{item.name}</li>
);

describe("PaginationList", () => {
  const onPageChangeMock = jest.fn();

  beforeEach(() => {
    onPageChangeMock.mockClear();
  });

  const defaultProps = {
    paginatedData: {
      data: mockItems,
      meta: {
        currentPage: 1,
        lastPage: 5,
      },
    },
    isPending: false,
    DataCard: MockDataCard,
    PlaceholderCard: () => <div data-testid="placeholder-card"></div>,
    isPlaceholderData: false,
    error: null,
  };

  it("should render a list of items", () => {
    render(<PaginationList {...defaultProps} />);

    expect(screen.getByText("Item Alpha")).toBeInTheDocument();
    expect(screen.getByText("Item Bravo")).toBeInTheDocument();
    expect(screen.getByText("Item Charlie")).toBeInTheDocument();
    expect(screen.getAllByText(/Item (Alpha|Bravo|Charlie)/).length).toBe(
      mockItems.length,
    );
  });

  it("should render the loading state", () => {
    render(<PaginationList {...defaultProps} isPending={true} />);

    expect(screen.getAllByTestId("placeholder-card").length).toBeGreaterThan(0);
    expect(screen.queryByText("Item Alpha")).not.toBeInTheDocument();
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("should render the empty state when no items are provided", () => {
    render(
      <PaginationList
        {...defaultProps}
        paginatedData={{
          data: [],
          meta: {
            currentPage: 1,
            lastPage: 1,
          },
        }}
      />,
    );

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
    expect(screen.queryByText("Item Alpha")).not.toBeInTheDocument();
    expect(screen.queryByTestId("pagination-control")).not.toBeInTheDocument();
  });

  it("should render pagination controls", () => {
    render(<PaginationList {...defaultProps} />);

    expect(screen.getByTestId("pagination-control")).toBeInTheDocument();
    expect(
      screen.getByTestId("pagination-previous-button"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("pagination-next-button")).toBeInTheDocument();
    expect(screen.getByTestId("pagination-link-1")).toBeInTheDocument();
    expect(
      screen.getByTestId(
        `pagination-link-${defaultProps.paginatedData.meta.lastPage}`,
      ),
    ).toBeInTheDocument();
  });

  it("should disable the next button on the last page", () => {
    const props = {
      paginatedData: {
        data: mockItems,
        meta: {
          currentPage: 5,
          lastPage: 5,
        },
      },
      isPending: false,
      DataCard: MockDataCard,
      PlaceholderCard: () => <div data-testid="placeholder-card"></div>,
      isPlaceholderData: false,
      error: null,
    };
    render(<PaginationList {...props} />);
    expect(screen.getByTestId("pagination-next-button")).toHaveClass(
      "pointer-events-none",
    );
  });

  it("should not render pagination control if totalPages is 1 or less", () => {
    const props = {
      paginatedData: {
        data: mockItems,
        meta: {
          currentPage: 1,
          lastPage: 1,
        },
      },
      isPending: false,
      DataCard: MockDataCard,
      PlaceholderCard: () => <div data-testid="placeholder-card"></div>,
      isPlaceholderData: false,
      error: null,
    };
    render(<PaginationList {...props} />);
    expect(screen.queryByTestId("pagination-control")).not.toBeInTheDocument();
  });

  it("should apply current page indicator to the active page button", () => {
    render(<PaginationList {...defaultProps} />);
    const currentPage = defaultProps.paginatedData.meta.currentPage;
    const currentPageButton = screen.getByTestId(
      `pagination-link-${currentPage}`,
    );
    expect(currentPageButton).toHaveAttribute("aria-current", "page");
  });
});
