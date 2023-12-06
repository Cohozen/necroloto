import { useAuth } from "@clerk/nextjs";
import useSWRMutation from "swr/mutation";

export default function useClerkSWRMutation(url: string) {
    const { getToken } = useAuth();

    const fetcher = async (url: string, { arg }: { arg: any }) => {
        return fetch(url, {
            method: "POST",
            headers: { Authorization: `Bearer ${await getToken()}` },
            body: JSON.stringify(arg)
        }).then((res) => res.json());
    };

    return useSWRMutation(url, fetcher);
}
