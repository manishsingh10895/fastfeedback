import { Box, Divider, Heading } from '@chakra-ui/layout'
import { Text } from '@chakra-ui/react';
import React from 'react'
import { formatDate } from '../utils/time';

type Props = {
    author: string,
    text: string,
    createdAt: string,
}

export default function Feedback(props: Props) {
    return (
        <Box w={'full'} maxWidth="700px" marginBottom="1rem" borderRadius={4}>
            <Heading size="sm" as="h3">
                {props.author}
            </Heading>
            <Text mb={4} fontSize="xs">
                {formatDate(props.createdAt)}
            </Text>
            <Text color={'gray.100'}>{props.text}</Text>
            <Divider borderColor="gray.200" backgroundColor="gray.200" margin="1rem 0" />
        </Box>
    )
}
