import React from "react";
import styled from "styled-components";
import { debounce } from "underscore";
import { Slider, Typography } from "@material-ui/core";

const ZOOMED_STYLE = {
  position: "absolute",
  transform: "translate(-50%, -50%)",
  width: "initial",
  cursor: "grab"
};

class ImageZoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { zoom: 0, position: { top: 0, left: 0 } };
    this.container = React.createRef();
    this.image = React.createRef();
  }

  componentDidMount() {
    this.init();
    window.addEventListener("resize", this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  init = () => {
    this.minZoom = Math.ceil(
      (this.image.current.clientWidth / this.image.current.naturalWidth) * 100
    );

    this.containerStyle = {
      width: this.container.current.clientWidth + "px",
      height: this.container.current.clientHeight + "px"
    };
  };

  onResize = debounce(this.init, 500);

  onZoomChange = (e, value) => {
    this.setState(ps => ({
      zoom: value,
      position: this.limitPosition({ x: ps.position.left, y: ps.position.top })
    }));
  };

  onMouseMove = e => {
    e.preventDefault();
    e.persist();

    if (this.state.zoom === this.minZoom || !this.draggable) {
      return;
    }

    this.setState(ps => ({
      position: this.limitPosition({
        x: ps.position.left + e.movementX,
        y: ps.position.top + e.movementY
      })
    }));
  };

  startDrag = () => {
    this.draggable = true;
  };

  endDrag = () => {
    this.draggable = false;
  };

  limitPosition({ x, y }) {
    const {
      width: imageWidth,
      height: imageHeight
    } = this.image.current.getBoundingClientRect();

    return {
      top: Math.max(
        (this.container.current.clientHeight - imageHeight) / 2,
        Math.min((imageHeight - this.container.current.clientHeight) / 2, y)
      ),
      left: Math.max(
        (this.container.current.clientWidth - imageWidth) / 2,
        Math.min((imageWidth - this.container.current.clientWidth) / 2, x)
      )
    };
  }

  getImageStyle() {
    const { zoom } = this.state;
    const { top, left } = this.state.position;
    const zoomCenter = {
      top: top + this.image.current.naturalHeigth / 2,
      left: left + this.image.current.naturalHeigth / 2
    };

    return {
      ...ZOOMED_STYLE,
      top: `calc(50% + ${top}px)`,
      left: `calc(50% + ${left}px)`,
      transform: `translate(-50%,-50%) scale(${zoom / 100})`,
      transformOrigin: `${zoomCenter.left}px ${zoomCenter.top}px`
    };
  }

  render() {
    const { className, ...props } = this.props;
    const { zoom } = this.state;
    return (
      <div className={className}>
        <div
          className="image-wrapper"
          ref={this.container}
          style={zoom ? this.containerStyle : null}
        >
          <img
            {...props}
            ref={this.image}
            style={zoom ? this.getImageStyle() : null}
            onMouseDown={this.startDrag}
            onTouchStart={this.startDrag}
            onMouseUp={this.endDrag}
            onTouchEnd={this.endDrag}
            onMouseLeave={this.endDrag}
            onMouseMove={this.onMouseMove}
            onTouchMove={this.onMouseMove}
          />
        </div>
        <Typography gutterBottom>Zoom</Typography>
        <Slider
          value={this.state.zoom}
          onChange={this.onZoomChange}
          valueLabelDisplay="auto"
          min={this.minZoom}
          max={100}
          steps={5}
          valueLabelFormat={val => `${val}%`}
        />
      </div>
    );
  }
}

ImageZoom = styled(ImageZoom)`
  max-width: 80%;
  background: white;
  border: 10px solid white;

  .image-wrapper {
    position: relative;
    overflow: hidden;
  }

  img {
    display: block;
    width: 100%;
  }
`;

export default ImageZoom;
