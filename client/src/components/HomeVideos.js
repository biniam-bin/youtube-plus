import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Link, useParams } from "react-router-dom"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export const Video = ({ item }) => {
    const [active, setActive] = useState()

    return (
        <>
            <Link onClick={() => document.body.scrollTop = document.documentElement.scrollTop = 0} to={`/watch/${item?.id?.videoId}`}>
                <div onMouseLeave={() => setActive(false)} onMouseEnter={() => setActive(true)} className="bg-[#272728] rounded-md relative h-72 cursor-pointer hover:scale-105">
                    <img src={item.snippet?.thumbnails?.high?.url} className="h-full w-full object-cover rounded-md" alt="" />
                    <div style={{ backgroundColor: "rgba(255,255,255, 0.7)" }} className={`absolute top-0 w-full h-full rounded-md bg-rd-500 ${active ? "block" : "hidden"}`}>

                        <p className="absolute top-1/3 px-3 mx-auto text-center ">{item.snippet?.title}</p>
                    </div>
                </div>
            </Link>
        </>
    )
}
const HomeVideos = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);


    const fetchData = async () => {
        const options = {
            method: 'GET',
            url: 'https://youtube-v31.p.rapidapi.com/search',
            params: {
                relatedToVideoId: 'OoNKD2YCvnY',
                part: 'id,snippet',
                type: 'video',
                maxResults: '50'
            },
            headers: {
                'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
                'X-RapidAPI-Key': 'c2a42b6d56msh38aa1c128e4ed6fp154206jsn1e68146473a7'
            }
        };
        setLoading(true)
        await axios.request(options).then(function (response) {
            response.data.items.shift()
            console.log(response.data.items);
            setData(response.data)
        }).catch(function (error) {
            console.error(error);
        });
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            {loading ?
                <div className="pt-20 py-3 w-full  grid gap-8 grid-cols-1 md:grid-cols-4 px-5 md:px-10">

                    <Skeleton baseColor="#202020" highlightColor="#444" height={300} className="" />
                    <Skeleton baseColor="#202020" highlightColor="#444" height={300} className="" />
                    <Skeleton baseColor="#202020" highlightColor="#444" height={300} className="" />
                    <Skeleton baseColor="#202020" highlightColor="#444" height={300} className="" />
                    <Skeleton baseColor="#202020" highlightColor="#444" height={300} className="" />
                    <Skeleton baseColor="#202020" highlightColor="#444" height={300} className="" />
                    <Skeleton baseColor="#202020" highlightColor="#444" height={300} className="" />
                    <Skeleton baseColor="#202020" highlightColor="#444" height={300} className="" />
                    <Skeleton baseColor="#202020" highlightColor="#444" height={300} className="" />
                    <Skeleton baseColor="#202020" highlightColor="#444" height={300} className="" />
                    <Skeleton baseColor="#202020" highlightColor="#444" height={300} className="" />
                    <Skeleton baseColor="#202020" highlightColor="#444" height={300} className="" />
                </div>

                :
                <div className="pt-20 py-3 w-full  grid gap-8 grid-cols-1 md:grid-cols-4 px-5 md:px-10">
                    {data.items?.map((item, index) => {
                        return (
                            <span key={item.id.videoId}>
                                {item.snippet && <Video item={item} />}
                            </span>
                        )
                    })}
                </div>}
        </>
    )
}

export default HomeVideos