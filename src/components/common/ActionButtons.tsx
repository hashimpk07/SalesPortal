import { IconButton, Button, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import UploadIcon from '@mui/icons-material/Upload';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CloudSyncOutlinedIcon from '@mui/icons-material/CloudSyncOutlined';
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

interface ButtonProps {
    handleClick: () => void;
    tooltipText?: string;
}

export const AddSalesDataButton = ({
    handleClick,
    tooltipText,
}: ButtonProps) => (
    <Tooltip title={tooltipText || null}>
        <IconButton onClick={handleClick} color="inherit">
            <AddBoxOutlinedIcon />
        </IconButton>
    </Tooltip>
);

export const EditSalesDataButton = ({
    handleClick,
    tooltipText,
}: ButtonProps) => (
    <Tooltip title={tooltipText || null}>
        <IconButton onClick={handleClick} color="inherit">
            <LibraryAddOutlinedIcon />
        </IconButton>
    </Tooltip>
);

export const EditButton = ({ handleClick, tooltipText }: ButtonProps) => (
    <Tooltip title={tooltipText || null}>
        <IconButton onClick={handleClick} color="inherit">
            <EditIcon />
        </IconButton>
    </Tooltip>
);

export const CloudPushButton = ({ handleClick, tooltipText }: ButtonProps) => (
    <Tooltip title={tooltipText || null}>
        <Button
            onClick={handleClick}
            variant="contained"
            color="inherit"
            size="small"
            startIcon={<CloudUploadOutlinedIcon />}
        >
            Push
        </Button>
    </Tooltip>
);

export const PushButton = ({ handleClick, tooltipText }: ButtonProps) => (
    <Tooltip title={tooltipText || null}>
        <Button
            onClick={handleClick}
            variant="contained"
            color="inherit"
            size="small"
            startIcon={<UploadIcon />}
        >
            Push
        </Button>
    </Tooltip>
);

export const SyncCloudButton = ({ handleClick, tooltipText }: ButtonProps) => (
    <Tooltip title={tooltipText || null}>
        <IconButton onClick={handleClick} color="inherit">
            <CloudSyncOutlinedIcon />
        </IconButton>
    </Tooltip>
);

export const SyncButton = ({ handleClick, tooltipText }: ButtonProps) => (
    <Tooltip title={tooltipText || null}>
        <IconButton onClick={handleClick} color="inherit">
            <SyncOutlinedIcon />
        </IconButton>
    </Tooltip>
);

export const TickCloudButton = ({ handleClick, tooltipText }: ButtonProps) => (
    <Tooltip title={tooltipText || null}>
        <IconButton onClick={handleClick} color="inherit">
            <CloudDoneOutlinedIcon />
        </IconButton>
    </Tooltip>
);

export const TickButton = ({ handleClick, tooltipText }: ButtonProps) => (
    <Tooltip title={tooltipText || null}>
        <IconButton onClick={handleClick} color="inherit">
            <CheckBoxOutlinedIcon />
        </IconButton>
    </Tooltip>
);
