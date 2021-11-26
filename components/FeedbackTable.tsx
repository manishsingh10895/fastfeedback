import { Code, Switch } from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';
import FeedbackRow from './FeedbackRow';
import DeleteFeedbackButton from './DeleteFeedbackButton';
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
                        return <FeedbackRow feedback={s} key={i} />
                    })
                }
            </tbody>
        </Table>
    )
}