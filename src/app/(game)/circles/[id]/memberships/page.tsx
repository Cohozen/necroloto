import { listMembershipsByCircle } from "@/lib/api/membership";
import React from "react";
import MembershipsTable from "@/components/business/memberships/MembershipsTable";
import { sortBy } from "lodash";

export default async function MembershipsPage({ params }: { params: { id: string } }) {
    const circleId = params.id;
    const memberships = await listMembershipsByCircle(circleId);

    const membershipsSorted = sortBy(memberships, m => m.user.firstname);

    return (
        <div className="py-2">
            <MembershipsTable memberships={membershipsSorted} />
        </div>
    );
}
