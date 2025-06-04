import { Box } from '@mui/material';
import TableMediaButton from './TableMediaButton.tsx';

const renderAttachmentCell = (row: any) => {
    if (!row?.attributes?.formStructure || !row?.formData?.salesData) {
        return <Box />;
    }

    const attachments: any[] = [];

    row?.attributes?.formStructure.forEach((input: any) => {
        if (input.type === 'attachment') {
            if (row?.formData?.salesData[input.name]) {
                attachments.push(
                    <TableMediaButton
                        key={input.name}
                        media={row?.formData?.salesData[input.name]}
                    />
                );
            }
        } else if (input.type === 'multi-attachment') {
            if (
                row?.formData?.salesData[input.name] &&
                Object.values(row?.formData?.salesData[input.name])
            ) {
                Object.values(row?.formData?.salesData[input.name]).forEach(
                    (attach: any) => {
                        attachments.push(
                            <TableMediaButton key={input.name} media={attach} />
                        );
                    }
                );
            }
        }
    });

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 1,
                height: '100%',
                alignItems: 'center',
            }}
        >
            {attachments.map((attachment) => attachment)}
        </Box>
    );
};

const numberOfAttachments = (row: any) => {
    if (!row?.attributes?.formStructure || !row?.formData?.salesData) return 0;

    let noOfAttachments = 0;

    row?.attributes?.formStructure.forEach((input: any) => {
        if (input.type === 'attachment') {
            if (row?.formData?.salesData[input.name]) {
                noOfAttachments += 1;
            }
        } else if (input.type === 'multi-attachment') {
            if (
                row?.formData?.salesData[input.name] &&
                Object.values(row?.formData?.salesData[input.name])
            ) {
                noOfAttachments += Object.values(
                    row?.formData?.salesData[input.name]
                ).length;
            }
        }
    });

    return noOfAttachments;
};

export { renderAttachmentCell, numberOfAttachments };
