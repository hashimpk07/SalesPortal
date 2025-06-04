import { useEffect, useState } from 'react';
// eslint-disable-next-line import/named
import { TFunction } from 'i18next';
import axios from 'axios';
import RenderFormLayout from './components/RenderFormLayout.tsx';
import FormInputProp from './FormInputProp.ts';
import { isFormValid, showField } from './validation.ts';
import { API_BASE_URL, API_VERSION } from '../../constants';
import { getSumField, getTaxFieldValue } from "./extraFieldsMaths.tsx";

const INPUT_WITHOUT_DATA = ['header', 'subheader', 'itext'];

interface FormBuilderProps {
    form: FormInputProp[];
    centreConfig: any;
    centreId: number;
    currentData?: any;
    t: TFunction;
}

const FormBuilder = ({
    form,
    currentData,
    centreConfig,
    centreId,
    t,
}: FormBuilderProps) => {
    const [data, setData] = useState<any>({});
    const [formDirty, setFormDirty] = useState<boolean>(false);

    // eslint-disable-react-hooks/exhaustive-deps
    useEffect(() => {
        setData({});

        let newData: any = {};
        form.forEach((input) => {
            if (!INPUT_WITHOUT_DATA.includes(input.type) && input?.name) {
                if (currentData && Object.keys(currentData).length > 0 && currentData[input?.name]) {
                    newData[input.name] = currentData[input?.name];
                } else if (input.type === 'hidden-input') {
                    newData[input.name] = input.value || '';
                } else if (input.type === 'checkbox-group') {
                    newData[input.name] = [];
                } else if (
                    input.type === 'radio-group-dynamic-fields' &&
                    input?.defaultOption !== 'None'
                ) {
                    newData[input.name] = input?.defaultOption;
                } else if (
                    input.type === 'checkbox-dynamic-fields' &&
                    input?.defaultState === 'ticked'
                ) {
                    newData[input.name] = input?.name;
                } else if (
                    input.type === 'checkbox-dynamic-fields'
                ) {
                    newData[input.name] = [];
                } else if (input.type === 'multi-attachment') {
                    newData[input.name] = [];
                } else {
                    newData[input.name] = '';
                }
            }
        });

        setData(newData);
    }, [currentData]);

    const runValidateForm = () => {
        setFormDirty(true);

        return isFormValid(form, data);
    };

    const isValid = () => isFormValid(form, data);

    const RenderForm = () => {
        return (
            <RenderFormLayout
                form={form}
                data={data}
                centreConfig={centreConfig}
                translations={t}
                formDirty={formDirty}
                handleUpdateValue={(value, key) => {
                    setData({
                        ...data,
                        [key]: value,
                    });
                }}
            />
        );
    };

    const uploadFile = async (fileData: any) => {
        if (fileData?.type === 'media' && fileData.id) {
            return fileData;
        }

        const uploadFileData = {
            data: {
                type: 'media',
                attributes: {
                    name: fileData.fileObject.name,
                    mediaType: 'salesCollectionAttachment',
                    accessControl: 'private',
                    content: fileData.fileData,
                },
                relationships: {
                    centre: {
                        data: {
                            type: 'centres',
                            id: centreId,
                        },
                    },
                },
            },
        };

        const response = await axios({
            url: `${API_BASE_URL}/${API_VERSION}/media?include=centre`,
            method: 'POST',
            data: uploadFileData,
            headers: {
                'Auth-Token-Provider': 'gateway-api',
            },
        });

        if (response.status === 200) {
            return {
                type: 'media',
                id: response.data.data.id,
            };
        }

        return false;
    };

    const prepareDataToSubmit = async () => {
        let submittableData: { [key: string]: any } = {};
        for (const input of form) {
            if (input?.name && showField(input, form, data)) {
                // @TODO HANDLE FILE UPLOAD
                if (input?.type === 'attachment') {
                    if (!data[input?.name]) continue;

                    const result = await uploadFile(data[input?.name]);
                    if (result) {
                        submittableData[input?.name] = result;
                    } else {
                        throw new Error('failed to upload image');
                    }
                } else if (input?.type === 'multi-attachment') {
                    if (!data[input?.name] && typeof data[input?.name] !== "object") {
                        submittableData[input?.name] = [];
                        continue;
                    }

                    const multiAttach = []
                    const inputValues = Object.values(data[input.name])
                    for (const file of inputValues) {
                        if (!file) continue;

                        const result = await uploadFile(file);
                        if (result) {
                            multiAttach.push(result);
                        } else {
                            throw new Error('failed to upload image');
                        }
                    }
                    submittableData[input?.name] = multiAttach;
                } else if (input?.type === 'tax-field-input') {
                    submittableData[input?.name] = getTaxFieldValue(input, data)
                } else if (input?.type === 'sum-field-input') {
                    submittableData[input?.name] = getSumField(input, data)
                } else {
                    submittableData[input?.name] = data[input?.name];
                }
            }
        }

        return submittableData;
    };

    return {
        RenderForm,
        form,
        runValidateForm,
        isValid,
        formDirty,
        setFormDirty,
        prepareDataToSubmit,
    };
};

export default FormBuilder;
