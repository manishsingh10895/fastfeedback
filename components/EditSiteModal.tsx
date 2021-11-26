import { Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Switch, toast, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createSite, updateSite } from '@/lib/db'
import { useAuth } from '../lib/auth'
import useSWR, { mutate } from 'swr'
import fetcher from '../utils/fetcher'
import { FaCog } from 'react-icons/fa'

type Props = {
    children: React.ReactNode,
    settings?: any,
    siteId?: string
}

export default function EditSiteModal(props: Props) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { user } = useAuth();

    const { data: staleData, error } = useSWR(user ? ['/api/sites', user.token] : null, {
        fetcher: fetcher
    });

    const initialRef = React.useRef()
    const finalRef = React.useRef()

    const { settings, siteId } = props

    const auth = useAuth();

    const toast = useToast();

    const { register, handleSubmit, formState: { errors, isSubmitting, isValid, touchedFields }, reset } = useForm();

    const [result, setResult] = useState("");

    const onUpdateSite = async (newSettings) => {
        await updateSite(siteId, {
            settings: newSettings
        });
        toast({
            title: 'Success!',
            description: "We've updated your site.",
            status: 'success',
            duration: 5000,
            isClosable: true
        });
        mutate(['/api/sites', user.token]);
        onClose();
    };
    return (
        <>
            <Button onClick={onOpen}
                backgroundColor="gray.900"
                color="white"
                fontWeight="medium"
                leftIcon={<FaCog />}
                _hover={{ backgroundColor: "gray.700" }}
                _active={{ backgroundColor: "gray.800", transform: "scale(0.95)" }}
            >
                {props.children}
            </Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent as="form" onSubmit={handleSubmit(onUpdateSite)}>
                    <ModalHeader fontWeight="bold">Edit Site</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl display="flex" alignItems="center">
                            <Switch
                                mr={2}
                                aria-label="Timestamp"
                                title="Timestamp"
                                key={settings?.timestamp}
                                name="timestamp"
                                {...register('timestamp')}
                                colorScheme="green"
                                defaultIsChecked={settings?.timestamp}
                            />
                            <FormLabel ml={2} htmlFor="show-timestamp">
                                Show Timestamp
                            </FormLabel>
                        </FormControl>
                        <FormControl display="flex" alignItems="center">
                            <Switch
                                mr={2}
                                key={settings?.icons}
                                name="icons"
                                {...register('icons')}
                                colorScheme="green"
                                defaultIsChecked={settings?.icons}
                            />
                            <FormLabel ml={2} htmlFor="show-icons">
                                Show Icon
                            </FormLabel>
                        </FormControl>
                        <FormControl display="flex" alignItems="center">
                            <Switch
                                mr={2}
                                key={settings?.ratings}
                                name="ratings"
                                {...register('ratings')}
                                colorScheme="green"
                                defaultIsChecked={settings?.ratings}
                            />
                            <FormLabel ml={2} htmlFor="show-ratings">
                                Show Ratings
                            </FormLabel>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} mr={3} fontWeight="medium">
                            Cancel
                        </Button>
                        <Button
                            backgroundColor="#99FFFE"
                            color="#194D4C"
                            fontWeight="medium"
                            type="submit"
                        >
                            Update
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}