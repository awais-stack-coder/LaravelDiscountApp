import React from 'react';
import { AppProvider, Page } from '@shopify/polaris';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import enTranslations from '@shopify/polaris/locales/en.json';
import '@shopify/polaris/build/esm/styles.css';
// import DiscountForm from './components/DiscountForm';

import Home from './Home';

export default function AppWrapper() {
    return (
        <AppProvider i18n={enTranslations}>
            <Page >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
            </Page>
        </AppProvider>
    );
};

 AppWrapper;