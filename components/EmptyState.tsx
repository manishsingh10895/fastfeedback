import { Flex, Heading } from '@chakra-ui/layout'
import { Text } from '@chakra-ui/react'
import React from 'react'
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
                {"You Haven't added any sites yet"}
            </Heading>

            <Text padding={"1rem 0"}>
                {"Welcome, Let's get started by adding your first site."}
            </Text>

            <AddSiteModal>
                Add your very first site
            </AddSiteModal>
        </Flex>
    )
}
