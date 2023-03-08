import { useState } from 'react';
const useBoolean = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const setTrue = () => {
    setState(true);
  };
  const setFalse = () => {
    setState(false);
  };
  const setToggle = () => {
    setState(!state);
  };

  return [
    state,
    {
      setTrue,
      setFalse,
      setToggle,
    },
  ];
};
export default useBoolean;
