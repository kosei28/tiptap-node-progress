import { Item, ItemStatus } from '../types';

type Props = {
    src: string;
    itemStatus: ItemStatus;
    progress: number;
    item?: Item;
};

export default function ImageBlock({ src, itemStatus, progress, item }: Props) {
    return (
        <div className="image-block-container" data-drag-handle>
            <img src={src} />
            {itemStatus.isPreview ? (
                <div className="status">Uploading: {progress}%</div>
            ) : (
                <div className="status">Uploaded: {item!.id}</div>
            )}
        </div>
    );
}
