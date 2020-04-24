import * as React from 'react';
import useInfiniteScroll from '@closeio/use-infinite-scroll';
import Skeleton from 'react-loading-skeleton';
import Photo from './Photo';
import SearchBar from './SearchBar';
import EmptyState from './EmptyState';

const Gallery = (props) => {
  // Constants
  const HEIGHT = 140;
  const WIDTH = 199;
  const PHOTOS_PER_PAGE = 30;
  const URL = 'https://api.pexels.com/v1/';

  // States
  const [loading, setLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [photos, setPhotos] = React.useState([]);
  const [hasMore, setHasMore] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [endpoint, setEndpoint] = React.useState(`curated?`);
  const [initialLoad, setInitialLoad] = React.useState(true);

  // Infinite Scroll
  const [page, loaderRef, scrollerRef] = useInfiniteScroll({hasMore});

  // Initiate data fetching
  React.useEffect(() => {
    (async () => {
      await fetch(`${URL}${endpoint}&per_page=${PHOTOS_PER_PAGE}&page=${pageNumber}`, {
        headers: {Authorization: process.env.API_KEY},
      })
        .then((response) => response.json())
        .then((data) => {
          // Update the page number after we've loaded the previous
          setPageNumber((prev) => prev + 1);

          // Check to see if there are more pages
          setHasMore(pageNumber * PHOTOS_PER_PAGE <= data.total_results);

          // Combine the previous array of photos with the new data
          setPhotos((prev) => [...prev, ...data.photos]);

          // No longer loeading
          setLoading(false);
        })
        .catch(props.onError); // Send the error to the parent for use in the notice
    })();
  }, [page, searchTerm]);

  // When the seach is submitted in <SearchBar />
  const handleSearchSubmit = (term) => {
    // Clear the curated photos
    setPhotos([]);
    setEndpoint(`search?query=${term}`);
    setInitialLoad(false);
    setLoading(true);
    setSearchTerm(term);
    setPageNumber(1);
  };

  // Create the gallery of Photos
  const gallery = photos.map((photo, i) => {
    return (
      <Photo key={i} photo={photo} onError={props.onError} onInsert={props.onInsert} height={HEIGHT} width={WIDTH} />
    );
  });

  // Show an initial group of fake images while the API request takes place
  return (
    <React.Fragment>
      <SearchBar onUserSubmit={handleSearchSubmit} />
      {loading && (
        <div className="skeleton">
          <Skeleton count={8} height={HEIGHT} />
        </div>
      )}

      {!photos.length && !initialLoad && !loading && <EmptyState searchTerm={searchTerm} />}

      <div id="gallery" className="gallery" ref={scrollerRef}>
        {gallery}
        {hasMore && (
          <div className="infinite-scroll-loader" ref={loaderRef}>
            Loading more photos&hellip;
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Gallery;
