import { useEffect, useState } from 'react';

export function useOnetime(callback: () => void) {
    const [isFirst, setIsFirst] = useState(true);

    useEffect(() => {
        if (isFirst) {
            const timeoutId = setTimeout(() => {
                setIsFirst(false);
                callback();
            });

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [isFirst, callback]);
}
