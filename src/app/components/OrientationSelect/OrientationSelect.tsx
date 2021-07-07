import React from 'react';
import { Select } from '@pexels/figma';
import { Orientation } from '../../../constants';

type Props = {
  selected: Orientation;
  onSelect: (value: Orientation) => void;
}

export const OrientationSelect: React.FC<Props> = ({ selected, onSelect }) => {
  const options = React.useMemo(() => ([
    { label: 'All orientations', value: Orientation.ALL },
    { label: 'Portrait', value: Orientation.PORTRAIT },
    { label: 'Landscape', value: Orientation.LANDSCAPE },
    { label: 'Square', value: Orientation.SQUARE },
  ]), []);

  return (
    <Select
      id="orientation"
      defaultValue={Orientation.ALL}
      options={options}
      selected={selected}
      onSelect={onSelect}
    />
  )
}