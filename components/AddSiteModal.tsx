import { Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, toast, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createSite } from '@/lib/db'
import { useAuth } from '../lib/auth'
import useSWR, { mutate } from 'swr'
import fetcher from '../utils/fetcher'

type Props = {
    children: React.ReactNode
}

export default function AddSiteModal(props: Props) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { user } = useAuth();

    const { data: staleData, error } = useSWR(user ? ['/api/sites', user.token] : null, {
        fetcher: fetcher
    });

    const initialRef = React.useRef()
    const finalRef = React.useRef()

    const auth = useAuth();

    const toast = useToast();

    const { register, handleSubmit, formState: { errors, isSubmitting, isValid, touchedFields }, reset } = useForm();

    const [result, setResult] = useState("");

    const onSubmit = async (data) => {
        try {
            setResult(JSON.stringify(data));
            let siteData = {
                ...data,
                authorId: auth.user.uid,
                createdAt: new Date().toISOString()
            }

            let created = await createSite({
                ...siteData
            });

            onClose();
            toast({
                title: 'Site created',
                description: 'Site created successfully',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });

            siteData['id'] = created.id;

            mutate(['/api/sites', user.token], { sites: [siteData, ...staleData.sites] }, false);

            reset();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Button onClick={onOpen}
                backgroundColor="gray.900"
                color="white"
                fontWeight="medium"
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
                <ModalContent>
                    <ModalHeader fontWeight="bold">Add New Site</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl isInvalid={touchedFields.name && errors.name}>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    ref={initialRef}
                                    id="name"
                                    name="name"
                                    placeholder="name"
                                    {...register("name", {
                                        required: "This is required",
                                        minLength: { value: 4, message: "Minimum length should be 4" }
                                    })}
                                />

                                <FormErrorMessage>
                                    {errors.name?.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl mt={4} isInvalid={touchedFields.link && errors.link}>
                                <FormLabel>Link</FormLabel>
                                <Input {...register("link", {
                                    required: "Link is required",
                                })} id="link" name="link" placeholder="https://example.com" />

                                <FormErrorMessage>
                                    {errors.link?.message}
                                </FormErrorMessage>
                            </FormControl>

                            <ModalFooter>
                                <Button onClick={onClose} mr={3}>Cancel</Button>
                                <Button isLoading={isSubmitting} type="submit" colorScheme="teal">
                                    Save
                                </Button>
                            </ModalFooter>
                        </form>
                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    )
}


