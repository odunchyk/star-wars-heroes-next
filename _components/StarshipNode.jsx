"use client";
import React from "react";
import { Handle, Position } from "@xyflow/react";
import Image from "next/image";

const StarshipNode = ({ data }) => {
  return (
    <>
      <h2 className="text-white text-center mb-[10px] font-bold text-[1.5em]">
        {data.starshipName}
      </h2>
      <div style={{ width: "300px", height: "300px", position: "relative" }}>
        <Image
          src={`/Starships/${data.starshipName}.jpg`}
          layout="fill"
          objectFit="contain"
          alt={data.starshipName}
        />
        <Handle type="target" position={Position.Left} />
      </div>
    </>
  );
};

export default StarshipNode;
