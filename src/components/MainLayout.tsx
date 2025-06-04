import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Toolbar, CssBaseline } from '@mui/material';
import Automations from '../pages/Automations.tsx';
import EmailReviewInterest from './emailReview/EmailReviewInterest.tsx';
import LiveCampaigns from '../pages/LiveCampaigns.tsx';
import SelectCampaigns from '../pages/Campaigns.tsx';
import ChaseStores from '../pages/ChaseStores.tsx';
import Chase from '../pages/ChaseList.tsx';
import RetailerData from '../pages/RetailerData.tsx';
import EmailSubmissionsInReview from '../pages/emailReview/EmailSubmissionsInReview.tsx';
import EmailSubmissionsPending from '../pages/emailReview/EmailSubmissionsPending.tsx';
import EPOSIntegration from '../pages/EPOSIntegration.tsx';
import { DashboardPage } from '../pages/index.ts';
// import ChaseCentre from './pages/ChaseCentre.tsx';
import {
    API_BASE_URL,
    API_VERSION,
    DRAWER_WIDTH,
    GET_TENANCY_PATH,
    STANDARD,
    CERTIFIED,
} from '../constants/index.ts';
import SelectTenancy from '../pages/auth/SelectTenancy.tsx';
import userStore from '../store/userStore.ts';
import TopNavigation from './layout/TopNavigation.tsx';
import PropertyManagementNavigation from './layout/PropertyManagementNavigation.tsx';
import StoreManagerNavigation from './layout/StoreManagerNavigation.tsx';
import fetchData from '../services/fetchData.ts';
import UploadCSVSales from '../pages/UploadCSVSales.tsx';
import MUIFormBuilderIndex from './MUIFormBuilder/MUIFormBuilderIndex.tsx';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: DRAWER_WIDTH,
    },
    drawer: {
        width: DRAWER_WIDTH,
        flexShrink: 0,
    },
    drawerPaper: {
        width: DRAWER_WIDTH,
    },
    content: {
        flexGrow: 1,
        padding: 3,
        minWidth: 0,
    },
}));

const MainLayout: React.FC = () => {
    const { tenancy, userDetails, userType, setUserDetails } = userStore();

    useEffect(() => {
        if (!userDetails && tenancy) {
            fetchData({
                path: `${API_BASE_URL}/${API_VERSION}/users/current`,
            }).then((r) => {
                setUserDetails(r.data);
            });
        }
    }, [userDetails, tenancy, setUserDetails]);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />

            <TopNavigation />

            {userType === 'cmsUsers' && tenancy && (
                <PropertyManagementNavigation />
            )}
            {userType === 'profiles' && tenancy && <StoreManagerNavigation />}

            <main className={classes.content}>
                <Toolbar />
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/dashboard" replace />}
                    />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route
                        path="/campaigns"
                        element={<SelectCampaigns campaignType={STANDARD} />}
                    />
                    <Route
                        path="/campaign/:id"
                        element={<LiveCampaigns campaignType={STANDARD} />}
                    />
                    <Route
                        path="/upload-via-csv/:id"
                        element={<UploadCSVSales />}
                    />
                    <Route path="/chase" element={<Chase />} />
                    <Route path="/chase/:id" element={<ChaseStores />} />
                    <Route
                        path="/certified-sales"
                        element={<SelectCampaigns campaignType={CERTIFIED} />}
                    />
                    <Route
                        path="/certified-campaign/:id"
                        element={<LiveCampaigns campaignType={CERTIFIED} />}
                    />
                    <Route
                        path={GET_TENANCY_PATH}
                        element={<SelectTenancy />}
                    />
                    <Route path="/automations" element={<Automations />} />

                    <Route path="/retailer-data" element={<RetailerData />} />
                    <Route
                        path="/email-review/in-review"
                        element={<EmailSubmissionsInReview />}
                    />
                    <Route
                        path="/email-review/interested"
                        element={<EmailReviewInterest />}
                    />
                    <Route
                        path="/email-review/pending"
                        element={<EmailSubmissionsPending />}
                    />
                    <Route
                        path="/epos-integration"
                        element={<EPOSIntegration />}
                    />

                    <Route
                        path="/form-builder"
                        element={<MUIFormBuilderIndex />}
                    />
                    {/* Add other routes here */}
                </Routes>
            </main>
        </div>
    );
};

export default MainLayout;
