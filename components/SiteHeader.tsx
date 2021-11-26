import { Box, Flex, Heading } from '@chakra-ui/layout'
import React from 'react'
import NextLink from 'next/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/breadcrumb';
import AddSiteModal from '@/components/AddSiteModal';
import EditSiteModal from '@/components/EditSiteModal';
import { useAuth } from '@/lib/auth';

type Props = {
    site: any,
    siteId: string,
    route: string
}

export default function SiteHeader(props: Props) {
    const { site, siteId, route } = props;

    const siteName = site?.name;

    const { user } = useAuth();

    return (
        <Box mx={4}>
            <Breadcrumb>
                <BreadcrumbItem>
                    <NextLink href="/sites" passHref>
                        <BreadcrumbLink>Sites</BreadcrumbLink>
                    </NextLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <NextLink href={`/sites/${siteId}`} passHref>
                        <BreadcrumbLink>{siteName || '-'}</BreadcrumbLink>
                    </NextLink>
                </BreadcrumbItem>
                {siteName && route && (
                    <BreadcrumbItem>
                        <NextLink href={`/sites/${siteId}/${route}`} passHref>
                            <BreadcrumbLink>{route}</BreadcrumbLink>
                        </NextLink>
                    </BreadcrumbItem>
                )}
            </Breadcrumb>
            <Flex justifyContent="space-between">
                <Heading mb={8}>{siteName || '-'}</Heading>
                {user?.uid == site?.authorId && (
                    <EditSiteModal settings={site?.settings} siteId={siteId}>
                        Edit Site
                    </EditSiteModal>
                )}
            </Flex>
        </Box>
    )
}
