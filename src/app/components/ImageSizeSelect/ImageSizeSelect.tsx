import React from 'react';
import { Select } from '@pexels/figma';
import { ImageSize } from '../../../constants';

type Props = {
  selected: ImageSize;
  onSelect: (value: ImageSize) => void;
}

export const ImageSizeSelect: React.FC<Props> = ({ selected, onSelect }) => {
  const options = React.useMemo(() => ([
    { label: 'All Sizes', value: ImageSize.ALL },
    { label: 'Large', value: ImageSize.LARGE },
    { label: 'Medium', value: ImageSize.MEDIUM },
    { label: 'Small', value: ImageSize.SMALL },
  ]), []);

  return (
    <Select
      id="imageSize"
      defaultValue={ImageSize.ALL}
      options={options}
      selected={selected}
      onSelect={onSelect}
    />
  )
}