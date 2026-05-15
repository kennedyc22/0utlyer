import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { featuredProjectSlugs } from "@/content/featured-projects";
import { getProjectBySlug } from "@/content/projects";

describe("FeaturedProjects", () => {
  it("renders one card per featured slug", () => {
    const { container } = render(<FeaturedProjects />);
    const cards = container.querySelectorAll("[data-slug]");
    expect(cards.length).toBe(featuredProjectSlugs.length);
    for (const slug of featuredProjectSlugs) {
      expect(container.querySelector(`[data-slug="${slug}"]`)).not.toBeNull();
    }
  });

  it("renders each featured project's title as an h3", () => {
    render(<FeaturedProjects />);
    for (const slug of featuredProjectSlugs) {
      const project = getProjectBySlug(slug);
      expect(project).toBeDefined();
      expect(
        screen.getByRole("heading", { level: 3, name: project!.title }),
      ).toBeTruthy();
    }
  });

  it("links to /projects from the see-all anchor", () => {
    render(<FeaturedProjects />);
    const link = screen.getByRole("link", { name: /see all projects/i });
    expect(link.getAttribute("href")).toBe("/projects");
  });
});
