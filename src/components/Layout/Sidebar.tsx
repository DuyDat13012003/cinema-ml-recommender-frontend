import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';

const menuItems = [
  { icon: <HomeIcon />, text: 'Trang Chủ', path: '/' },
  { icon: <FavoriteIcon />, text: 'Yêu Thích', path: '/favorites' },
  { icon: <TrendingUpIcon />, text: 'Thịnh Hành', path: '/trending' },
  { icon: <EventIcon />, text: 'Phim đã xem', path: '/watched' },
  { icon: <PeopleIcon />, text: 'Cộng Đồng', path: '/community' },
  //{ icon: <SettingsIcon />, text: 'Cài Đặt', path: '/settings' },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      sx={{
        width: 240,
        height: '100vh',
        backgroundColor: '#000',
        position: 'fixed',
        left: 0,
        top: 64,
        pt: 3,
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.path}
            onClick={() => navigate(item.path)}
            sx={{
              cursor: 'pointer',
              color: location.pathname === item.path ? '#4299e1' : '#fff',
              backgroundColor: location.pathname === item.path ? 'rgba(66, 153, 225, 0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(66, 153, 225, 0.2)',
              },
              mb: 1,
              mx: 1,
              borderRadius: 1,
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === item.path ? '#4299e1' : '#fff', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};