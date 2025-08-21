import { useEffect, useState } from 'react';

const useAnimationState = () => {
  const [useAnimations, setUseAnimations] = useState(true);

  useEffect(() => {
    const isTestEnv =
      typeof jest !== 'undefined' ||
      (typeof process !== 'undefined' && typeof process.env !== 'undefined' && typeof process.env.TEST === 'string');
    if (isTestEnv) {
      setUseAnimations(false);
    }
  }, []);

  return useAnimations;
};

export default useAnimationState;
