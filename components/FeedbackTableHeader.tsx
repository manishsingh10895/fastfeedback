
import { AddIcon } from '@chakra-ui/icons'
import { Flex, Heading } from '@chakra-ui/layout'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import React from 'react'
import AddSiteModal from './AddSiteModal'

export default function FeedbackTableHeader() {
    return (
        <>
            <Breadcrumb>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href="/feedback">Feedbacks</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Flex justifyContent="space-between">
                <Heading mb={10} >My Feedbacks</Heading>
            </Flex>
        </>
    )
}
