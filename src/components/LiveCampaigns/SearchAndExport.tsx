import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, CircularProgress, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import useMainStore from '../../store';

interface SearchAndExportProps {
    handleUploadCSv: (e: FileList | null) => void;
    getDownloadCSV: () => void;
    handleExportData: () => void;
    displayDownloadCsv: boolean;
    uploadingCSV: boolean;
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const SearchAndExport: React.FC<SearchAndExportProps> = ({
    handleUploadCSv,
    getDownloadCSV,
    handleExportData,
    displayDownloadCsv = false,
    uploadingCSV = false,
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { resetFilters } = useMainStore();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 4,
            }}
        >
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                    variant="contained"
                    color="inherit"
                    onClick={() => {
                        resetFilters();
                        navigate(-1);
                    }}
                >
                    {t('retailer_data.buttons.back')}
                </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
                <Tooltip
                    title={t('upload_sales.please_select_collection_dates')}
                    arrow
                    disableHoverListener={displayDownloadCsv}
                >
                    <span>
                        <Button
                            variant="contained"
                            color="inherit"
                            onClick={() => handleExportData()}
                            disabled={!displayDownloadCsv}
                        >
                            {t('retailer_data.buttons.export_data')}
                        </Button>
                    </span>
                </Tooltip>

                <Tooltip
                    title={t('upload_sales.please_select_collection_dates')}
                    arrow
                    disableHoverListener={displayDownloadCsv}
                >
                    <span>
                        <Button
                            variant="contained"
                            color="inherit"
                            onClick={() => {
                                getDownloadCSV();
                            }}
                            disabled={!displayDownloadCsv}
                        >
                            {t('retailer_data.buttons.download_csv')}
                        </Button>
                    </span>
                </Tooltip>

                {uploadingCSV && <CircularProgress />}

                {!uploadingCSV && (
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        color="inherit"
                        tabIndex={-1}
                    >
                        {t('retailer_data.buttons.upload_via_csv')}
                        <VisuallyHiddenInput
                            type="file"
                            onChange={(event) => {
                                handleUploadCSv(event.target.files);
                            }}
                            accept="text/csv"
                        />
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default SearchAndExport;
