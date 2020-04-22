import * as React from 'react';
import Skeleton from 'react-loading-skeleton';
import Photo from './Photo';

const Gallery = (props) => {
  const {images} = props;
  const photos = images.map((photo) => {
    return <Photo key={photo.id} photo={photo} onError={props.onError} onInsert={props.onInsert} />;
  });

  // Show an initial group of fake images while the API request takes place
  return (
    <React.Fragment>
      {!photos.length && (
        <div className="skeleton">
          <Skeleton count={8} height={140} />
        </div>
      )}
      <div className="gallery">{photos}</div>
    </React.Fragment>
  );
};

export default Gallery;
