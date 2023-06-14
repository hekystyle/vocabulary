import { NotificationInstance } from 'antd/es/notification/interface';
import useNotification from 'antd/es/notification/useNotification';
import React, { FC, PropsWithChildren, useContext } from 'react';

const Context = React.createContext<NotificationInstance | null>(null);

export const useAppNotification = (): NotificationInstance => {
  const value = useContext(Context);
  if (value === null) {
    throw new Error('Notifications API not available');
  }
  return value;
};

export const Notifications: FC<PropsWithChildren> = ({ children }) => {
  const [api, contextHolder] = useNotification({
    placement: 'bottomRight',
  });

  return (
    <Context.Provider value={api}>
      {contextHolder}
      {children}
    </Context.Provider>
  );
};
