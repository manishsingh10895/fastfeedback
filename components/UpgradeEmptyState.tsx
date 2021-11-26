import { Flex, Heading, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useAuth } from '../lib/auth';
import { createCheckoutSession } from '../lib/db';
import ActionButton from './ActionButton';
import AddSiteModal from './AddSiteModal'

export default function UpgradeEmptyState() {
    const [loading, setLoading] = useState(false);

    const { user } = useAuth();

    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            flexDirection='column'
            width="100%" borderRadius="8px" p={8} backgroundColor="gray.800">
            <Heading size="md">
                {"You Haven't added any sites yet"}
            </Heading>

            <Text padding={"1rem 0"}>
                {"Welcome, Let's get started by adding your first site."}
            </Text>

            <ActionButton
                isLoading={loading}
                mr={5}
                onClick={async () => {
                    setLoading(true);
                    try {
                        await createCheckoutSession(user.uid);
                    } catch (error) {
                        console.error(error);
                    } finally {
                        setLoading(false);
                    }
                }}
            >
                Upgrade to starter
            </ActionButton>
        </Flex >)
}
