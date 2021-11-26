import Page from '@/components/Page';
import { useAuth } from '@/lib/auth';
import { Avatar, Badge, Box, Button, Flex, Heading, Stat, StatGroup, StatHelpText, StatLabel, StatNumber, Text } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import ActionButton from '../components/ActionButton';
import DashboardShell from '../components/DashboardShell';
import { getToBillingPortal } from '../lib/db';

const FeedbackUsage = () => (
    <StatGroup color="white">
        <Stat>
            <StatLabel>Feedback</StatLabel>
            <StatNumber fontWeight="medium">∞</StatNumber>
            <StatHelpText>10,000 limit</StatHelpText>
        </Stat>

        <Stat>
            <StatLabel>Sites</StatLabel>
            <StatNumber fontWeight="medium">1/∞</StatNumber>
            <StatHelpText>Unlimited Sites</StatHelpText>
        </Stat>
    </StatGroup>
);


function SettingsTable({ stripeRole, children }) {
    return (
        <Box
            backgroundColor="gray.900"
            mt={8}
            color="white"
            borderRadius={[0, 8, 8]}
            boxShadow="0px 4px 10px rgba(0, 0, 0, 0.05)"
        >
            <Flex
                backgroundColor="gray.500"
                borderTopLeftRadius={[0, 8, 8]}
                borderTopRightRadius={[0, 8, 8]}
                borderBottom="1px solid"
                borderBottomColor="gray.200"
                px={6}
                py={4}
            >
                <Flex justify="space-between" align="center" w="full">
                    <Text textTransform="uppercase"
                        fontSize="xs"
                        color="gray.50"
                        fontWeight="medium"
                        mt={1}
                    >
                        Settings
                    </Text>

                    <Badge h={'1rem'} colorScheme="blue">
                        {stripeRole}
                    </Badge>
                </Flex>
            </Flex>
            <Flex direction="column" p={6}>
                {children}
            </Flex>
        </Box >
    );
}

// function redenrs() {
//     return <>
//         <Box display="flex" alignItems="center" >
//             <ActionButton
//                 isLoading={loading}
//                 mr={5}
//                 onClick={async () => {
//                     setLoading(true);
//                     try {
//                         await createCheckoutSession(user.uid);
//                     } catch (error) {
//                         console.error(error);
//                     } finally {
//                         setLoading(false);
//                     }
//                 }}
//             >
//                 Upgrade to starter
//             </ActionButton>

//             <ActionButton
//                 isLoading={billingLoading}
//                 onClick={async () => {
//                     setBillingLoading(true);
//                     try {
//                         await getToBillingPortal();
//                     } catch (error) {
//                         console.error(error);
//                     } finally {
//                         setBillingLoading(false);
//                     }
//                 }}
//             >
//                 View Billing Portal
//             </ActionButton>

//             <Button
//                 ml={5}
//                 onClick={async () => {
//                     await signout();
//                     router.push('/');
//                 }}>
//                 Logout
//             </Button>
//         </Box></>
// }

export default function Account() {
    const { user, signinWithGithub, signout } = useAuth();

    const [loading, setLoading] = useState(false);

    const [billingLoading, setBillingLoading] = useState(false);

    const router = useRouter();

    return (
        <Page name="Account">
            <DashboardShell>
                <Flex direction="column" maxW="600px"
                    align={['left', 'center']}
                    margin="0 auto"
                >
                    <Flex direction="column" align={['left', 'center']} ml={4}>
                        <Avatar w={['3rem', '6rem']}
                            h={['3rem', '6rem']}
                            mb={4}
                            src={user?.photoURL}
                        />
                        <Heading letterSpacing={'-1px'}>{user?.displayName}</Heading>
                        <Text>
                            {user?.email}
                        </Text>
                    </Flex>
                </Flex>
                <SettingsTable stripeRole={user?.stripeRole}>
                    <FeedbackUsage />
                    <Text my={4}>
                        Fast Feedback uses Stripe to update, change, or cancel your
                        subscription. You can also update card information and billing
                        addresses through the secure portal.
                    </Text>
                    <Flex justify="flex-end" alignItems="center">
                        <Button
                            colorScheme="whiteAlpha"
                            color="white"
                            ml={5}
                            mr={10}
                            onClick={async () => {
                                await signout();
                                router.push('/');
                            }}>
                            Logout
                        </Button>

                        <ActionButton
                            color="gray.800"
                            backgroundColor="gray.300"
                            isLoading={billingLoading}
                            onClick={async () => {
                                setBillingLoading(true);
                                try {
                                    await getToBillingPortal();
                                } catch (error) {
                                    console.error(error);
                                } finally {
                                    setBillingLoading(false);
                                }
                            }}
                        >
                            View Billing Portal
                        </ActionButton>
                    </Flex>
                </SettingsTable>

            </DashboardShell >
        </Page>
    )
}
