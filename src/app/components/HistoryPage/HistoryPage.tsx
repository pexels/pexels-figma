import React from 'react';
import styles from './HistoryPage.module.scss';
import rand from 'random';
import { useUiMessage } from '../../hooks';
import { TMediaHistoryChangedMessage, TSelectionChangedMessage } from '../../utils/post-ui-message';
import { NoResults, MediaList, Button } from '@pexels/figma';
import { Media } from '@pexels/types';
import { LoopIcon } from '@pexels/icons';
import { insertMultipleMedia } from '../../utils';

export const HistoryPage: React.FC = () => {
  const selection = useUiMessage<TSelectionChangedMessage>('selection-changed')
  const [downloading, setDownloading] = React.useState<number[]>([]);
  const recent = useUiMessage<TMediaHistoryChangedMessage>('media-history-changed', true);
  const reversed = React.useMemo(() => (
    recent ? [...recent.message.media].reverse() : []
  ), [recent]);

  const onRandomClick = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(async () => {
    const images = Array.from(Array(selection?.message.nodes.length || 1)).map(_ => {
      return reversed[rand.int(0, reversed.length - 1)];
    });
    setDownloading(images.map(m => m.id));
    await insertMultipleMedia(images);
    setDownloading([]);
  }, [reversed, selection]);

  const onMediaClick = React.useCallback(async (media: Media) => {
    setDownloading([media.id]);
    await insertMultipleMedia([media]);
    setDownloading([]);
  }, []);

  if (reversed.length === 0) {
    return (
      <NoResults>
        No recent images
      </NoResults>
    )
  }

  return (
    <div className={styles.page}>
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
        media={reversed}
        onMediaClick={onMediaClick}
        isDownloading={downloading.length ? downloading : false}
      />
    </div>
  )
}