import React from "react";
import { Rnd } from "../../src";
import { style } from "../styles";

const GRID_SIZE = 20;
const CONTAINER_WIDTH = 400;
const CONTAINER_HEIGHT = 300;

const containerStyle: React.CSSProperties = {
  width: CONTAINER_WIDTH,
  height: CONTAINER_HEIGHT,
  boxSizing: "border-box",
  position: "relative",
  background: "#fafafa",
  outline: "1px solid #ccc",
  overflow: "hidden",
  // Visual grid: lines every GRID_SIZE px to match dragGrid/resizeGrid
  // outline (not border) so the content box stays exact and grid aligns with Rnd position
  backgroundImage: `
    linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0,0,0,0.08) 1px, transparent 1px)
  `,
  backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
};

type State = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export default class Example extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      width: 120,
      height: 80,
      x: 15,
      y: 20,
    };
  }

  render() {
    return (
      <div style={containerStyle}>
        <Rnd
          style={style}
          positionUnit="%"
          dragGrid={[GRID_SIZE, GRID_SIZE]}
          resizeGrid={[GRID_SIZE, GRID_SIZE]}
          size={{
            width: this.state.width,
            height: this.state.height,
          }}
          position={{
            x: this.state.x,
            y: this.state.y,
          }}
          onDragStop={(e, d) => {
            this.setState({ x: d.x, y: d.y });
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            this.setState({
              width: ref.offsetWidth,
              height: ref.offsetHeight,
              ...position,
            });
          }}
        >
          <div style={{ fontSize: 11 }}>
            positionUnit="%" · grid=[{GRID_SIZE},{GRID_SIZE}]px
            <br />
            x: {this.state.x.toFixed(1)}% · y: {this.state.y.toFixed(1)}%
          </div>
        </Rnd>
      </div>
    );
  }
}
