import * as React from 'react';

const Photo = (props) => {
  const {photo} = props;
  const onCreate = React.useCallback(() => {
    // Get the clicked image
    const clickedImage = event.srcElement as HTMLImageElement;
    // Get the original URL stored as a data attribute
    const insertURL = clickedImage.dataset.insertUrl;

    // Get the dimentsion of the image
    const img = new Image();

    // Load the image
    img.onload = () => {
      // Fetch the image
      fetch(insertURL)
        .then((response) => response.arrayBuffer())
        .then((buffer) => {
          // Send data to the pligin code
          parent.postMessage(
            {
              pluginMessage: {
                type: 'imageHash',
                data: new Uint8Array(buffer),
                width: img.naturalWidth,
                height: img.naturalHeight,
              },
            },
            '*',
          );
          // Remove the loading notice
          // Send the value to the parent component
        })
        .catch(props.onError);
    };

    // Asign the src to the image which shows it
    img.src = insertURL;
  }, []);

  return (
    <figure className="gallery__image">
      <img
        onClick={onCreate}
        src={photo.src.tiny}
        alt={`Photo by ${photo.photographer}`}
        title={`Photo by ${photo.photographer}`}
        data-insert-url={photo.src.original}
        width={199}
        height={140}
      />
    </figure>
  );
};

export default Photo;
