import { useEffect, useState } from "react"
import { getDoggos } from '../services/api'
import Card from "./Card"
import Loader from "./Loader"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import type { FileFormatKind } from "../types/Newslists"

function getFileType(url: string): FileFormatKind {
    const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'] as const
    const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov', '.avi'] as const

    const lowerName = url.toLowerCase()

    if (IMAGE_EXTENSIONS.some(ext => lowerName.endsWith(ext))) {
        return 'image'
    }

    if (VIDEO_EXTENSIONS.some(ext => lowerName.endsWith(ext))) {
        return 'video'
    }

    return 'unknown'
}

function getLikedItems(): string[] {
    const cartData = localStorage.getItem('cart')
    return cartData ? JSON.parse(cartData) : []
}

function saveLikedItems(items: string[]) {
    localStorage.setItem('cart', JSON.stringify(items))
}

function Newslist() {
    const BASE_URL = 'https://random.dog/'

    const [loading, setLoading] = useState<boolean>(true)
    const [doggos, setDoggos] = useState<string[]>([])
    const [likedItems, setLikedItems] = useState<Set<string>>(new Set())

    useEffect(() => {
        const fetchDoggos = async () => {
            try {
                setLoading(true)
                const data = await getDoggos()
                setDoggos(data)

                const likedUrls = getLikedItems()
                setLikedItems(new Set(likedUrls))

            } catch (err) {
                console.log(err instanceof Error ? err.message : 'Произошла ошибка')
            } finally {
                setLoading(false)
            }
        }
        fetchDoggos()
    }, [])

    const handleCardClick = (url: string) => {
        setLikedItems(prevLiked => {
            const newLiked = new Set(prevLiked)

            if (newLiked.has(url)) {
                newLiked.delete(url)
            } else {
                newLiked.add(url)
            }
            saveLikedItems(Array.from(newLiked))

            return newLiked
        })
    }

    if (loading) return <Loader />
    return (

        <div className="cards">
            <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 750: 3, 900: 5 }}
            >
                <Masonry>
                    {doggos.map((doggo, index) => {
                        const fullUrl = BASE_URL + doggo;
                        const isLiked = likedItems.has(fullUrl);

                        return (
                            <Card
                                key={index}
                                isLiked={isLiked}
                                URLPath={fullUrl}
                                fileType={getFileType(doggo)}
                                onCardClick={() => handleCardClick(fullUrl)}
                            />
                        );
                    })}
                </Masonry>
            </ResponsiveMasonry>
        </div>
    )
}

export default Newslist