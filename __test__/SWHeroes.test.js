import { render, screen } from "@testing-library/react";
import HeroCard from "@/_components/HeroCard";
import "@testing-library/jest-dom";
import Image from "next/image";

// Mock the next/image component to prevent issues with image rendering in tests
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

describe("HeroCard", () => {
  const hero = {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "19BBY",
    gender: "male",
    homeworld: "Tatooine",
  };

  test("renders detailed view correctly", () => {
    render(<HeroCard hero={hero} isDetailed={true} />);

    // Check if detailed information is rendered
    expect(screen.getByText("Height")).toBeInTheDocument();
    expect(screen.getByText("Mass")).toBeInTheDocument();
    expect(screen.getByText("Hair color")).toBeInTheDocument();
    expect(screen.getByText("Skin color")).toBeInTheDocument();
    expect(screen.getByText("Eye color")).toBeInTheDocument();
    expect(screen.getByText("Birth year")).toBeInTheDocument();
    expect(screen.getByText("Gender")).toBeInTheDocument();
    expect(screen.getByText("Homeworld")).toBeInTheDocument();

    // Check that the image renders with the correct src
    const img = screen.getByAltText(hero.name);
    expect(img).toHaveAttribute("src", `/character-images/${hero.name}.jpg`);
  });

  test("renders non-detailed view correctly", () => {
    render(<HeroCard hero={hero} isDetailed={false} />);

    // Check if non-detailed information is rendered
    expect(screen.getByText(hero.name)).toBeInTheDocument();

    // Check that the image renders with the correct src
    const img = screen.getByAltText(hero.name);
    expect(img).toHaveAttribute("src", `/character-images/${hero.name}.jpg`);

    // Check that the Link component wraps the content
    expect(screen.getByRole("link")).toHaveAttribute("href", `/${hero.name}`);
  });
});
