import React from "react";
import { Rnd } from "../../src";
import { style } from "../styles";

type State = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const containerStyle: React.CSSProperties = {
  width: 400,
  height: 300,
  position: "relative",
  background: "#e8e8e8",
  border: "1px solid #ccc",
};

export default class Example extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      width: 120,
      height: 80,
      x: 10,
      y: 20,
    };
  }

  render() {
    return (
      <div style={containerStyle}>
        <Rnd
          style={style}
          positionUnit="%"
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
          Position in % (x: {this.state.x.toFixed(1)}, y: {this.state.y.toFixed(1)})
        </Rnd>
      </div>
    );
  }
}
