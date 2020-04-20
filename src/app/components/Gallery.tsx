import * as React from 'react';

const Gallery = (props) => {
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
        .catch((error) => {
          // Pass error back up to parent components
          props.error(error);
        });
    };

    // Asign the src to the image which shows it
    img.src = insertURL;
  }, []);

  const photos = props.images.map((photo) => {
    return (
      <figure key={photo.id} className="gallery__image">
        <img
          onClick={onCreate}
          key={photo.id}
          src={photo.src.tiny}
          alt={`Photo by ${photo.photographer}`}
          title={`Photo by ${photo.photographer}`}
          data-insert-url={photo.src.original}
          width={199}
          height={140}
        />
      </figure>
    );
  });

  return (
    <div id="photos" className="gallery">
      {photos}
    </div>
  );
};

export default Gallery;
