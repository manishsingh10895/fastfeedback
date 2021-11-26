import DashboardShell from '@/components/DashboardShell';
import EmptyState from '@/components/EmptyState';
import Page from '@/components/Page';
import SiteTable from '@/components/SiteTable';
import SiteTableHeader from '@/components/SiteTableHeader';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import UpgradeEmptyState from '@/components/UpgradeEmptyState';
import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import React from 'react';
import useSWR from 'swr';

export default function Dashboard() {
    const { user } = useAuth();

    const { data, error } = useSWR(user ? ['/api/sites', user.token] : null, {
        fetcher: fetcher
    });

    const isPaidAccount = user?.stripeRole;

    return (
        <Page name="Sites">
            <DashboardShell>
                <SiteTableHeader isPaidAccount={isPaidAccount} />
                {
                    data && data.sites ? <>
                        {
                            data?.sites.length ?
                                <SiteTable sites={data.sites} ></SiteTable>
                                : isPaidAccount ? <EmptyState /> : <UpgradeEmptyState />
                        }
                    </> : <SiteTableSkeleton />
                }
            </DashboardShell>
        </Page>
    )
}
