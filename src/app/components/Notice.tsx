import * as React from 'react';

const Notice = (props) => {
  // Destructure props
  const {content, isLoading, isError} = props;

  // Loading spinner
  const renderSpinner = () => {
    return (
      <div className="visual-bell__spinner-container">
        <span className="visual-bell__spinner" />
      </div>
    );
  };

  return (
    <div id="notice" className="notice">
      <div className={`visual-bell ${isError ? 'visual-bell--error' : ''}`}>
        {isLoading && renderSpinner}
        <span className="visual-bell__msg">{content}</span>
      </div>
    </div>
  );
};

export default Notice;
