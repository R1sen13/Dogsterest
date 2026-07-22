import type { CardProps } from "../types/Newslists";
import Icon from "./Icon";

function Card({ isLiked, URLPath, fileType, onCardClick, LikeCount }: CardProps) {

    const renderMedia = () => {
        switch (fileType) {
            case 'image':
                return (
                    <img
                        src={URLPath}
                        alt="Dog content"
                        className="dogs-card__image"
                        loading="lazy"
                    />
                );
            case 'video':
                return (
                    <video
                        src={URLPath}
                        controls
                        className="dogs-card__video"
                        preload="metadata"
                    >
                    </video>
                );
            default:
                return (
                    <div className="dogs-card__unsupported">
                        неподдерживаемый формат
                    </div>
                );
        }
    };

    return (
        <article className="dogs-card">
            {renderMedia()}
            <ul className="blog-action__list">
                <li className="blog-action__item">
                    {LikeCount}
                </li>
                <li className="blog-action__item" onClick={onCardClick}>
                    <Icon Like={isLiked} />
                </li>
            </ul>
        </article >
    );
}

export default Card;