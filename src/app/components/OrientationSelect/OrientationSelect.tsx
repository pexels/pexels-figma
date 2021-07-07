import React from 'react';
import { Select } from '@pexels/figma';
import { Orientation } from '../../../constants';

type Props = {
  disabled?: boolean;
  selected: Orientation;
  onSelect: (value: Orientation) => void;
}

export const OrientationSelect: React.FC<Props> = ({ disabled, selected, onSelect }) => {
  const options = React.useMemo(() => ([
    { label: 'All orientations', value: Orientation.ALL },
    { label: 'Portrait', value: Orientation.PORTRAIT },
    { label: 'Landscape', value: Orientation.LANDSCAPE },
    { label: 'Square', value: Orientation.SQUARE },
  ]), []);

  return (
    <Select
      id="orientation"
      disabled={disabled}
      defaultValue={Orientation.ALL}
      options={options}
      selected={selected}
      onSelect={onSelect}
    />
  )
}