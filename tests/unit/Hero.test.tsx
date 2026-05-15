import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/sections/Hero";

describe("Hero", () => {
  it("renders an h1 with the heading text and lead sub", () => {
    render(
      <Hero
        heading="Hello world"
        sub="A subtitle"
        primaryCta={{ label: "Projects", href: "/projects" }}
        secondaryCta={{ label: "Contact", href: "/#contact" }}
      />,
    );
    expect(
      screen.getByRole("heading", { level: 1, name: "Hello world" }),
    ).toBeTruthy();
    expect(screen.getByText("A subtitle")).toBeTruthy();
  });

  it("renders both CTAs as anchors with correct href", () => {
    render(
      <Hero
        heading="x"
        sub="y"
        primaryCta={{ label: "Projects", href: "/projects" }}
        secondaryCta={{ label: "Contact", href: "/#contact" }}
      />,
    );
    expect(
      screen.getByRole("link", { name: "Projects" }).getAttribute("href"),
    ).toBe("/projects");
    expect(
      screen.getByRole("link", { name: "Contact" }).getAttribute("href"),
    ).toBe("/#contact");
  });
});
