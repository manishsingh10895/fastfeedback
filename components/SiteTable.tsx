import React from 'react'
import { Table, Td, Th, Tr } from './Table'
import { Box, Link, Skeleton } from '@chakra-ui/react';
import { Site } from '../lib/models/site.model';
import { format, parseISO } from 'date-fns';
import NextLink from 'next/link';
import DeleteFeedbackButton from '@/components/DeleteFeedbackButton';
import DeleteSiteButton from '@/components/DeleteSiteButton';

type Props = {
    sites: Site[]
}


export default function SiteTable(props: Props) {
    return (
        <Box overflowX="scroll">
            <Table w="full">
                <thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Site Link</Th>
                        <Th>Feedback Link</Th>
                        <Th>Date Added</Th>
                        <Th width={'50px'}>{''}</Th>
                    </Tr>
                </thead>
                <tbody>
                    {
                        props.sites.map((s, i) => {
                            return <Tr key={s.link}>
                                <Td fontWeight="medium">
                                    <NextLink passHref href="/sites/[siteId]" as={`/sites/${s.id}`}>
                                        <Link>
                                            {s.name}
                                        </Link>
                                    </NextLink>
                                </Td>
                                <Td>
                                    {s.link}
                                </Td>
                                <Td>
                                    <NextLink passHref href="/feedback/[siteId]" as={`/feedback/${s.id}`}>
                                        <Link color="blue.300" fontWeight="medium">
                                            View Feedback
                                        </Link>
                                    </NextLink>
                                </Td>
                                <Td>
                                    {s.createdAt ? format(parseISO(s.createdAt), 'PPpp') : "Invalid Date"}
                                </Td>
                                <Td>
                                    <DeleteSiteButton siteId={s.id} />
                                </Td>
                            </Tr>
                        })
                    }
                </tbody>
            </Table>
        </Box >
    )
}
