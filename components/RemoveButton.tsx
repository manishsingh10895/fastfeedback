import { Button } from "@chakra-ui/button"
import { DeleteIcon } from "@chakra-ui/icons"
import {
    AlertDialog, AlertDialogBody,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader, AlertDialogOverlay, Icon, IconButton, useToast
} from "@chakra-ui/react"
import React from "react"
import { mutate } from "swr"
import { useAuth } from "../lib/auth"
import { removeFeedback } from "../lib/db"

type Props = {
    feedbackId: string
}

export default function RemoveButton(props: Props) {
    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef()

    const auth = useAuth();

    const toast = useToast();

    async function onDelete() {
        try {
            await removeFeedback(props.feedbackId);
            onClose();
            toast({
                title: "Feedback removed",
                description: "The feedback has been removed from the database.",
                status: "success",
                duration: 9000,
                isClosable: true,
            });

            mutate(['/api/feedback', auth.user.token],
                async (staleData) => ({
                    feedbacks: staleData.feedbacks.filter(
                        (feedback) => feedback.id !== props.feedbackId
                    ),
                })
            );
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            <IconButton
                title="Remove"
                aria-label="Remove "
                icon={<DeleteIcon />} colorScheme="red" onClick={() => setIsOpen(true)}>
                Remove
            </IconButton>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Remove Feedback
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            {"Are you sure? You can't undo this action afterwards."}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={onDelete} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}