import React, { memo } from "react";
import "./opencrawl.css";

const OpenCrawl = ({ data }: { data: HTMLDivElement | any }) => {
  return (
    <>
      <section className="intro">
        A long time ago, in a galaxy far,
        <br /> far away....
      </section>
      <div id="fade" />
      <div id="board">
        <div id="content">
          <p id="title">{data.current.title}</p>
          <p id="subtitle">Produced By {data.current.producer}</p>
          <br />
          <p>{data.current.opening_crawl}</p>
        </div>
      </div>
    </>
  );
};

export default memo(OpenCrawl);
