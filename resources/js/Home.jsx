import CardComponent from './components/Card';
import React, { useState } from 'react';
import DiscountForm from './components/DiscountForm';
import { Button } from '@shopify/polaris';
import { PlusIcon } from '@shopify/polaris-icons';
const peoples = [
    { id: 1, content: 'Awais' },
    { id: 2, content: 'Ali' },
    { id: 3, content: 'Ibrahim' },
    { id: 4, content: 'Javaid Iqbal' },
    { id: 5, content: 'Am I Right' },
    { id: 6, content: 'Yes You Are' },
    { id: 7, content: 'I am not sure' },
    { id: 8, content: 'I am not sure either' },
    { id: 9, content: 'I am not sure either' },
    { id: 10, content: 'I am not sure either' },
];
export default function Home() {
    const [showForm, setShowForm] = useState(false);
    return (
        <>
            <div style={{ float: 'right' }}>
                <Button icon={PlusIcon} onClick={() => setShowForm(true)}>Add discount</Button>
            </div>
            {/* <CardComponent peoples={peoples}/> */}
            {showForm && <DiscountForm onCancel={() => setShowForm(false)} />}
        </>
    );
}