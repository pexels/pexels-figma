import React from 'react';
import styles from './SearchBar.module.scss';
import { Button, Input } from '@pexels/figma';
import { SearchIcon } from '@pexels/icons';

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (v: string) => void;
}

export const SearchBar: React.FC<Props> = ({ value, onChange, onSubmit }) => {
  const onInput = React.useCallback<React.FormEventHandler<HTMLInputElement>>((event) => {
    onChange(event.currentTarget.value);
  }, [value, onChange]);

  const onFormSubmit = React.useCallback<React.FormEventHandler<HTMLFormElement>>((event) => {
    event.preventDefault();
    onSubmit(value);
  }, [value, onSubmit]);

  return (
    <form
      className={styles.searchbar}
      onSubmit={onFormSubmit}
    >
      <Input
        value={value}
        icon={<SearchIcon />}
        onInput={onInput}
        placeholder="Search for free photos"
      />
      <Button>Search</Button>
    </form>
  );
}