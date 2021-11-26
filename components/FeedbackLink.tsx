import { Flex, Link } from '@chakra-ui/layout'
import React from 'react'

type Props = {
    paths: string[]
}

export default function FeedbackLink(props: Props) {
    const { paths } = props;
    return (
        <Flex
            align={['flex-start', 'center']}
            justifyContent="space-between"
            mb={8}
            width="full"
            mt={1}
            direction={['column', 'row']}
        >
            <Link
                fontWeight="bold"
                fontSize="sm"
                href={`/sites/${paths.join('/')}`}
                target="_blank"
            >
                Leave a comment →
            </Link>
            <Link fontSize="xs" color="blackAlpha.500" href="/" target="_blank">
                Powered by Fast Feedback (Alpha)
            </Link>
        </Flex>
    )
}
