import * as React from 'react';

const Notice = ({message, loading = false, error = false}) => {
  const renderSpinner = () => {
    if (loading) {
      return (
        <div className="visual-bell__spinner-container">
          <span className="visual-bell__spinner" />
        </div>
      );
    }
  };

  return (
    <div id="notice" className="notice">
      <div className={`visual-bell ${error ? 'visual-bell--error' : ''}`}>
        {renderSpinner()}
        <span className="visual-bell__msg">{message}</span>
      </div>
    </div>
  );
};

export default Notice;
