import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  Avatar,
  CircularProgress,
  Alert,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Button
} from '@mui/material';
import { format } from 'date-fns';
import NotificationsIcon from '@mui/icons-material/Notifications';
import fetchNotifications from '../hooks/getNotificatons';
import useReadOneNotification from '../hooks/readNotifications';
import useReadAllNotification from '../hooks/readAllNotifications';

const NotificationPage: React.FC = () => {
  const [view, setView] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState('');
  const { data, error, isLoading } = fetchNotifications();
  const readOneNotification = useReadOneNotification();
  const readAllNotification = useReadAllNotification();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMM d, yyyy • h:mm a');
  };

  const handleViewChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: string | null
  ) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const handleNotificationClick = (notificationId: string) => {
    readOneNotification.mutate({ notificationId });
  };

  const handleMarkAllAsRead = () => {
    const timestamp = new Date().toISOString();
    readAllNotification.mutate({ timestamp });
  };

  const filteredNotifications = data?.data?.filter(notification => {
    if (view === 'all') {
      return true;
    }
    return !notification.read;
  }) || [];

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5">
            Notifications
          </Typography>
          
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleViewChange}
            aria-label="notification filter"
            size="small"
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="unread">Unread</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleMarkAllAsRead}
            disabled={filteredNotifications.length === 0}
          >
            Mark All as Read
          </Button>
        </Box>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">
            Failed to load notifications. Please try again later.
          </Alert>
        ) : filteredNotifications.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <NotificationsIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography color="text.secondary">
              {view === 'unread' 
                ? "You don't have any unread notifications" 
                : "You don't have any notifications yet"}
            </Typography>
          </Box>
        ) : (
          <List>
            {filteredNotifications.map((notification) => (
              <ListItem 
                key={notification.notificationId} 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: 2, 
                  borderBottom: '1px solid', 
                  borderColor: 'divider',
                  py: 2,
                  bgcolor: !notification.read ? 'action.selected' : 'transparent',
                  cursor: 'pointer'
                }}
                onClick={() => handleNotificationClick(notification.notificationId)}
              >
                <ListItemIcon sx={{ mt: 1 }}>
                  <Avatar 
                    src={notification.icon} 
                    sx={{ bgcolor: 'primary.main' }}
                  >
                    <NotificationsIcon />
                  </Avatar>
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Typography 
                      variant="subtitle1" 
                      fontWeight={!notification.read ? "bold" : "medium"}
                    >
                      {notification.title}
                    </Typography>
                  } 
                  secondary={
                    <Box>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {notification.body}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(notification.createdAt)}
                      </Typography>
                    </Box>
                  } 
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default NotificationPage;