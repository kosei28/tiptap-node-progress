import { Item } from '../types';
import { createId } from './id';

// mock
export function uploadImage(
    url: string,
    progressCallback: (progress: number) => void,
) {
    return new Promise<Item>((resolve) => {
        let progress = 0;

        const updateProgress = () => {
            progress += 1;
            progressCallback(progress);

            if (progress < 100) {
                setTimeout(updateProgress, 10);
            } else {
                const item: Item = {
                    id: createId(),
                    url,
                };
                resolve(item);
            }
        };

        updateProgress();
    });
}
