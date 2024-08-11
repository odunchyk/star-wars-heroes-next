import { render, screen } from "@testing-library/react";
import Pagination from "@/_components/Pagination";
import { usePathname, useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

test("Pagination renders correct number of pages", () => {
  usePathname.mockReturnValue("/");
  useSearchParams.mockReturnValue(new URLSearchParams({ page: "1" }));

  render(<Pagination totalItems={30} itemsPerPage={10} />);

  expect(screen.getByText("1")).toBeInTheDocument();
  expect(screen.getByText("2")).toBeInTheDocument();
  expect(screen.getByText("3")).toBeInTheDocument();
});

test("Pagination disables previous button on first page", () => {
  usePathname.mockReturnValue("/");
  useSearchParams.mockReturnValue(new URLSearchParams({ page: "1" }));

  render(<Pagination totalItems={30} itemsPerPage={10} />);

  expect(screen.getByText("Previous")).toBeDisabled();
});

test("Pagination disables next button on last page", () => {
  usePathname.mockReturnValue("/");
  useSearchParams.mockReturnValue(new URLSearchParams({ page: "3" }));

  render(<Pagination totalItems={30} itemsPerPage={10} />);

  expect(screen.getByText("Next")).toBeDisabled();
});
