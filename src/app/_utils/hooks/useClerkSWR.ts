import useSWR from "swr";
import { useAuth } from "@clerk/nextjs";

export default function useClerkSWR<T>(url: string) {
    const { getToken } = useAuth();

    const fetcher = async (...args: [RequestInfo]) => {
        return fetch(...args, {
            headers: { Authorization: `Bearer ${await getToken()}` }
        }).then((res) => res.json());
    };

    return useSWR<T>(url, fetcher);
}