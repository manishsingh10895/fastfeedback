import { Button, ButtonProps } from '@chakra-ui/button'
import { ChakraProps } from '@chakra-ui/system'
import React, { Children } from 'react'

type Props = {

}

export default function ActionButton(props: ChakraProps & ButtonProps & { children: React.ReactNode } & Props) {
    return (
        <Button
            backgroundColor="gray.900"
            color="white"
            fontWeight="medium"
            mt={4}
            size="lg"
            _hover={{ bg: 'gray.700' }}
            _active={{ bg: "gray.800", transform: "scale(0.95)" }}
            {...props}
        >
            {props.children}
        </Button>
    )
}
