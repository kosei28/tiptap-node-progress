import { useState } from 'react';
import { createId } from '../utils/id';
import { NodeViewProps } from '@tiptap/react';

export function useNodeId(
    initialNodeId: string | null,
    nodeIds: string[],
    usedNodeIds: string[],
    updateAttributes: NodeViewProps['updateAttributes'],
) {
    const [nodeId, setNodeId] = useState<string | null>(initialNodeId);

    if (
        nodeId === null ||
        !nodeIds.includes(nodeId) ||
        usedNodeIds.filter((id) => id === nodeId).length > 1
    ) {
        const newNodeId = createId();

        nodeIds.push(newNodeId);
        setNodeId(newNodeId);

        setTimeout(() => {
            updateAttributes({
                nodeId: newNodeId,
            });
        });

        return newNodeId;
    } else {
        return nodeId;
    }
}
