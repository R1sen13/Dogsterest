export type CardProps = {
    isLiked: boolean,
    LikeCount: number,
    URLPath: string,
    fileType: FileFormatKind,
    onCardClick: () => void;
}

export type FileFormatKind = 'image' | 'video' | 'unknown';

export type NewslistProps = {
    showLikedOnly?: boolean
}

export type getDoggosType = {
    filename: string;
    likes: number;
}