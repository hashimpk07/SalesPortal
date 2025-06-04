import * as React from 'react';
import {
    Card as MUICard,
    CardHeader,
    CardContent,
    Switch,
    FormGroup,
    FormControlLabel,
    FormControl,
    Grid,
    Divider,
    Typography,
} from '@mui/material';

interface CardBoxProps {
    width?: number;
    title: string;
    children: React.ReactElement;
    toggleAction?: () => any;
    checked?: boolean;
    height?: number;
    headerHeight?: number;
    displayDivider?: boolean;
    toggleLabel?: string;
    isDisabled?: boolean;
}

const CardBox: React.FC<CardBoxProps> = ({
    title,
    toggleAction,
    children,
    checked,
    height = 100,
    headerHeight = 40,
    displayDivider = false,
    toggleLabel = null,
    isDisabled = false,
}) => {
    return (
        <Grid>
            <MUICard
                variant="outlined"
                sx={{
                    width: '100%',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: height,
                    position: 'relative',
                }}
            >
                <CardHeader
                    action={
                        toggleAction && (
                            <FormControl component="fieldset">
                                <FormGroup aria-label="position" row>
                                    <FormControlLabel
                                        value="end"
                                        control={
                                            <Switch
                                                checked={checked}
                                                onChange={toggleAction}
                                                color="primary"
                                                sx={{}}
                                            />
                                        }
                                        sx={{ fontSize: 10 }}
                                        label={
                                            <Typography
                                                variant="body1"
                                                component="span"
                                            >
                                                {toggleLabel}
                                            </Typography>
                                        }
                                        labelPlacement="start"
                                    />
                                </FormGroup>
                            </FormControl>
                        )
                    }
                    sx={{
                        height: headerHeight,
                        alignItems: 'center',
                        paddingBottom: 1,
                        fontSize: '1rem',
                        '.MuiCardHeader-subheader': {
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            color: isDisabled ? 'darkgrey' : 'black',
                        },
                    }}
                    subheader={title}
                />
                {displayDivider && <Divider />}
                <CardContent
                    sx={{
                        m: 0,
                        paddingTop: 1,
                        height: `${height - headerHeight}`,
                    }}
                >
                    {children}
                </CardContent>
            </MUICard>
        </Grid>
    );
};

export default CardBox;
