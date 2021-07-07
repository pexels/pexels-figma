import React from 'react';
import styles from './SearchPage.module.scss';
import { Tags } from '../../../constants';
import { TagsGrid } from '@pexels/figma';
import { Tag } from '@pexels/types';
import { SearchBar } from '../SearchBar';
import { CuratedMediaList } from '../CuratedMediaList';
import { SearchedMediaList } from '../SearchedMediaList';

export const SearchPage: React.FC = () => {
  const [searchInputValue, setSearchInputValue] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');

  const onTagClick = React.useCallback((t: Tag) => {
    setSearchInputValue(t.query);
    setSearchQuery(t.query);
  }, []);

  return (
    <div className={styles.page}>
      <SearchBar
        value={searchInputValue}
        onChange={setSearchInputValue}
        onSubmit={setSearchQuery}
      />

      {(!searchQuery) && (
        <TagsGrid
          tags={Tags}
          onTagClick={onTagClick}
        />
      )}

      {(!searchQuery) && (
        <CuratedMediaList />
      )}

      {(!!searchQuery) && (
        <SearchedMediaList query={searchQuery} />
      )}
    </div>
  );
}