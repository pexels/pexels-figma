import * as React from 'react';
import Photo from './Photo';

const Gallery = (props) => {
  const photos = props.images.map((photo) => {
    return <Photo key={photo.id} photo={photo} onError={props.onError} onInsert={props.onInsert} />;
  });

  return (
    <div id="photos" className="gallery">
      {photos}
    </div>
  );
};

export default Gallery;
