import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Container } from "@/components/primitives";

describe("Container", () => {
  it("renders children", () => {
    const { getByText } = render(<Container>hello</Container>);
    expect(getByText("hello")).toBeTruthy();
  });

  it("defaults to a div with variant=default", () => {
    const { container } = render(<Container>x</Container>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe("DIV");
    expect(el.getAttribute("data-variant")).toBe("default");
  });

  it("renders the requested element for `as`", () => {
    const { container } = render(
      <Container as="section" variant="narrow">
        x
      </Container>,
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe("SECTION");
    expect(el.getAttribute("data-variant")).toBe("narrow");
  });

  it("supports the wide variant", () => {
    const { container } = render(<Container variant="wide">x</Container>);
    expect(container.firstElementChild?.getAttribute("data-variant")).toBe(
      "wide",
    );
  });
});
