import React from 'react';
import {
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
} from '@mui/material';
import { Link } from 'react-router-dom';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useTranslation } from 'react-i18next';
// import CardMembershipIcon from '@mui/icons-material/CardMembership';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import userStore from '../../store/userStore.ts';
import { DrawerStyled } from './PropertyManagementNavigation.tsx';
import UserTenancyNavigationSection from './UserTenancyNavigationSection.tsx';

const StoreManagerNavigation: React.FC = () => {
    const { t } = useTranslation();
    const { tenancy } = userStore();

    const isActive = (path: string) => location.pathname === path;

    return (
        <DrawerStyled variant="permanent">
            {tenancy && (
                <List>
                    <UserTenancyNavigationSection />
                    <Divider sx={{ ml: 2, mr: 2 }} />
                    <ListSubheader component="div" id="nested-section-1">
                        {t('sections.upload')}
                    </ListSubheader>
                    <ListItemButton
                        component={Link}
                        to="/sales"
                        selected={isActive('/sales')}
                    >
                        <ListItemIcon>
                            <AttachMoneyIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('common.sales')} />
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
                    <Divider />
                    {/*<ListSubheader component="div" id="nested-section-1">*/}
                    {/*    {t('sections.more')}*/}
                    {/*</ListSubheader>*/}
                    {/*<ListItemButton component={Link} to="/epos-integration" selected={isActive('/epos-integration')}>*/}
                    {/*    <ListItemIcon>*/}
                    {/*        <CardMembershipIcon/>*/}
                    {/*    </ListItemIcon>*/}
                    {/*    <ListItemText primary={t('epos_integration.title')}/>*/}
                    {/*</ListItemButton>*/}
                </List>
            )}
        </DrawerStyled>
    );
};

export default StoreManagerNavigation;
