"use client";
import React from "react";
import { Handle, Position } from "@xyflow/react";
import Image from "next/image";

const FilmNode = ({ data }) => {
  return (
    <>
      <Image
        src={`film-logos/${data.filmTitle}.jpg`}
        width={200}
        height={800}
        alt={data.name}
      />
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default FilmNode;
