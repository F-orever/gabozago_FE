import React from 'react';
import * as S from './style';
import { SelectOptions } from '../../../../assets/types/FilterTypes';

export interface Props extends SelectOptions {
  filter: string[] | string;
  setFilter: React.Dispatch<React.SetStateAction<string[] | string>>;
}
function Select({ filter, setFilter, options, multiple = false }: Props) {
  const toggleItem = (item: string) => {
    if (filter.includes(item)) {
      setFilter(filter.filter((i) => i !== item));
    } else {
      setFilter((prev) => [...prev, item]);
    }
  };

  return (
    <S.List>
      {options.map(({ label, value }) => (
        <S.Item
          key={`option-${value}`}
          checked={multiple ? filter.includes(value) : filter === value}
        >
          <S.CheckboxInput
            type="checkbox"
            id={value}
            checked={multiple ? filter.includes(value) : filter === value}
            onChange={() => {
              if (multiple) {
                toggleItem(value);
              } else {
                setFilter(value);
              }
            }}
          />
          <label htmlFor={value}>{label}</label>
        </S.Item>
      ))}
    </S.List>
  );
}

export default Select;
