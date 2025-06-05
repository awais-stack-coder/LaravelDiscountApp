import React, { useState } from 'react';
import {
    Card,
    FormLayout,
    TextField,
    TextContainer,
    Text,
    Select,
    Form,
    Button,
    InlineError,
} from '@shopify/polaris';
import axiosinstance from '../utils/axiosHandler';

export default function DiscountForm() {
    const [discountType, setDiscountType] = useState('percentage');
    const [title, setTitle] = useState('');
    const [discountValue, setDiscountValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const options = [
        { label: 'Percentage', value: 'percentage' },
        { label: 'Fixed Amount', value: 'fixed' }
    ];

    const validate = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = 'Title is required';
        if (!discountValue) newErrors.discountValue = 'Discount value is required';
        return newErrors;
    };

    const handleSubmit = async () => {
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        setLoading(true);
        try {
            const response = await axiosinstance.post('/create/discount', {
                type: discountType,
                discount: discountValue,
                title: title.trim(),
            });
            shopify.toast.show(response.data.message, { duration: 3000 });

            setTitle('');
            setDiscountValue('');
            setDiscountType('percentage');
            setErrors({});
        } catch (error) {
            console.error('Error creating discount:', error);
            shopify.toast.show(error.response.data.message, { duration: 3000 ,isError: true});
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div style={{ marginTop: 'var(--p-space-500)' }}>
                <TextContainer>
                    <Text variant="headingMd" as="h2">Discounts</Text>
                    <Text tone="subdued" as="p" fontWeight="bold">
                        This discount will be applied on cart and checkout page.
                    </Text>
                </TextContainer>
            </div>
            <Card sectioned>
                <Form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '10px' }}>
                        <FormLayout>
                            <TextField
                                id="Title"
                                label="Title"
                                value={title}
                                onChange={setTitle}
                                placeholder="Enter a title for the discount"
                                autoComplete="off"
                                error={errors.title}
                            />
                        </FormLayout>
                    </div>
                    <FormLayout.Group>
                        <Select
                            label="Discount Type"
                            options={options}
                            value={discountType}
                            onChange={setDiscountType}
                        />
                        <TextField
                            id="discountRule"
                            label="Discount"
                            value={discountValue}
                            prefix={discountType === 'fixed' ? '£' : ''}
                            suffix={discountType === 'percentage' ? '%' : ''}
                            onChange={setDiscountValue}
                            placeholder={discountType === 'percentage' ? 'e.g., 10 for 10%' : 'e.g., 10 for £10'}
                            autoComplete="off"
                            error={errors.discountValue}
                        />
                    </FormLayout.Group>
                    <div style={{ marginTop: '20px' }}>
                        <Button submit primary loading={loading}>
                            Save Discount
                        </Button>
                    </div>
                </Form>
            </Card>
        </>
    );
}
