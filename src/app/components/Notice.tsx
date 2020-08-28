import * as React from 'react';

const Notice = ({content, isError, showSpinner}) => {
  // Loading spinner
  const Spinner = () => {
    if (showSpinner) {
      return (
        <div className="visual-bell__spinner-container">
          <div className="icon icon--spinner icon--spin icon--white8"></div>
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
