import Page from '@/components/Page'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import useSWR from 'swr'
import DashboardShell from '../../components/DashboardShell'
import EmptyState from '../../components/EmptyState'
import FeedbackEmptyState from '../../components/FeedbackEmptyState'
import FeedbackTable from '../../components/FeedbackTable'
import FeedbackTableHeader from '../../components/FeedbackTableHeader'
import SiteTableSkeleton from '../../components/SiteTableSkeleton'
import { useAuth } from '../../lib/auth'
import fetcher from '../../utils/fetcher'

type Props = {

}

export default function SiteFeedback(props: Props) {
    const auth = useAuth();
    const router = useRouter()
    const siteId = router.query.siteId || ''

    const { data, error } = useSWR(auth.user
        ? [`/api/feedback/${siteId}`, auth.user?.token] : null,
        { fetcher: fetcher });

    return (
        <Page name={`${data?.site?.name || ''}`}>
            <DashboardShell>
                <FeedbackTableHeader siteName={data?.site?.name} />
                {
                    data ? <>
                        {
                            data.feedbacks?.length ?
                                <FeedbackTable feedbacks={data.feedbacks} ></FeedbackTable>
                                : <FeedbackEmptyState />
                        }
                    </> : <SiteTableSkeleton />
                }
            </DashboardShell>
        </Page>
    )
}
