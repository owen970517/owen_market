import React, { useCallback, useState } from 'react'
import { IData } from '../type/ItemProps';

const useKeyboard = (data:string[]) => {
  const [nowIndex,setNowIndex] = useState<number | null>(null);
  const [value,setValue] = useState('');
  
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'ArrowDown') {
      if (nowIndex === null) {
        setNowIndex(0);
        setValue(data[0]); 
      } else if (nowIndex < data.length - 1) {
        setNowIndex((prev) => (prev !== null ? prev + 1 : prev));
        setValue(data[nowIndex + 1]); 
      }
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (nowIndex === 0) {
        setNowIndex(null);
        setValue(data[data.length - 1]); 
      } else if (nowIndex !== null && nowIndex > 0) {
        setNowIndex((prev) => (prev ? prev - 1 : prev));
        setValue(data[nowIndex - 1]);
      }
    }
  };
  
  const initIndex= useCallback(() => {
    setNowIndex(null);
    }, []);
  return {nowIndex , onKeyDown, initIndex, value}
}

export default useKeyboard