import React from 'react';
import { Box, Typography } from '@mui/material';

interface ProgressBarProps {
    value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => (
    <Box>
        <Typography variant="body2">{value}%</Typography>
        <Box
            sx={{
                width: '100%',
                height: 10,
                backgroundColor: 'lightgray',
                position: 'relative',
                borderRadius: 1,
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    width: `${value}%`,
                    height: '100%',
                    backgroundColor: 'green',
                }}
            />
        </Box>
    </Box>
);

export default ProgressBar;
