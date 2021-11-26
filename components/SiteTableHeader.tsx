import { AddIcon } from '@chakra-ui/icons'
import { Flex, Heading } from '@chakra-ui/layout'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import React from 'react'
import AddSiteModal from './AddSiteModal'

export default function SiteTableHeader({ isPaidAccount }) {
    return (
        <>
            <Breadcrumb>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>Sites</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Flex justifyContent="space-between">
                <Heading mb={10} >Sites</Heading>
                {
                    isPaidAccount && <AddSiteModal>
                        <AddIcon name="add" mr={2}></AddIcon>
                        Add Site
                    </AddSiteModal>
                }
            </Flex>
        </>
    )
}
