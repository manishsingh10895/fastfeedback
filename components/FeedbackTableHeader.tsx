
import { AddIcon } from '@chakra-ui/icons'
import { Flex, Heading } from '@chakra-ui/layout'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import React from 'react'
import AddSiteModal from './AddSiteModal'
import NextLink from 'next/link';
import { useRouter } from 'next/dist/client/router'

export default function FeedbackTableHeader({ siteName }) {

    const router = useRouter();

    const siteId = router.query.siteId;

    return (
        <>
            <Breadcrumb>
                <BreadcrumbItem isCurrentPage={!siteId}>
                    <NextLink href="/feedback" passHref >
                        <BreadcrumbLink>Feedbacks</BreadcrumbLink>
                    </NextLink>
                </BreadcrumbItem>
                {
                    siteId ? <BreadcrumbItem isCurrentPage={!!siteId}>
                        <NextLink href={`/feedback/${siteId}`} passHref>
                            <BreadcrumbLink>{siteName}</BreadcrumbLink>
                        </NextLink>
                    </BreadcrumbItem> : null
                }
            </Breadcrumb>
            <Flex justifyContent="space-between">
                <Heading mb={10} >{siteName || 'My Feedbacks'}</Heading>
            </Flex>
        </>
    )
}
