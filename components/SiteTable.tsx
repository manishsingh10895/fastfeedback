import React from 'react'
import { Table, Td, Th, Tr } from './Table'
import { Box, Link, Skeleton } from '@chakra-ui/react';
import { Site } from '../lib/models/site.model';
import { format, parseISO } from 'date-fns';
import NextLink from 'next/link';

type Props = {
    sites: Site[]
}


export default function SiteTable(props: Props) {
    return (
        <Table>
            <thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Site Link</Th>
                    <Th>Feedback Link</Th>
                    <Th>Date Added</Th>
                </Tr>
            </thead>
            <tbody>
                {
                    props.sites.map((s, i) => {
                        return <Tr key={s.link}>
                            <Td fontWeight="medium">
                                {s.name}
                            </Td>
                            <Td>
                                {s.link}
                            </Td>
                            <Td>
                                <NextLink passHref href="/p/[siteId]" as={`/p/${s.id}`}>
                                    <Link color="blue.300" fontWeight="medium">
                                        View Feedback
                                    </Link>
                                </NextLink>
                            </Td>
                            <Td>
                                {s.createdAt ? format(parseISO(s.createdAt), 'PPpp') : "Invalid Date"}
                            </Td>
                        </Tr>
                    })
                }
            </tbody>
        </Table>
    )
}
