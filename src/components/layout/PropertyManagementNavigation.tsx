import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
    Collapse,
    Divider,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
} from '@mui/material';
import { Link } from 'react-router-dom';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import StoreIcon from '@mui/icons-material/Store';
// import CardMembershipIcon from '@mui/icons-material/CardMembership';
import { useTranslation } from 'react-i18next';
import {
    ExpandLess,
    ExpandMore,
    Email,
    HourglassBottom,
    Checklist,
    ScheduleSend,
} from '@mui/icons-material';
import userStore from '../../store/userStore.ts';
import { DRAWER_WIDTH } from '../../constants';
import UserTenancyNavigationSection from './UserTenancyNavigationSection.tsx';

const DrawerStyled = styled(Drawer)(({ theme }) => ({
    width: DRAWER_WIDTH,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: DRAWER_WIDTH,
        top: theme.mixins.toolbar.minHeight,
        height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
        border: 0,
    },
}));

const PropertyManagementNavigation: React.FC = () => {
    const { tenancy } = userStore();
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

    const [emailReviewEnabled, setEmailReviewEnabled] = useState(true);

    const handleClick = () => {
        setEmailReviewEnabled(true);
        setOpen(!open);
    };
    const isActive = (path: string) => location.pathname === path;

    return (
        <DrawerStyled variant="permanent">
            {tenancy && (
                <List>
                    <UserTenancyNavigationSection />
                    <Divider />
                    <ListSubheader component="div" id="nested-section-1">
                        {t('sections.home')}
                    </ListSubheader>
                    <ListItemButton
                        component={Link}
                        to="/dashboard"
                        selected={isActive('/dashboard')}
                    >
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('common.dashboard')} />
                    </ListItemButton>
                    <Divider />
                    <ListSubheader component="div" id="nested-section-1">
                        {t('sections.collection')}
                    </ListSubheader>
                    <ListItemButton
                        component={Link}
                        to="/campaigns"
                        selected={isActive('/campaigns')}
                    >
                        <ListItemIcon>
                            <SlideshowIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('common.campaigns')} />
                    </ListItemButton>
                    <ListItemButton
                        component={Link}
                        to="/certified-sales"
                        selected={isActive('/certified-sales')}
                    >
                        <ListItemIcon>
                            <ReceiptLongIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('certified_sales.title')} />
                    </ListItemButton>
                    <ListItemButton
                        component={Link}
                        to="/chase"
                        selected={isActive('/chase')}
                    >
                        <ListItemIcon>
                            <AddAlertIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('chase.title')} />
                    </ListItemButton>
                    <ListItemButton
                        component={Link}
                        to="/automations"
                        selected={isActive('/automations')}
                    >
                        <ListItemIcon>
                            <ScheduleSend />
                        </ListItemIcon>
                        <ListItemText primary={t('sections.automation')} />
                    </ListItemButton>
                    <Divider />
                    {/* <ListSubheader component="div" id="nested-section-2">
                        {t('sections.retailers')}
                    </ListSubheader> */}
                    {/* <ListItemButton
                        component={Link}
                        to="/retailer-data"
                        selected={isActive('/retailer-data')}
                    >
                        <ListItemIcon>
                            <StoreIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('retailer_data.title')} />
                    </ListItemButton> */}
                    {/* <Divider /> */}
                    <ListSubheader component="div" id="nested-section-3">
                        {t('common.email')}
                    </ListSubheader>
                    {!emailReviewEnabled && (
                        <ListItemButton
                            component={Link}
                            to="/email-review/interested"
                            selected={isActive('/email-review/interested')}
                        >
                            <ListItemIcon>
                                <Email />
                            </ListItemIcon>
                            <ListItemText
                                primary={t('navigation.email_submissions')}
                            />
                        </ListItemButton>
                    )}
                    {emailReviewEnabled && (
                        <>
                            <ListItemButton onClick={handleClick}>
                                <ListItemIcon>
                                    <Email />
                                </ListItemIcon>
                                <ListItemText
                                    primary={t('navigation.email_submissions')}
                                />
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton
                                        sx={{ pl: 4 }}
                                        component={Link}
                                        to="/email-review/pending"
                                        selected={isActive(
                                            '/email-review/pending'
                                        )}
                                    >
                                        <ListItemIcon>
                                            <HourglassBottom />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={t('common.pending')}
                                        />
                                    </ListItemButton>
                                    <ListItemButton
                                        sx={{ pl: 4 }}
                                        component={Link}
                                        to="/email-review/in-review"
                                        selected={isActive(
                                            '/email-review/in-review'
                                        )}
                                    >
                                        <ListItemIcon>
                                            <Checklist />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={t('common.in_review')}
                                        />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                        </>
                    )}
                    <Divider />
                    {/*<ListSubheader component="div" id="nested-section-4">*/}
                    {/*    {t('sections.integrations')}*/}
                    {/*</ListSubheader>*/}
                    {/*<ListItemButton*/}
                    {/*    component={Link}*/}
                    {/*    to="/epos-integration"*/}
                    {/*    selected={isActive('/epos-integration')}*/}
                    {/*>*/}
                    {/*    <ListItemIcon>*/}
                    {/*        <CardMembershipIcon />*/}
                    {/*    </ListItemIcon>*/}
                    {/*    <ListItemText primary={t('epos_integration.title')} />*/}
                    {/*</ListItemButton>*/}
                </List>
            )}
        </DrawerStyled>
    );
};

export default PropertyManagementNavigation;

export { DrawerStyled };
