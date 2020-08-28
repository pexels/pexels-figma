import * as React from 'react';
import Skeleton from 'react-loading-skeleton';
import IconCamera from '../assets/icon-camera.svg';
import handleErrors from '../utils/handle-errors';

const Photo = (props) => {
  const {photo, width = 199, height = 140} = props;

  const [imageLoaded, setImageLoaded] = React.useState(false);

  // Update the state when the image has loaded
  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  // Create the photo in figma
  const handleClickedPhoto = React.useCallback(() => {
    parent.postMessage(
      {
        pluginMessage: {
          type: 'notice',
          message: {text: 'Downloading Photo...', timeout: 30000},
        },
      },
      '*',
    );

    // Get the clicked image
    const clickedImage = event.srcElement as HTMLImageElement;

    // Get the original URL stored as a data attribute
    const insertURL = clickedImage.dataset.insertUrl;

    // Fetch the image
    fetch(insertURL)
      .then(handleErrors)
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        // Send data to the pligin code
        parent.postMessage(
          {
            pluginMessage: {
              type: 'imageHash',
              message: {
                data: new Uint8Array(buffer),
                width: photo.width,
                height: photo.height,
                photographer: photo.photographer,
              },
            },
          },
          '*',
        );
      })
      .catch((error) => console.log(error));
  }, []);

  // If the image hasn't loaded then show an empty state
  return (
    <React.Fragment>
      {!imageLoaded && <Skeleton height={height} />}
      <figure style={{height}} className={`gallery__image ${imageLoaded ? 'is-loaded' : ''}`}>
        <img
          onLoad={handleImageLoaded}
          onClick={handleClickedPhoto}
          src={photo.src.tiny}
          alt={`Photo by ${photo.photographer}`}
          title={`Photo by ${photo.photographer}`}
          data-insert-url={photo.src.large2x}
          width={width}
          height={height}
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
    </React.Fragment>
  );
};

export default Photo;
