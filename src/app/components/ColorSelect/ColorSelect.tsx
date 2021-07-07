import React from 'react';
import styles from './ColorSelect.module.scss';
import { Select } from '@pexels/figma';
import { ImageColor } from '../../../constants';

type Props = {
  selected: ImageColor;
  onSelect: (value: ImageColor) => void;
}

const HexColorMap = {
  [ImageColor.ALL]: '#ffffff',
  [ImageColor.BLACK]: '#000000',
  [ImageColor.RED]: '#FF6A6A',
  [ImageColor.ORANGE]: '#FFBC6D',
  [ImageColor.YELLOW]: '#F6FF89',
  [ImageColor.GREEN]: '#8CF1B4',
  [ImageColor.TURQUOISE]: '#80F0E3',
  [ImageColor.BLUE]: '#6998F2',
  [ImageColor.VIOLET]: '#B770EF',
  [ImageColor.PINK]: '#FFCFFD',
  [ImageColor.BROWN]: '#C0AF82',
  [ImageColor.GRAY]: '#B5B5B5',
  [ImageColor.WHITE]: '#ffffff',
}

export const ColorSelect: React.FC<Props> = ({ selected, onSelect }) => {
  const options = React.useMemo(() => ([
    { label: 'All Colors', value: ImageColor.ALL },
    { label: 'Black', value: ImageColor.BLACK },
    { label: 'Red', value: ImageColor.RED },
    { label: 'Orange', value: ImageColor.ORANGE },
    { label: 'Yellow', value: ImageColor.YELLOW },
    { label: 'Green', value: ImageColor.GREEN },
    { label: 'Turqouise', value: ImageColor.TURQUOISE },
    { label: 'Blue', value: ImageColor.BLUE },
    { label: 'Violet', value: ImageColor.VIOLET },
    { label: 'Pink', value: ImageColor.PINK },
    { label: 'Brown', value: ImageColor.BROWN },
    { label: 'Gray', value: ImageColor.GRAY },
    { label: 'White', value: ImageColor.WHITE },
  ]), []);

  const onRenderOption = React.useCallback((option: typeof options[number]) => {
    return (
      <div className={styles.colorOption}>
        <div className={styles.color} style={{ backgroundColor: HexColorMap[option.value] }} />
        <div>{option.label}</div>
      </div>
    )
  }, []);

  return (
    <Select
      id="orientation"
      defaultValue={ImageColor.ALL}
      options={options}
      selected={selected}
      alignment="right"
      maxHeight={300}
      renderOption={onRenderOption}
      onSelect={onSelect}
    />
  )
}