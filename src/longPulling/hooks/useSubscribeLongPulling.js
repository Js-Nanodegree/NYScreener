import React from "react";

export const useSubscribeLongPulling = ({ loadData, setState }) => {
  const subscribe = async () => {
    try {
      const { data } = await loadData();
      setState(data);
      await subscribe();
    } catch (e) {
      setTimeout(subscribe, 200);
    }
  };

  React.useEffect(subscribe, []);
};
