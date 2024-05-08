import { queryPerformSourcesList } from "@/services/perform";
import { useEffect, useState } from "react";

export default (
    performId?: number,
) => {
    const [sourceList, setSourceList] = useState<string[]>([]);
    const [sourceIndex, setSourceIndex] = useState(0);

    const handleSourceList = async () => {
        if (!performId) {
            return;
        }
        setSourceIndex(0);
        setSourceList([]);
        queryPerformSourcesList(performId)
            .then((sourceList: string[]) => {
                setSourceList(sourceList);
            })
            .catch(() => {})
    }
    const handleUpdateIndex = () => {
        let index = sourceIndex + 1;
        if (index >= sourceList.length) {
            index = 0;
        }
        setSourceIndex(index);
    }
    useEffect(() => {
        handleSourceList();
    }, [performId]);
    return {
        sourceList,
        sourceIndex,
        handleUpdateIndex,
    };
}