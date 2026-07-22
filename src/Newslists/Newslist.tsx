import { useEffect, useState } from "react"
import InfiniteScroll from 'react-infinite-scroll-component'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

import type { FileFormatKind, NewslistProps } from "../types/Newslists"
import { getDoggos } from '../services/api'

import Card from "./Card"
import Loader from "./Loader"
import LoaderNewPageInfiniteScroll from "./LoaderNewPageInfiniteScroll"

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

function Newslist({ showLikedOnly = false }: NewslistProps) {
    const BASE_URL = 'https://random.dog/'
    const ITEMS_PER_PAGE = 15

    const [loading, setLoading] = useState<boolean>(true)
    const [allDoggos, setAllDoggos] = useState<string[]>([])
    const [displayedDoggos, setDisplayedDoggos] = useState<string[]>([])
    const [likedItems, setLikedItems] = useState<Set<string>>(new Set())
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [page, setPage] = useState<number>(0)

    useEffect(() => {
        const fetchDoggos = async () => {
            try {
                setLoading(true)
                const data = await getDoggos()
                setAllDoggos(data)

                const likedUrls = getLikedItems()
                const likedSet = new Set(likedUrls)
                setLikedItems(likedSet)

                const filteredData = showLikedOnly
                    ? data.filter(url => likedSet.has(BASE_URL + url))
                    : data

                const initialItems = filteredData.slice(0, ITEMS_PER_PAGE)
                setDisplayedDoggos(initialItems)
                setHasMore(filteredData.length > ITEMS_PER_PAGE)

            } catch (err) {
                console.log(err instanceof Error ? err.message : 'Произошла ошибка')
            } finally {
                setLoading(false)
            }
        }
        fetchDoggos()
    }, [showLikedOnly])

    const fetchMoreData = () => {
        const filteredData = showLikedOnly
            ? allDoggos.filter(url => likedItems.has(BASE_URL + url))
            : allDoggos

        if (displayedDoggos.length >= filteredData.length) {
            setHasMore(false)
            return
        }

        const nextPage = page + 1
        const startIndex = nextPage * ITEMS_PER_PAGE
        const endIndex = startIndex + ITEMS_PER_PAGE
        const newItem = filteredData.slice(startIndex, endIndex)

        setTimeout(() => {
            setDisplayedDoggos(prev => [...prev, ...newItem])
            setPage(nextPage)

            if (endIndex >= filteredData.length) setHasMore(false)
        }, 1200)
    }

    const handleCardClick = (url: string) => {
        setLikedItems(prevLiked => {
            const newLiked = new Set(prevLiked)

            if (newLiked.has(url)) {
                newLiked.delete(url)
            } else {
                newLiked.add(url)
            }
            saveLikedItems(Array.from(newLiked))

            if (showLikedOnly) {
                const updatedFiltered = allDoggos
                    .filter(doggo => newLiked.has(BASE_URL + doggo))
                setDisplayedDoggos(updatedFiltered.slice(0, ITEMS_PER_PAGE))
                setHasMore(updatedFiltered.length > ITEMS_PER_PAGE)
                setPage(0)
            }

            return newLiked
        })
    }

    //заглушка
    if (showLikedOnly && likedItems.size === 0 && !loading) {
        return (
            <div>
                <h2>Нет понравившихся постов</h2>
            </div>
        )
    }

    if (loading) return <Loader />

    return (
        <InfiniteScroll
            dataLength={displayedDoggos.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<LoaderNewPageInfiniteScroll />}
        >
            <div className="cards">
                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 3, 900: 5 }}
                >
                    <Masonry>
                        {displayedDoggos.map((doggo, index) => {
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
        </InfiniteScroll>
    )
}

export default Newslist