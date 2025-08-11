import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Swiper from "../ui/swiper/swiper";

jest.mock("@/components/common/cards/card-placeholder", () => ({
  __esModule: true,
  default: () => <div data-testid="card-placeholder">Card Placeholder</div>,
}));

jest.mock("@/components/ui/swiper/swiper-indicators", () => ({
  SwiperIndicators: ({
    count,
    activeIndex,
    onSelect,
  }: {
    count: number;
    activeIndex: number;
    onSelect: (index: number) => void;
  }) => (
    <div>
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          aria-label={`go to slide ${index + 1}`}
          className={index === activeIndex ? "active" : ""}
          onClick={() => onSelect(index)}
        />
      ))}
    </div>
  ),
}));

const MockItemCard: React.FC<{ id: number; name: string }> = ({ name }) => (
  <div>{name}</div>
);

const mockDatas = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  name: `Item ${i}`,
}));

describe("Swiper Component", () => {
  const mockConfig = { itemPerPage: 3 };

  const mockElementDimensions = (
    element: HTMLElement,
    { offsetWidth, scrollWidth }: { offsetWidth: number; scrollWidth: number },
  ) => {
    Object.defineProperty(element, "offsetWidth", {
      configurable: true,
      value: offsetWidth,
    });
    Object.defineProperty(element, "scrollWidth", {
      configurable: true,
      value: scrollWidth,
    });
  };

  it("should render correctly with initial data", () => {
    render(
      <Swiper
        ItemCard={MockItemCard}
        datas={mockDatas}
        config={mockConfig}
        isLoading={false}
      />,
    );

    expect(screen.getAllByText(/Item \d/)).toHaveLength(10);
    expect(screen.getByLabelText("swiper-list")).toBeInTheDocument();

    const indicators = screen.getAllByRole("button", { name: /go to slide/i });
    expect(indicators).toHaveLength(4);
    expect(indicators[0]).toHaveClass("active");
  });

  it("should render loading placeholders when isLoading is true", () => {
    render(
      <Swiper
        ItemCard={MockItemCard}
        datas={[]}
        config={mockConfig}
        isLoading={true}
      />,
    );

    expect(screen.getAllByTestId("card-placeholder")).toHaveLength(
      mockConfig.itemPerPage,
    );
    expect(screen.queryByText(/Item \d/)).not.toBeInTheDocument();
  });

  it("should navigate to the correct slide on indicator click", async () => {
    render(
      <Swiper
        ItemCard={MockItemCard}
        datas={mockDatas}
        config={mockConfig}
        isLoading={false}
      />,
    );

    const swiperList = screen.getByLabelText("swiper-list");
    mockElementDimensions(swiperList, { offsetWidth: 900, scrollWidth: 3000 });

    const indicators = screen.getAllByRole("button", { name: /go to slide/i });
    fireEvent.click(indicators[1]);

    await waitFor(() => {
      expect(swiperList).toHaveStyle("transform: translateX(-900px)");
    });

    expect(indicators[1]).toHaveClass("active");
  });

  it("should swipe to the next page on mouse drag and update active class", async () => {
    render(
      <Swiper
        ItemCard={MockItemCard}
        datas={mockDatas}
        config={mockConfig}
        isLoading={false}
      />,
    );

    const swiperList = screen.getByLabelText("swiper-list");
    mockElementDimensions(swiperList, { offsetWidth: 900, scrollWidth: 3000 });

    fireEvent.mouseDown(swiperList, { clientX: 100 });
    expect(swiperList).toHaveClass("is_swiping");

    fireEvent.mouseMove(window, { clientX: 20 });
    fireEvent.mouseUp(window);

    await waitFor(() => {
      expect(swiperList).not.toHaveClass("is_swiping");
      expect(swiperList).toHaveStyle("transform: translateX(-900px)");
    });
  });

  it("should snap back to the original position on a short swipe", async () => {
    render(
      <Swiper
        ItemCard={MockItemCard}
        datas={mockDatas}
        config={mockConfig}
        isLoading={false}
      />,
    );

    const swiperList = screen.getByLabelText("swiper-list");
    mockElementDimensions(swiperList, { offsetWidth: 900, scrollWidth: 3000 });

    fireEvent.mouseDown(swiperList, { clientX: 100 });
    fireEvent.mouseMove(window, { clientX: 60 });
    fireEvent.mouseUp(window);

    await waitFor(() => {
      expect(swiperList).toHaveStyle("transform: translateX(0px)");
    });
  });
});
