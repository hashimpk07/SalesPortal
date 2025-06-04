import {
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Dialog,
    IconButton,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';

export interface ChaseViewContactsProp {
    open: boolean;
    contacts: ContactProps[];
    onClose: () => void;
}

export default function ChaseViewContacts(props: ChaseViewContactsProp) {
    const { onClose, open, contacts } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <List sx={{ p: 1 }}>
                {contacts.map((contact) => (
                    <ListItem sx={{ p: 2 }} disableGutters key={contact.name}>
                        <ListItemAvatar>
                            <Avatar
                                alt={contact.name}
                                src={contact.avatar || 'fail'}
                            >
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>

                        <ListItemText
                            primary={contact.name}
                            secondary={contact.email}
                        />

                        <IconButton
                            onClick={() => {
                                window.open(`mailto://${contact.email}`);
                            }}
                        >
                            <EmailIcon />
                        </IconButton>

                        <IconButton
                            onClick={async () => {
                                const type = 'text/plain';
                                const blob = new Blob([contact.email], {
                                    type,
                                });
                                const data = [
                                    new ClipboardItem({ [type]: blob }),
                                ];
                                await navigator.clipboard.write(data);
                            }}
                        >
                            <CopyIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}
