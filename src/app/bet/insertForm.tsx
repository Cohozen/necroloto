"use client";

import { Button, TextInput } from "@tremor/react";

export default async function InsertForm() {
    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                <TextInput className="flex-1" placeholder="Célébrité 1" />
                <TextInput className="flex-1" placeholder="Célébrité 2" />
                <TextInput className="flex-1" placeholder="Célébrité 3" />
                <TextInput className="flex-1" placeholder="Célébrité 4" />
                <TextInput className="flex-1" placeholder="Célébrité 5" />
                <TextInput className="flex-1" placeholder="Célébrité 6" />
                <TextInput className="flex-1" placeholder="Célébrité 7" />
                <TextInput className="flex-1" placeholder="Célébrité 8" />
                <TextInput className="flex-1" placeholder="Célébrité 9" />
                <TextInput className="flex-1" placeholder="Célébrité 10" />
                <TextInput className="flex-1" placeholder="Célébrité 11" />
                <TextInput className="flex-1" placeholder="Célébrité 12" />
                <TextInput className="flex-1" placeholder="Célébrité 13" />
                <TextInput className="flex-1" placeholder="Célébrité 14" />
                <TextInput className="flex-1" placeholder="Célébrité 15" />
            </div>
            <Button>Insert test</Button>
        </>
    );
}
