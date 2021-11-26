import { Flex, Heading } from '@chakra-ui/layout'
import { Text } from '@chakra-ui/react'
import React from 'react'

type Props = {

}

export default function FeedbackEmptyState(props: Props) {
    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            flexDirection='column'
            width="100%" borderRadius="8px" p={8} backgroundColor="gray.800">
            <Heading size="md">
                {"There isn't any feedback"}
            </Heading>

            <Text padding={"1rem 0"}>
                {"Share your site"}
            </Text>
        </Flex>
    )
}