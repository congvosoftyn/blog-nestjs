import React, { useEffect, useState } from 'react'
import { AxiosInstance } from '../utils/axios.instance'

export function Menu({ cat }) {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await AxiosInstance.get(`/posts?cat=${cat}`)
                setPosts(data);
            } catch (error) {
                console.error({ error });
            }
        }
        fetchData()
    }, [cat])

    return (
        <div className='menu' >
            <h1>Other posts you may like</h1>
            <div>
                {posts.map((post) => (
                    <div key={post.id} className='post' >
                        <img src={post.img} alt={post.title} />
                        <h2>{post.title}</h2>
                        <button>read more</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
