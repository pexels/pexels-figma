import * as React from 'react';
import '../styles/ui.css';
import 'figma-plugin-ds/figma-plugin-ds.min.css';
import Footer from './Footer';
import Gallery from './Gallery';
import Notice from './Notice';

const App = ({}) => {
  // Define the state for UI notices
  const [message, setMessage] = React.useState({
    content: '',
    isError: false,
    showSpinner: false,
  });

  // Abstracted insertion function
  const handlePhotoInserted = ({content, isError, showSpinner}) => {
    setMessage({content, isError, showSpinner});
  };

  // Show an error message
  const handleError = (error) => {
    let errorMessage = error;

    // If there is an actual response
    if (error.response) {
      // Use the response data as the error message
      errorMessage = error.response.data.error;
    }

    // Display the error message as a notice
    setMessage({content: `Error: ${errorMessage}`, isError: true, showSpinner: false});
  };

  React.useEffect(() => {
    // Listen for messages from the plugin
    window.onmessage = (event) => {
      const {type} = event.data.pluginMessage;

      // If the plugin reports the image was inserted
      if (type === 'photo-inserted') {
        // Clear the UI notice
        setMessage({content: '', isError: false, showSpinner: false});
      }
    };
  }, [window.onmessage]);

  return (
    <React.Fragment>
      {message.content !== '' && (
        <Notice content={message.content} isError={message.isError} showSpinner={message.showSpinner} />
      )}
      <Gallery onError={handleError} onInsert={handlePhotoInserted} />
      <Footer />
    </React.Fragment>
  );
};

export default App;
