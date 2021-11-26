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
import { deleteSite, removeFeedback } from "../lib/db"

type Props = {
    siteId: string
}

export default function DeleteSiteButton(props: Props) {
    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef()

    const auth = useAuth();

    const toast = useToast();

    async function onDelete() {
        try {
            await deleteSite(props.siteId);
            onClose();
            toast({
                title: "Site removed",
                description: "The site has been removed from the database.",
                status: "success",
                duration: 9000,
                isClosable: true,
            });

            mutate(['/api/sites', auth.user.token],
                async (staleData) => ({
                    sites: staleData.sites.filter(
                        (site) => site.id !== props.siteId
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
                            Remove Site
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            {"Are you sure? This will delete all of the site's feedback"}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button fontWeight="bold" colorScheme="red" onClick={onDelete} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}