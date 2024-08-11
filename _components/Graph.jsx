"use client";
const { ReactFlow, useReactFlow, ReactFlowProvider } = require("@xyflow/react");
import { useEffect } from "react";
import "@xyflow/react/dist/style.css";
import { useRouter } from "next/navigation";

function Graph({ nodes, edges, nodeTypes }) {
  return (
    <ReactFlowProvider>
      <InnerGraph nodes={nodes} edges={edges} nodeTypes={nodeTypes} />
    </ReactFlowProvider>
  );
}

function InnerGraph({ nodes, edges, nodeTypes }) {
  const { setViewport } = useReactFlow();
  const router = useRouter();

  useEffect(() => {
    setViewport({ x: 100, y: 100 });
  }, []);

  const centerGraph = () => {
    setViewport({ x: 100, y: 100 });
  };

  const goBack = () => {
    console.log("Go Back button clicked");
    router.back();
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        panOnScroll={true}
      />
      <div className="absolute top-[20px] left-[20px] flex justify-between gap-[30px]">
        <button
          className="w-[200px] bg-[#333] text-[#fff] rounded-[4px] px-[12px] py-[6px] cursor-pointer hover:bg-white hover:text-[#333] hover:border-[#bbb] [transition:background-color_0.3s,_border-color_0.3s]"
          onClick={goBack}
        >
          Go Back
        </button>
        <button
          className="w-[200px] bg-[#333] text-[#fff] rounded-[4px] px-[12px] py-[6px] cursor-pointer  hover:bg-white hover:text-[#333] hover:border-[#bbb] [transition:background-color_0.3s,_border-color_0.3s]"
          onClick={centerGraph}
        >
          Center Zoom
        </button>
      </div>
    </div>
  );
}

export default Graph;
