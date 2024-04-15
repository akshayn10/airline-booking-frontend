import { notification } from 'antd';
import React, { createContext, useContext} from 'react';

const NotificationContext = createContext({
  openNotification: () => {}, 
  contextHolder: null, 
});

export const NotificationProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, message, description = '') => {
    api[type]({
      message,
      description,
    });
  };

  return (
    <NotificationContext.Provider value={{ openNotification, contextHolder }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  return useContext(NotificationContext);
};
