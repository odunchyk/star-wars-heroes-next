import { render, screen, fireEvent } from "@testing-library/react";
import Graph from "@/_components/Graph";
import { useReactFlow } from "@xyflow/react";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";

jest.mock("@xyflow/react", () => ({
  ReactFlow: () => <div>ReactFlow</div>,
  useReactFlow: jest.fn(),
  ReactFlowProvider: ({ children }) => <>{children}</>,
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Graph Component", () => {
  const nodes = [];
  const edges = [];
  const nodeTypes = {};

  beforeEach(() => {
    // Set up the mock implementations
    const mockBack = jest.fn();
    useRouter.mockReturnValue({ back: mockBack });

    useReactFlow.mockReturnValue({
      setViewport: jest.fn(),
    });
  });

  test("renders ReactFlow and buttons", () => {
    render(<Graph nodes={nodes} edges={edges} nodeTypes={nodeTypes} />);

    // Check if ReactFlow is rendered
    expect(screen.getByText("ReactFlow")).toBeInTheDocument();

    // Check if buttons are rendered
    expect(screen.getByText("Go Back")).toBeInTheDocument();
    expect(screen.getByText("Center Zoom")).toBeInTheDocument();
  });

  test("clicking 'Go Back' button calls router.back()", () => {
    const { back } = useRouter();
    render(<Graph nodes={nodes} edges={edges} nodeTypes={nodeTypes} />);

    fireEvent.click(screen.getByText("Go Back"));

    expect(back).toHaveBeenCalled();
  });

  test("clicking 'Center Zoom' button sets viewport position", () => {
    const setViewport = useReactFlow().setViewport;
    render(<Graph nodes={nodes} edges={edges} nodeTypes={nodeTypes} />);

    fireEvent.click(screen.getByText("Center Zoom"));

    expect(setViewport).toHaveBeenCalledWith({ x: 100, y: 100 });
  });
});
