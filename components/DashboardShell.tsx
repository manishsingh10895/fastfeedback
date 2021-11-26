import { Avatar } from '@chakra-ui/avatar';
import { PhoneIcon } from '@chakra-ui/icons';
import { Flex, Link, Stack } from '@chakra-ui/layout';
import { useRouter } from 'next/dist/client/router';
import NextLink from 'next/link';
import React from 'react';
import { useAuth } from '../lib/auth';

type Props = {
    children?: React.ReactNode,
    name?: string
}

export default function DashboardShell(props: Props) {
    const auth = useAuth();
    const router = useRouter();

    ///Capitalize path name from router.pathname set a variable name
    const name = router.pathname.replace('/', '').charAt(0).toUpperCase() + router.pathname.slice(2);

    return (
        <>
            <Flex flexDirection="column">
                <Flex
                    flexDirection="column"
                    p={4}
                >
                    <Flex width="100%" padding="0rem 0.5rem"
                        mb={"0.5rem"}
                        justifyContent="space-between">
                        <Stack isInline alignItems="center" spacing={4}>
                            <PhoneIcon></PhoneIcon>
                            <NextLink passHref href="/sites">
                                <Link>My Sites</Link>
                            </NextLink>
                            <NextLink href="/feedback" passHref>
                                <Link>FeedBack</Link>
                            </NextLink>
                        </Stack>

                        {
                            auth.user && (
                                <Flex alignItems="center">
                                    <Link onClick={async () => {
                                        router.push('/account');
                                    }} mr={4}>My Account</Link>
                                    <Avatar size="sm" src={auth?.user?.photoURL}></Avatar>
                                </Flex>
                            )
                        }
                    </Flex>

                    <Flex backgroundColor="gray.600" p={8} height={'100vh'}>
                        <Flex maxWidth="800px"
                            ml="auto"
                            mr="auto"
                            width="100%"
                            flexDirection="column"
                        >
                            {props.children}
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}
