export type NewsListProps = {
    isLiked: boolean,
    URLPath: string,
    fileType: FileFormatKind,
    onCardClick: () => void;
}

export type FileFormatKind = 'image' | 'video' | 'unknown';

export type NewslistProps = {
    showLikedOnly?: boolean
}