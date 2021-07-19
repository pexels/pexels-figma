import React from 'react';
import styles from './CuratedMediaList.module.scss';
import rand from 'random';
import { Button, MediaList, LoadMoreTrigger, InfiniteLoader } from '@pexels/figma';
import { LoopIcon } from '@pexels/icons';
import { usePhotosCurated } from '../../../api';
import { postPluginMessage } from '../../utils/post-plugin-message';
import { Media } from '@pexels/types';
import { photoToMediaObject } from '@pexels/utils';
import { insertMultipleMedia } from '../../utils';
import { useUiMessage } from '../../hooks';
import { TSelectionChangedMessage } from '../../utils';

export const CuratedMediaList: React.FC = () => {
  const selection = useUiMessage<TSelectionChangedMessage>('selection-changed')
  const [downloading, setDownloading] = React.useState<number[]>([]);
  const { error, data, size, setSize } = usePhotosCurated();
  const showLoadMore = React.useMemo(() => !error && data && size === data.length, [data, size, error]);
  const photos = React.useMemo(() => {
    return (data ?? []).reduce<Media[]>((acc, v) => {
      return acc.concat(v.photos.map(p => photoToMediaObject(p)));
    }, []);
  }, [data]);

  const onRandomClick = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(async () => {
    const images = Array.from(Array(selection?.message.nodes.length || 1)).map(_ => {
      return photos[rand.int(0, photos.length - 1)];
    });
    setDownloading(images.map(m => m.id));
    await insertMultipleMedia(images);
    setDownloading([]);
  }, [photos, selection]);

  const onMediaClick = React.useCallback(async (media: Media) => {
    setDownloading([media.id]);
    await insertMultipleMedia([media]);
    setDownloading([]);
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
        disabled={!!downloading.length}
        loading={!!downloading.length}
        theme="primary"
        icon={<LoopIcon />}
        onClick={onRandomClick}
      >
        Insert random image
      </Button>
      <MediaList
        media={photos}
        onMediaClick={onMediaClick}
        isDownloading={downloading.length ? downloading : false}
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