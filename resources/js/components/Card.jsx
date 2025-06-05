import { BlockStack, Card, List, Text } from '@shopify/polaris';
import React from 'react';

export default function CardComponent({peoples}) {
    const listItems = peoples.map((person) => (
        <List.Item key={person.id}>
            {person.content}
        </List.Item>
    ));
    return (
        <Card background="bg-surface-secondary">
            <BlockStack gap="200">
                <Text as="h2" variant="headingSm" fontWeight="medium">
                    Deactivated staff accounts
                </Text>
                <List>{listItems}</List>
            </BlockStack>
        </Card>
    );
}