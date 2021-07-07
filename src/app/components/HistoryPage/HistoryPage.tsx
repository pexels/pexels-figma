import React from 'react';
import styles from './HistoryPage.module.scss';
import { useUiMessage } from '../../hooks';
import { TMediaHistoryChangedMessage } from '../../utils/post-ui-message';
import { NoResults, MediaList, Button } from '@pexels/figma';
import { Media } from '@pexels/types';
import { LoopIcon } from '@pexels/icons';
import { insertMedia } from '../../utils/insert-media';
import randomNumber from '../../utils/random-number';

export const HistoryPage: React.FC = () => {
  const [downloading, setDownloading] = React.useState(-1);
  const recent = useUiMessage<TMediaHistoryChangedMessage>('media-history-changed', true);
  const reversed = React.useMemo(() => (
    recent ? [...recent.message.media].reverse() : []
  ), [recent]);

  const onRandomClick = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(async () => {
    const rng = randomNumber(reversed.length);
    console.log(rng);
    const media = reversed[rng];
    setDownloading(media.id);
    await insertMedia(media);
    setDownloading(-1);
  }, [reversed]);

  const onMediaClick = React.useCallback(async (media: Media) => {
    setDownloading(media.id);
    await insertMedia(media);
    setDownloading(-1);
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
        disabled={downloading !== -1}
        loading={downloading !== -1}
        theme="primary"
        icon={<LoopIcon />}
        onClick={onRandomClick}
      >
        Insert random image
      </Button>
      <MediaList
        media={reversed}
        isDownloading={downloading}
        onMediaClick={onMediaClick}
      />
    </div>
  )
}