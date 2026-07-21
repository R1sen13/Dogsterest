import type { NewsListProps } from "../types/Newslists";
import Icon from "./Icon";

function Card({ isLiked, URLPath }: NewsListProps) {
    const FULLPATH = 'https://random.dog/';
    return (
        <article className="dogs-card">
            <img src={FULLPATH+URLPath} alt="" className="dogs-card__image" />
            <ul className="blog-action__list">
                <li className="blog-action__item"><Icon Like={isLiked} /></li>
            </ul>
        </article>
    );
}

export default Card;