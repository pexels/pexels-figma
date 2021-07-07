import React from 'react';
import { Button, MediaList, LoadMoreTrigger, InfiniteLoader } from '@pexels/figma';
import { LoopIcon } from '@pexels/icons';
import styles from './CuratedMediaList.module.scss';
import { usePhotosCurated } from '../../../api';
import { postPluginMessage } from '../../utils/post-plugin-message';
import { Media } from '@pexels/types';
import { photoToMediaObject } from '@pexels/utils';
import { insertMedia } from '../../utils/insert-media';
import randomNumber from '../../utils/random-number';

export const CuratedMediaList: React.FC = () => {
  const [downloading, setDownloading] = React.useState(-1);
  const { error, data, size, setSize } = usePhotosCurated();
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
  }, [size]);

  React.useEffect(() => {
    if (error && typeof error === 'object' && 'message' in error) {
      const msg = String(error.message);
      postPluginMessage({
        type: 'notice',
        message: { text: msg },
      });
    }
  }, [error]);

  return (
    <>
      <p className={styles.title}>Popular Images</p>
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