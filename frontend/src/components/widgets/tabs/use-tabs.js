import { useMemo, useState } from 'react';

const useTab = ({ defaultValue = 0 } = {}) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return useMemo(
    () => ({
      activeTab,
      selectTab: setActiveTab,
    }),
    [activeTab]
  );
};

export default useTab;
