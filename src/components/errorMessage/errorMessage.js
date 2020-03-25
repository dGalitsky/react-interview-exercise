import React from "react";
import { Link } from "react-router-dom";
import { red } from "@material-ui/core/colors";

import styled from "styled-components";

let ErrorMessage = ({ className, onReturn }) => (
  <div className={className}>
    Oops! Something went wrong. Reload the page or{" "}
    <Link to="/" onClick={onReturn}>
      return to the homepage
    </Link>
  </div>
);

ErrorMessage = styled(ErrorMessage)`
  position: fixed;
  left: 0;
  width: 100%;
  color: white;
  background: ${red[500]};
  text-align: center;

  a {
    color: white;
  }
`;

export default ErrorMessage;
