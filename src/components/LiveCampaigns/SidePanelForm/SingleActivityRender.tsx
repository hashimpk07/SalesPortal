import { Box, Avatar, Typography, Tooltip, Chip } from '@mui/material';
import { DateTime } from 'luxon';

const SingleActivityRender = ({
    singleActivity,
    t,
    userName,
}: {
    singleActivity: any;
    userName: any;
    t: any;
}) => (
    <Box
        key={singleActivity.id}
        sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 4,
        }}
    >
        <Avatar
            sx={{ width: 36, height: 36 }}
            src={singleActivity?.attributes?.createdByAvatar as string}
        />

        <Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                }}
            >
                <Typography variant="body1">
                    {userName}
                    <Chip
                        sx={{
                            ml: 2,
                        }}
                        label={t(
                            'common.source.' +
                                singleActivity?.attributes?.source
                        )}
                    />
                </Typography>

                {singleActivity?.attributes?.createdAt && (
                    <Tooltip
                        title={DateTime.fromISO(
                            singleActivity?.attributes?.createdAt as string
                        ).toLocaleString(DateTime.DATETIME_FULL)}
                    >
                        <Typography variant="body2" color="textSecondary">
                            {DateTime.fromISO(
                                singleActivity?.attributes?.createdAt as string
                            ).toRelative()}
                        </Typography>
                    </Tooltip>
                )}

                {!singleActivity?.attributes?.createdAt && (
                    <Typography variant="body2" color="textSecondary">
                        {t('common.unknown_date')}
                    </Typography>
                )}
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}
            >
                <Typography variant="body2" color="textSecondary">
                    {(singleActivity?.attributes?.activityPlatform as string) ||
                        ''}
                </Typography>
            </Box>
        </Box>
    </Box>
);

export default SingleActivityRender;
