import * as React from 'react';
import IconCamera from '../assets/icon-camera.svg';

const Photo = (props) => {
  const {photo} = props;

  // Create the photo in figma
  const onCreate = React.useCallback(() => {
    // Let Figma know that an image is being inserted
    parent.postMessage(
      {
        pluginMessage: {
          type: 'notice',
          message: {
            text: `Inserting image from ${photo.photographer}`,
          },
        },
      },
      '*',
    );

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
                message: {
                  data: new Uint8Array(buffer),
                  width: img.naturalWidth,
                  height: img.naturalHeight,
                },
              },
            },
            '*',
          );
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
      <div className="gallery__overlay">
        <IconCamera />
        <a
          title={`Visit ${photo.photographer} on Pexels`}
          target="_blank"
          className="gallery__photographer"
          href={photo.photographer_url}>
          {photo.photographer}
        </a>
      </div>
    </figure>
  );
};

export default Photo;
