import { Button, Flex, Stack } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';
import React from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import ActionButton from '@/components/ActionButton';

const LoginButtons = () => {
    const auth = useAuth();

    return (
        <Flex margin="1rem" flexWrap="wrap" justifyContent="center ">
            <ActionButton mr={5}
                leftIcon={<FaGithub />}

                onClick={() => {
                    auth.signinWithGithub();
                }}>
                Sign In With Github
            </ActionButton>
            <ActionButton
                backgroundColor="white"
                color="gray.500"
                leftIcon={<FaGoogle />} onClick={() => {
                    auth.signinWithGoogle();
                }}>
                Sign In With Google
            </ActionButton>
        </Flex>
    );
};

export default LoginButtons;