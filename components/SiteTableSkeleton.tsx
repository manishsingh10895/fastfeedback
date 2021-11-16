import React from 'react'
import { Table, Td, Th, Tr } from './Table'
import { Box, Skeleton } from '@chakra-ui/react';

type Props = {

}

const SkeletonRow = ({ width }) => {
    return (
        <Box as="tr">
            <Td>
                <Skeleton width={width} height="10px" my={4}></Skeleton>
            </Td>
            <Td>
                <Skeleton width={width} height="10px" my={4}></Skeleton>
            </Td>
            <Td>
                <Skeleton width={width} height="10px" my={4}></Skeleton>
            </Td>
            <Td>
                <Skeleton width={width} height="10px" my={4}></Skeleton>
            </Td>
        </Box>
    )
}

export default function SiteTableSkeleton(props: Props) {
    return (
        <Table>
            <thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Site Link</Th>
                    <Th>Feedback Link</Th>
                    <Th>Date Added</Th>
                    <Th>{''}</Th>
                </Tr>
            </thead>
            <tbody>
                <SkeletonRow width={75} />
                <SkeletonRow width={125} />
                <SkeletonRow width={50} />
                <SkeletonRow width={100} />
                <SkeletonRow width={75} />
            </tbody>
        </Table>
    )
}
