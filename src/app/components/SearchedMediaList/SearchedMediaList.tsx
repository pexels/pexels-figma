import React from 'react';
import styles from './SearchedMediaList.module.scss';
import { Button, MediaList, LoadMoreTrigger, InfiniteLoader, NoResults } from '@pexels/figma';
import { LoopIcon } from '@pexels/icons';
import { usePhotosSearch } from '../../../api';
import { postPluginMessage } from '../../utils/post-plugin-message';
import { Media } from '@pexels/types';
import { photoToMediaObject } from '@pexels/utils';
import { OrientationSelect } from '../OrientationSelect';
import { ImageSizeSelect } from '../ImageSizeSelect';
import { ColorSelect } from '../ColorSelect';
import { Orientation, ImageSize, ImageColor } from '../../../constants';
import { insertMedia } from '../../utils/insert-media';
import randomNumber from '../../utils/random-number';

type Props = {
  query: string;
}

export const SearchedMediaList: React.FC<Props> = ({ query }) => {
  const [downloading, setDownloading] = React.useState(-1);
  const [orientation, setOrientation] = React.useState(Orientation.ALL);
  const [imageSize, setImageSize] = React.useState(ImageSize.ALL);
  const [imageColor, setImageColor] = React.useState(ImageColor.ALL);
  const searchParams = React.useMemo(() => ({ query, orientation, size: imageSize, color: imageColor }), [query, orientation, imageSize, imageColor]);
  const { error, data, size, setSize } = usePhotosSearch(searchParams);

  const showLoadMore = React.useMemo(() => !error && data && size === data.length, [data, size, error]);
  const photos = React.useMemo(() => {
    return (data ?? []).reduce<Media[]>((acc, v) => {
      return acc.concat(v.photos.map(p => photoToMediaObject(p)));
    }, []);
  }, [data]);

  const onRandomClick = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(async () => {
    const rng = randomNumber(photos.length);
    const media = photos[rng];
    setDownloading(media.id);
    await insertMedia(media);
    setDownloading(-1);
  }, [photos]);

  const onMediaClick = React.useCallback(async (media: Media) => {
    setDownloading(media.id);
    await insertMedia(media);
    setDownloading(-1);
  }, []);

  const onLoadMore = React.useCallback(() => {
    setSize(size + 1);
  }, [size, searchParams]);

  React.useEffect(() => {
    if (error && typeof error === 'object' && 'message' in error) {
      const msg = String(error.message);
      postPluginMessage({
        type: 'notice',
        message: { text: msg },
      });
    }
  }, [error]);

  if (!error && !!data?.length && photos.length === 0) {
    return (
      <NoResults>
        No results found for&nbsp;<strong>&ldquo;{query}&rdquo;</strong>
      </NoResults>
    );
  }

  if (!error && !data?.length) {
    return (
      <div className={styles.loader}>
        <InfiniteLoader />
      </div>
    );
  }

  return (
    <>
      <div className={styles.filters}>
        <OrientationSelect
          selected={orientation}
          onSelect={setOrientation}
        />
        <ImageSizeSelect
          selected={imageSize}
          onSelect={setImageSize}
        />
        <ColorSelect
          selected={imageColor}
          onSelect={setImageColor}
        />
      </div>
      <Button
        disabled={downloading !== -1}
        loading={downloading !== -1}
        theme="primary"
        icon={<LoopIcon />}
        onClick={onRandomClick}
      >
        Insert random image
      </Button>
      <MediaList
        media={photos}
        onMediaClick={onMediaClick}
        isDownloading={downloading === -1 ? false : downloading}
      />
      {(showLoadMore) ? (
        <LoadMoreTrigger
          onLoadMore={onLoadMore}
        />
      ) : (
        <div className={styles.loader}>
          <InfiniteLoader />
        </div>
      )}
    </>
  );
}