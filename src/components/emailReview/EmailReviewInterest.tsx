import React, { useState } from 'react';
import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import TitleSection from '../common/TitleSection';

const EmailReviewInterest: React.FC = () => {
    const { t } = useTranslation();
    const [name, setName] = useState<string>('');
    const [emailAddress, setEmailAddress] = useState<string>('');
    const [businessName, setBusinessName] = useState<string>('');
    const [commentsInformation, setCommentsInformation] = useState<string>('');

    const [emailReviewThankYou, setEmailReviewThankYou] =
        useState<boolean>(false);

    const submit = () => {
        setEmailReviewThankYou(true);
        // fetch('/api/email-review-request', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         name,
        //         emailAddress,
        //         businessName,
        //         commentsInformation,
        //     }),
        // })
        //     .then((res) => res.json())
        //     .then(() => {
        //         setEmailReviewThankYou(true);
        //     });
    };

    if (emailReviewThankYou) {
        return (
            <Box sx={{ p: 2 }}>
                {/* Title and Subtitle */}
                <TitleSection
                    title={t('email_review.title')}
                    subtitle={t('email_review.title')}
                />
                <Box>
                    {t(
                        'epos_integration.thank_you_for_registering_your_interest'
                    )}
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 2, maxWidth: 800 }}>
            {/* Title and Subtitle */}
            <TitleSection
                title={t('email_review.title')}
                subtitle={t('email_review.title')}
            />
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h6"
                    component="h6"
                    sx={{ fontWeight: 'bold', mb: 3 }}
                >
                    {t('email_review.express_interest')}
                </Typography>

                <Typography variant="body1" component="h6" sx={{ mb: 3 }}>
                    {t('email_review.if_interested_paragraph')}
                </Typography>
            </Box>
            <Box
                sx={{
                    padding: '1rem',
                    border: '1px solid #D1D1D1',
                    borderRadius: '0.25rem',
                    display: 'flex',
                    flexFlow: 'column',
                    gap: 2,
                    mb: 3,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        gap: '1rem',
                        mb: 2,
                        mt: 1,
                    }}
                >
                    <FormControl fullWidth>
                        <TextField
                            label={t('common.name')}
                            id="input-name"
                            placeholder={t(
                                'epos_integration.enter_your_full_name'
                            )}
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <TextField
                            label={t('common.email_address')}
                            type="email"
                            id="input-email-address"
                            placeholder={t(
                                'epos_integration.enter_your_email_address'
                            )}
                            variant="outlined"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                </Box>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                        label={t('epos_integration.business_name')}
                        id="input-business-name"
                        placeholder={t(
                            'epos_integration.enter_your_business_name'
                        )}
                        variant="outlined"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </FormControl>
                <Box sx={{ mb: 2 }}>
                    <FormControl fullWidth>
                        <TextField
                            label={t('email_review.your_message')}
                            id="input-comments-or-additional"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={commentsInformation}
                            onChange={(e) =>
                                setCommentsInformation(e.target.value)
                            }
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                    }}
                >
                    <Button
                        disabled={
                            name === '' ||
                            emailAddress === '' ||
                            businessName === ''
                        }
                        onClick={() => submit()}
                        color="info"
                        variant="contained"
                    >
                        {t('common.submit')}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default EmailReviewInterest;
