import { Avatar } from '@chakra-ui/avatar'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/breadcrumb'
import Icon from '@chakra-ui/icon'
import { Button, Text } from '@chakra-ui/react'
import { Box, Flex, Heading, Link, Stack } from '@chakra-ui/layout'
import React from 'react'
import DashboardShell from './DashboardShell';
import { useAuth } from '@/lib/auth'
import AddSiteModal from './AddSiteModal'

type Props = {

}

export default function EmptyState(props: Props) {
    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            flexDirection='column'
            width="100%" borderRadius="8px" p={8} backgroundColor="gray.800">
            <Heading size="md">
                You Haven't added any sites
            </Heading>

            <Text padding={"1rem 0"}>
                Welcom, Let's get started by adding your first site.
            </Text>

            <AddSiteModal>
                Add your very first site
            </AddSiteModal>
        </Flex>
    )
}
