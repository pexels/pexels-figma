import * as React from 'react';
// @ts-ignore
import IconPhotos from '../assets/icon-photos.svg';

const EmptyState = () => {
  return (
    <div className="empty">
      <div className="empty__image">
        <IconPhotos />
      </div>
      <h1 className="empty__title">No Results</h1>
      <p>No photos matched your search.</p>
      <p>Please try another search term.</p>
      <button id="curated" className="button button--secondary empty__button">
        Show Curated Photos
      </button>
    </div>
  );
};

export default EmptyState;
