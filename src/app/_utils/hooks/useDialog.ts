import React, { useState } from "react";


export default function useDialog(component: React.ReactNode){
    const [opened, setOpened] = useState(false);

    const openDialog = () => {
        setOpened(true);
    }

    return {
        openDialog
    }
}