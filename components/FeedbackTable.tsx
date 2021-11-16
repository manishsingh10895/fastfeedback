import { DeleteIcon } from '@chakra-ui/icons';
import { Code, IconButton, Switch } from '@chakra-ui/react';
import React from 'react';
import RemoveButton from './RemoveButton';
import { Table, Td, Th, Tr } from './Table';

type Props = {
    feedbacks: any[]
}


export default function FeedbackTable(props: Props) {
    return (
        <Table>
            <thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Feedback</Th>
                    <Th>Route</Th>
                    <Th>Visible</Th>
                    <Th>{""}</Th>
                </Tr>
            </thead>
            <tbody>
                {
                    props.feedbacks.map((s, i) => {
                        return <Tr key={s.id}>
                            <Td fontWeight="medium">
                                {s.author}
                            </Td>
                            <Td>
                                {s.text}
                            </Td>
                            <Td>
                                <Code>
                                    {'/'}
                                </Code>
                            </Td>
                            <Td>
                                <Switch colorScheme="green" defaultChecked={s.status == 'active'} checked={s.status == 'active'} />
                            </Td>
                            <Td>
                                <RemoveButton feedbackId={s.id} />
                            </Td>
                        </Tr>
                    })
                }
            </tbody>
        </Table>
    )
}