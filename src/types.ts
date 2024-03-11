export type Item = {
    id: string;
    url: string;
};

export type ItemStatus =
    | {
          isPreview: true;
      }
    | {
          isPreview: false;
          itemId: string;
      };

export type NodeItemStatusMap = Map<string, ItemStatus>;
