import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Route, Routes } from 'react-router-dom';
import SelectAuth from '../pages/auth/SelectAuth.tsx';
import SSOCallback from '../pages/auth/SSOCallback.tsx';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        backgroundColor: '#F5F5F5',
    },
    content: {
        flexGrow: 1,
        padding: 3,
    },
}));

const AuthLayout: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100vh',
                    background:
                        'linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(/background_image.png) lightgray 50% / cover no-repeat',
                }}
            >
                <Box
                    component="main"
                    sx={{
                        background: 'white',
                        borderRadius: '0.5rem',
                        boxShadow: '0px 0px 30px 0px rgba(89, 28, 105, 0.15)',
                        maxWidth: '60vw',
                        minWidth: '30vw',
                        padding: '5.25rem 3rem',
                    }}
                >
                    <img
                        src="/logoPurple.svg"
                        alt="Logo"
                        style={{
                            height: '3.5rem',
                            marginBottom: '2rem',
                            textAlign: 'center',
                            width: '100%',
                        }}
                    />
                    <Box>
                        <Routes>
                            <Route
                                path="/select-login"
                                element={<SelectAuth />}
                            />
                            <Route
                                path="/sso/callback"
                                element={<SSOCallback />}
                            />
                        </Routes>
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default AuthLayout;
