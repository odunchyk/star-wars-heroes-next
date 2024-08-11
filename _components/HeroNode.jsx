"use client";
import React from "react";
import HeroCard from "@/_components/HeroCard";
import { Handle, Position } from "@xyflow/react";

const HeroNode = ({ data }) => {
  return (
    <>
      <div>
        <HeroCard hero={data.hero} isDetailed={true} />
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default HeroNode;
