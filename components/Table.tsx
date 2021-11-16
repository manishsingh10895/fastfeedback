import { Box, ChakraProps, Text } from '@chakra-ui/react';
import React from 'react';

export const Th = (props) => {
    return <Text
        as="th"
        p={4}
        backgroundColor="gray.500"
        textTransform="uppercase"
        fontSize="xs"
        color="whiteAlpha.800"
        fontWeight="medium"
        {...props}
    />
}

export const Td = (props: ChakraProps & { children: any }) => {
    return <Text
        as="td"
        p={4}
        borderBottom="1px solid"
        borderBottomColor="gray.100"
        color="white"
        {...props}
    />
}
export const Tr = (props: ChakraProps & { children: any }) => {
    return <Box
        as="tr"
        backgroundColor="gray.900"
        borderTopLeftRadius="8"
        borderTopRightRadius="8"
        borderBottom="1px solid"
        borderBottomColor="gray.200"
        height="40px"
        {...props}
    />
}
export const Table = (props) => {
    return (
        <Box
            as="table"
            backgroundColor="gray.900"
            width="100%"
            textAlign="left"
            ml={0}
            mr={0}
            borderRadius={8}
            boxShadow={"0px 4px 10px rgba(0,0,0,0.5)"}
            {...props}
        />
    );
}