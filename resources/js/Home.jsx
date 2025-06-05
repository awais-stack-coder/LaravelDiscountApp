import CardComponent from './components/Card';
import React from 'react';
import DiscountForm from './components/DiscountForm';
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
    return (
        <>
            {/* <CardComponent peoples={peoples}/> */}
            <DiscountForm />
        </>
    );
}