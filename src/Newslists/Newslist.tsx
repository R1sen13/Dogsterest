import { useEffect, useState } from "react";
import { getDoggos } from '../services/api'
import Card from "./Card";
import Loader from "./Loader";


function Newslist() {
    const [loading, setLoading] = useState<boolean>(true)
    const [doggos, setDoggos] = useState<string[]>([])

    useEffect(() => {
        const fetchDoggos = async () => {
            try {
                setLoading(true);
                const data = await getDoggos();
                setDoggos(data);

            } catch (err) {
                console.log(err instanceof Error ? err.message : 'Произошла ошибка')
            } finally {
                setLoading(false);
            }
        }
        fetchDoggos();
    }, [])

    if (loading) return <Loader />
    return (
        <div className="card">
            {doggos.map((doggo, index) => (
                <Card isLiked={false} URLPath={doggo} key={index} />
            ))}
        </div>
    );
}

export default Newslist