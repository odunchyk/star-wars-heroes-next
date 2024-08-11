import { render, screen, fireEvent } from "@testing-library/react";
import DropdownMenu from "@/_components/DropdownMenu";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";

test("DropdownMenu renders with options and handles selection", () => {
  // Mock the replace function from useRouter
  const replace = jest.fn();
  useRouter.mockReturnValue({ replace });

  const options = ["All films", "A New Hope", "The Empire Strikes Back"];
  render(<DropdownMenu options={options} />);

  // Ensure dropdown is closed initially
  expect(screen.queryByText("A New Hope")).not.toBeInTheDocument();

  // Open the dropdown
  fireEvent.click(screen.getByText("All films"));

  // Ensure dropdown is open and options are present
  expect(screen.getByText("A New Hope")).toBeInTheDocument();
  expect(screen.getByText("The Empire Strikes Back")).toBeInTheDocument();

  // Select an option
  fireEvent.click(screen.getByText("A New Hope"));

  // Verify that the replace function was called with the correct URL
  expect(replace).toHaveBeenCalledWith(
    expect.stringContaining("/?film=A+New+Hope")
  );
});
