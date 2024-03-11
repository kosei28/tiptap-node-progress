import Image from '@tiptap/extension-image';
import {
    NodeViewProps,
    NodeViewWrapper,
    ReactNodeViewRenderer,
} from '@tiptap/react';
import ImageBlock from '../components/ImageBlock';
import { Item, ItemStatus, NodeItemStatusMap } from '../types';
import { useState } from 'react';
import { uploadImage } from '../utils/upload';
import { useNodeId } from '../hooks/nodeId';
import { useOnetime } from '../hooks/onetime';

export function customImage(initialData: {
    items: Item[];
    nodeIds: string[];
    nodeItemStatusMap: NodeItemStatusMap;
}) {
    return Image.extend({
        addAttributes() {
            return {
                src: null,
                nodeId: null,
            };
        },
        addStorage() {
            return {
                items: initialData.items,
                nodeIds: initialData.nodeIds,
                nodeItemStatusMap: initialData.nodeItemStatusMap,
            };
        },
        addNodeView() {
            return ReactNodeViewRenderer(
                ({ node, updateAttributes }: NodeViewProps) => {
                    const items: Item[] = this.storage.items;
                    const nodeIds: string[] = this.storage.nodeIds;
                    const nodeItemStatusMap: NodeItemStatusMap =
                        this.storage.nodeItemStatusMap;

                    const nodeId = useNodeId(
                        node.attrs.nodeId,
                        nodeIds,
                        this.editor
                            .$nodes('image')!
                            .map((node) => node.attributes.nodeId)
                            .filter((nodeId) => nodeId !== null),
                        updateAttributes,
                    );

                    const [item, setItem] = useState<Item | undefined>();
                    const [itemStatus, setItemStatus] = useState<ItemStatus>({
                        isPreview: true,
                    });
                    const [progress, setProgress] = useState(0);

                    useOnetime(async () => {
                        const newItemStatus = nodeItemStatusMap.get(nodeId);

                        if (
                            newItemStatus !== undefined &&
                            !newItemStatus.isPreview
                        ) {
                            const item = items.find(
                                (item) => item.id === newItemStatus.itemId,
                            );

                            setItem(item);
                            setItemStatus(newItemStatus);
                        } else {
                            nodeItemStatusMap.set(nodeId, itemStatus);
                            this.storage.nodeIds = [
                                ...nodeItemStatusMap.keys(),
                            ];

                            const newItem = await uploadImage(
                                node.attrs.src,
                                (progress) => {
                                    setProgress(progress);
                                },
                            );
                            const newItemStatus: ItemStatus = {
                                isPreview: false,
                                itemId: newItem.id,
                            };

                            items.push(newItem);
                            nodeItemStatusMap.set(nodeId, newItemStatus);

                            setItem(newItem);
                            setItemStatus(newItemStatus);
                        }
                    });

                    return (
                        <NodeViewWrapper>
                            <ImageBlock
                                src={node.attrs.src}
                                itemStatus={itemStatus}
                                progress={progress}
                                item={item}
                            />
                        </NodeViewWrapper>
                    );
                },
            );
        },
    });
}
