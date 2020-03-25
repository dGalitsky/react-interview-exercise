import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { debounce } from "underscore";
import { CircularProgress } from "@material-ui/core";

class InfiniteScroll extends React.Component {
  static propTypes = {
    onBottomHit: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired
  };

  static defaultProps = {
    height: 50
  };

  state = {
    isLoading: false
  };

  constructor(props) {
    super(props);
    this.sentinel = React.createRef();
    this.onScroll = debounce(this.onScroll, 500);
  }Î

  onScroll = async () => {
    if (
      this.sentinel.current && this.sentinel.current.getBoundingClientRect().top <= window.innerHeight &&
      !this.state.isLoading
    ) {
      this.setState({ isLoading: true });
      await this.props.onBottomHit();
      this.setState({ isLoading: false });
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll);
  }

  componentWillUnmount() {
    window.addEventListener("scroll", this.onScroll);
  }

  render() {
    const { className, children, height } = this.props;
    return (
      <div>
        {children}
        <div
          className={className}
          style={{ height: `${height}px` }}
          ref={this.sentinel}
        >
          {this.state.isLoading && <CircularProgress />}
        </div>
      </div>
    );
  }
}

InfiniteScroll = styled(InfiniteScroll)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${props => `${props.height}px`};
`;

export default InfiniteScroll;
