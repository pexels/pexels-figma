import React from 'react';
import styles from './SearchedMediaList.module.scss';
import rand from 'random';
import { Button, MediaList, LoadMoreTrigger, InfiniteLoader, NoResults } from '@pexels/figma';
import { LoopIcon } from '@pexels/icons';
import { usePhotosSearch } from '../../../api';
import { postPluginMessage } from '../../utils/post-plugin-message';
import { Media } from '@pexels/types';
import { photoToMediaObject } from '@pexels/utils';
import { OrientationSelect } from '../OrientationSelect';
import { ColorSelect } from '../ColorSelect';
import { Orientation, ImageColor } from '../../../constants';
import { insertMultipleMedia, TSelectionChangedMessage } from '../../utils';
import { useUiMessage } from '../../hooks';

type Props = {
  query: string;
}

export const SearchedMediaList: React.FC<Props> = ({ query }) => {
  const selection = useUiMessage<TSelectionChangedMessage>('selection-changed')
  const [downloading, setDownloading] = React.useState<number[]>([]);
  const [orientation, setOrientation] = React.useState(Orientation.ALL);
  const [imageColor, setImageColor] = React.useState(ImageColor.ALL);
  const searchParams = React.useMemo(() => ({ query, orientation, color: imageColor }), [query, orientation, imageColor]);
  const { error, data, size, setSize } = usePhotosSearch(searchParams);

  const photos = React.useMemo(() => {
    return (data ?? []).reduce<Media[]>((acc, v) => {
      return acc.concat(v.photos.map(p => photoToMediaObject(p)));
    }, []);
  }, [data]);
  const showLoadMore = React.useMemo(() => !error && data && size === data.length, [data, size, error]);
  const showNoResults = React.useMemo(() => (!error && !!data?.length && photos.length === 0), [error, data, photos]);

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

  return (
    <>
      <div className={styles.filters}>
        <OrientationSelect
          disabled={showNoResults}
          selected={orientation}
          onSelect={setOrientation}
        />
        <ColorSelect
          disabled={showNoResults}
          selected={imageColor}
          onSelect={setImageColor}
        />
      </div>
      <Button
        disabled={!!downloading.length || showNoResults}
        loading={!!downloading.length}
        theme="primary"
        icon={<LoopIcon />}
        onClick={onRandomClick}
      >
        Insert random image
      </Button>
      {showNoResults ? (
        <NoResults>
          No results found for&nbsp;<strong>&ldquo;{query}&rdquo;</strong>
        </NoResults>
      ) : (
        <>
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
      )}
    </>
  );
}