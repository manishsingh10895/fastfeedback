import { SiteSettings } from '@/lib/models/site.model';
import { Box, Divider, Flex, Heading } from '@chakra-ui/layout'
import { Text } from '@chakra-ui/react';
import React from 'react'
import { FaGithub, FaGoogle, FaMailBulk } from 'react-icons/fa';
import { formatDate } from '../utils/time';

type Props = {
    author: string,
    text: string,
    settings: SiteSettings,
    provider: string,
    createdAt: string,
    isLast?: boolean
}

export default function Feedback(props: Props) {
    let providerIcon: JSX.Element;

    const { isLast } = props;

    switch (props.provider.slice(0, -4)) {
        case 'github':
            providerIcon = <FaGithub />;
            break;
        case 'google':
            providerIcon = <FaGoogle />;
            break;
        default:
            providerIcon = <FaMailBulk />;
    }

    return (
        <Box w={'full'} maxWidth="700px" marginBottom="1rem" borderRadius={4}>
            <Flex align="center" alignItems="center">
                <Heading size="sm" as="h3" mr={2} mb={0}>
                    {props.author}
                </Heading>
                {props.settings?.icons ? providerIcon : null}
            </Flex>
            {
                props.settings?.timestamp ? <Text mb={4} fontSize="xs">
                    {formatDate(props.createdAt)}
                </Text> : null
            }
            <Text color={'gray.100'}>{props.text}</Text>
            {!isLast && (
                <Divider
                    borderColor="gray.200"
                    backgroundColor="gray.200"
                    mt={6}
                    mb={6}
                />
            )}
        </Box>
    )
}
