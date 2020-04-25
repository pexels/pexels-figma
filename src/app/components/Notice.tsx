import * as React from 'react';

const Notice = ({content, isError, showSpinner}) => {
  // Loading spinner
  const Spinner = () => {
    if (showSpinner) {
      return (
        <div className="visual-bell__spinner-container">
          <span className="visual-bell__spinner" />
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div id="notice" className="notice">
      <div className={`visual-bell ${isError ? 'visual-bell--error' : ''}`}>
        <Spinner />
        <span className="visual-bell__msg">{content}</span>
      </div>
    </div>
  );
};

export default Notice;
