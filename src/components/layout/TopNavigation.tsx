import React, { useState } from 'react';
import {
    AppBar, Avatar, Box, Button, Collapse, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { AUTH_BASE_URL } from '../../constants/index.ts';
import userStore from '../../store/userStore.ts';

const AppBarStyled = styled(AppBar)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
}));
const TopNavigation: React.FC = () => {
    const { t } = useTranslation();
    const { resetAuthState, userDetails } = userStore();
    const [showUserDetails, setShowUserDetails] = useState<boolean>(false);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return <AppBarStyled position="fixed" sx={{ background: '#1D2125' }}>
        <Toolbar>
            <Box sx={{
                display: 'flex', alignItems: 'center', gap: 4, flexGrow: 1,
            }}>
                <img src="/logo.svg" alt="Logo" style={{ height: 40, marginRight: 8 }}/>
                <Typography variant="h6">
                    {t('sales_collection')}
                </Typography>
            </Box>
            {userDetails && <Box sx={{
                display: 'flex',
                flexFlow: 'row',
            }}>
                <IconButton
                    href="https://support.mallcommapp.com/knowledge/sales-portal"
                    target="_blank"
                    size="large"
                    aria-label={t('common.help')}
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <HelpOutlineIcon/>
                </IconButton>
                <Tooltip title={t('common.my_profile')}>
                    <Button
                        onClick={handleOpenUserMenu}
                        onMouseOver={() => {
                            setShowUserDetails(true);
                        }}
                        onMouseLeave={() => {
                            setShowUserDetails(false);
                        }}
                        sx={{
                            p: 0,
                            px: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            gap: 0.25,
                        }}>
                        <Avatar alt={userDetails.attributes.name} src="/"/>
                        <Collapse orientation="horizontal" in={showUserDetails} collapsedSize={0}>
                            <Box sx={{
                                display: 'flex',
                                flexFlow: 'column',
                                alignItems: 'start',
                                color: 'lightgray',
                                fontSize: '0.75rem',
                                padding: 1,
                            }}>
                                <Box>{userDetails.attributes.name}</Box>
                                <Box>{userDetails.attributes.email}</Box>
                            </Box>
                        </Collapse>
                    </Button>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <Box sx={{
                        p: 2,
                        display: 'flex',
                        flexFlow: 'column',
                        alignItems: 'center',
                    }}>
                        <Avatar alt={userDetails.attributes.name} src="/"/>
                        <Box sx={{
                            display: 'flex',
                            flexFlow: 'column',
                            alignItems: 'center',
                            fontSize: '1rem',
                            padding: 1,
                        }}>
                            <Box>{userDetails.attributes.name}</Box>
                            <Box>{userDetails.attributes.email}</Box>
                        </Box>
                    </Box>
                    <MenuItem onClick={() => {
                        handleCloseUserMenu();
                        window.open(`${AUTH_BASE_URL}/user/profile`);
                    }}>
                        <Typography sx={{ textAlign: 'center' }}>{t('common.my_profile')}</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => {
                        handleCloseUserMenu();
                        resetAuthState();
                    }}>
                        <Typography sx={{ textAlign: 'center' }}>{t('common.logout')}</Typography>
                    </MenuItem>
                </Menu>
            </Box>}
        </Toolbar>
    </AppBarStyled>;
};

export default TopNavigation;
