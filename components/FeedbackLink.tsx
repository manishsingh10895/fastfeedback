import { Flex, Link } from '@chakra-ui/layout'
import React from 'react'

type Props = {
    siteId: string
}

export default function FeedbackLink(props: Props) {
    return (
        <Flex justifyContent="space-between" mb={8} mt={1} width="full">
            <Link fontWeight="bold" fontSize="xs" href={`/p/${props.siteId}`}>
                Leave a Comment -&gt
            </Link>
            <Link fontSize="xs" color="blackAlpha.500" href="/">
                Powered by Fastfeedback 
            </Link>
        </Flex>
    )
}
