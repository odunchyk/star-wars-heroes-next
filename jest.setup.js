import "@testing-library/jest-dom";

import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/",
  useRouter: jest.fn(),
}));
