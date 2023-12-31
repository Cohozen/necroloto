import { useAuth } from "@clerk/nextjs";
import useSWRMutation from "swr/mutation";

type fetchMethod = "POST" | "PUT";

export default function useClerkSWRMutation(url: string, method: fetchMethod = "POST") {
    const { getToken } = useAuth();

    const fetcher = async (url: string, { arg }: { arg: any }) => {
        return fetch(url, {
            method,
            headers: { Authorization: `Bearer ${await getToken()}` },
            body: JSON.stringify(arg)
        }).then((res) => res.json());
    };

    return useSWRMutation(url, fetcher);
}
