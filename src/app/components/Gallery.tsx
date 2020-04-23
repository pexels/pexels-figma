import * as React from 'react';
import useInfiniteScroll from '@closeio/use-infinite-scroll';
// import Skeleton from 'react-loading-skeleton';
import Photo from './Photo';
import SearchBar from './SearchBar';
import randomNumber from '../utils/random-number';
import randomNumber from '../utils/random-number';

const Gallery = (props) => {
  // Absolute values
  const HEIGHT = 140;
  const WIDTH = 199;
  const PER_PAGE = 30;
  const URL = 'https://api.pexels.com/v1/';

  // States
  // const [pageNumber, setPageNumber] = React.useState(randomNumber);
  // const [loading, setLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const [items, setItems] = React.useState([]);
  const [hasMore, setHasMore] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [page, loaderRef, scrollerRef] = useInfiniteScroll({hasMore});

  React.useEffect(() => {
    (async () => {
      setPageNumber((prev) => prev + 1);
      await fetch(`${URL}search?query=${searchTerm}&per_page=${PER_PAGE}&page=${pageNumber}`, {
        headers: {
          Authorization: process.env.API_KEY,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setHasMore(pageNumber * PER_PAGE <= data.total_results);
          setItems((prev) => [...prev, ...data.photos]);
        })
        .catch(props.onError);
    })();
  }, [page, searchTerm]);

  // When the seach is submitted in <SearchBar />
  const handleSearchSubmit = (term) => {
    // Clear the curated photos
    setItems([]);
    setSearchTerm(term);
    setPageNumber(1);
  };

  // Fetch curated photos when the component is first rendered
  // React.useEffect(() => {
  //   fetchData();
  // }, []);

  // Fetch photos when the search state (searchTerm) is updated
  // React.useEffect(() => {
  //   fetchData();
  // }, [searchTerm]);

  // React.useEffect(() => {
  //   fetchData();
  //   console.log(pageNumber);
  // }, [pageNumber]);

  // Create the gallery of Photos
  const gallery = items.map((photo) => {
    return (
      <Photo
        key={photo.id}
        photo={photo}
        onError={props.onError}
        onInsert={props.onInsert}
        height={HEIGHT}
        width={WIDTH}
      />
    );
  });

  // Show an initial group of fake images while the API request takes place
  return (
    <React.Fragment>
      <SearchBar onUserSubmit={handleSearchSubmit} />
      {/* {loading && (
        <div className="skeleton">
          <Skeleton count={8} height={HEIGHT} />
        </div>
      )} */}
      <div id="gallery" className="gallery" ref={scrollerRef}>
        {gallery}
        {hasMore && <div ref={loaderRef}>Loading&hellip;</div>}
      </div>
    </React.Fragment>
  );
};

export default Gallery;
