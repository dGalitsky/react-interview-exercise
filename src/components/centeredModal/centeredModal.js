import React from "react";
import styled from "styled-components";

import { Modal, Fade } from "@material-ui/core";

let CenteredModal = ({ className, children, open, ...props }) => (
  <Modal className={className} open={open} {...props}>
    <Fade in={open}>{children}</Fade>
  </Modal>
);

CenteredModal = styled(CenteredModal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default CenteredModal;
