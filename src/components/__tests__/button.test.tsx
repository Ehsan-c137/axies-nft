import { render, screen } from "@testing-library/react";
import { Button } from "../ui/button";
import "@testing-library/jest-dom";

describe("Button Component", () => {
  it("should render the button with its children", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it("should apply default variant and size classes", () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByRole("button", { name: /default button/i });
    expect(button).toHaveClass("bg-primary");
    expect(button).toHaveClass("h-10");
  });

  it("should apply destructive variant classes when specified", () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole("button", { name: /delete/i });
    expect(button).toHaveClass("bg-destructive", "text-white");
  });

  it("should be disabled when the disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button", { name: /disabled/i });
    expect(button).toBeDisabled();
  });

  it("should be disabled and show a spinner when loading is true", () => {
    render(<Button loading>Loading...</Button>);
    const button = screen.getByRole("button", { name: /loading.../i });

    expect(button).toBeDisabled();

    const spinnerSvg = button.querySelector("svg");
    expect(spinnerSvg).toBeInTheDocument();
  });

  it("should render as a child element when asChild is true", () => {
    render(
      <Button asChild={true}>
        <a href="/home">Go Home</a>
      </Button>,
    );

    const linkElement = screen.getByRole("link", { name: /go home/i });
    expect(linkElement).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    console.log(linkElement);

    expect(linkElement).toHaveClass("h-10");
  });

  it("should render the flair element for the outline variant", () => {
    render(<Button variant="outline">Outline Button</Button>);
    const button = screen.getByRole("button", { name: /outline button/i });

    const flairElement = button.querySelector(".button__flair");
    expect(flairElement).toBeInTheDocument();
  });
});
