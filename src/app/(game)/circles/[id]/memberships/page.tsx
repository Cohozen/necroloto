import { listMembershipsByCircle } from "@/lib/api/membership";
import React from "react";
import MembershipsTable from "@/components/business/memberships/MembershipsTable";

export default async function MembershipsPage({ params }: { params: { id: string } }) {
    const circleId = params.id;
    const memberships = await listMembershipsByCircle(circleId);

    return (
        <div className="py-2">
            <MembershipsTable memberships={memberships} />
        </div>
    );
}
