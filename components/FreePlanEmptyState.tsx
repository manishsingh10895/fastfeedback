import { Avatar } from '@chakra-ui/avatar'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/breadcrumb'
import Icon from '@chakra-ui/icon'
import { Button, Text } from '@chakra-ui/react'
import { Box, Flex, Heading, Link, Stack } from '@chakra-ui/layout'
import React from 'react'
import DashboardShell from './DashboardShell';

type Props = {

}

export default function FreePlanEmptyState(props: Props) {
    return (
        <DashboardShell>
            <Box width="100%" backgroundColor="white">
                <Heading size="md">
                    Get FeedBack on your site instantly
                </Heading>

                <Text>
                    Start Today, Then grow with us
                </Text>

                <Button>
                    Upgrade to Starter
                </Button>
            </Box>
        </DashboardShell>
    )
}
