const handleErrors = (response) => {
  if (!response.ok) {
    let message = `Error Code: ${response.status}`;

    if (response.statusText) {
      message = `Error: ${response.statusText}`;
    }

    parent.postMessage(
      {
        pluginMessage: {
          type: 'notice',
          message: message,
        },
      },
      '*',
    );

    throw Error(response.statusText);
  }

  return response;
};

export default handleErrors;
