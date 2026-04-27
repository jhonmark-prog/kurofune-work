import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppNotification } from '../features/notifications/types/notifications.types';
import { DUMMY_NOTIFICATIONS } from '../features/notifications/constants/notificationsData';

export interface NotificationsState {
  items: AppNotification[];
}

const initialState: NotificationsState = {
  items: DUMMY_NOTIFICATIONS,
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<AppNotification[]>) => {
      state.items = action.payload;
    },
    markRead: (state, action: PayloadAction<string>) => {
      const item = state.items.find((n) => n.id === action.payload);
      if (item) item.is_read = true;
    },
    markAllRead: (state) => {
      state.items.forEach((n) => { n.is_read = true; });
    },
  },
});

export const { setNotifications, markRead, markAllRead } = notificationsSlice.actions;

export const selectNotifications = (state: { notifications: NotificationsState }) =>
  state.notifications.items;

export const selectUnreadCount = (state: { notifications: NotificationsState }) =>
  state.notifications.items.filter((n) => !n.is_read).length;

export default notificationsSlice.reducer;