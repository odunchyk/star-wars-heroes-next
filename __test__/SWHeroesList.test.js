import { render, screen } from "@testing-library/react";
import SWHeroesList from "@/_components/SWHeroesList";
import "@testing-library/jest-dom";

// Mock the HeroCard component to avoid testing its internals
jest.mock("../_components/HeroCard", () => ({
  __esModule: true,
  default: ({ hero }) => <div>{hero.name}</div>,
}));

describe("SWHeroesList", () => {
  const characters = [
    { id: "1", name: "Luke Skywalker" },
    { id: "2", name: "Darth Vader" },
    { id: "3", name: "Leia Organa" },
  ];

  test("renders a list of HeroCard components when characters are provided", () => {
    render(<SWHeroesList characters={characters} />);

    // Ensure the list container is present
    expect(screen.getByRole("list")).toBeInTheDocument();

    // Ensure each character's name is rendered
    characters.forEach((character) => {
      expect(screen.getByText(character.name)).toBeInTheDocument();
    });
  });

  test("displays 'No characters found' message when no characters are provided", () => {
    render(<SWHeroesList characters={[]} />);

    // Ensure the 'No characters found' message is displayed
    expect(screen.getByText("No characters found")).toBeInTheDocument();
  });
});
