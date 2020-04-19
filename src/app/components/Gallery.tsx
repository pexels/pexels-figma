import * as React from 'react';

const Gallery = (props) => {
  const photos = props.images.map((photo) => {
    return (
      <figure key={photo.id} className="gallery__image">
        <img
          key={photo.id}
          src={photo.src.tiny}
          alt={`Photo by ${photo.photographer}`}
          title={`Photo by ${photo.photographer}`}
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
