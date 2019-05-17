import React from "react";
import Modal from "../components/UI/Modal/Modal";

const withErrorHandler = WrappedComponent => {
  return props => {
    return (
      <React.Fragment>
        <Modal show>Some thing went wrong</Modal>

        <WrappedComponent {...props} />
      </React.Fragment>
    );
  };
};

export default withErrorHandler;
