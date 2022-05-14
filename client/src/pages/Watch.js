import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { Link } from "react-router-dom"

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



const Watch = () => {

    let { id } = useParams();
    const [data, setData] = useState([])
    const [comments, setComments] = useState([])
    const [load, setLoad] = useState(false);
    const [loadRelated, setLoadRelated] = useState(false);

    //


    const fetchComments = async () => {
        const axios = require("axios");

        const options = {
            method: 'GET',
            url: 'https://youtube-v31.p.rapidapi.com/commentThreads',
            params: { part: 'snippet', videoId: id, maxResults: '100' },
            headers: {
                'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
                'X-RapidAPI-Key': 'c2a42b6d56msh38aa1c128e4ed6fp154206jsn1e68146473a7'
            }
        };
        setLoad(true)
        await axios.request(options).then(function (response) {
            setComments(response.data.items)
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
        setLoad(false)
    }

    const fetchRelated = async () => {
        const options = {
            method: 'GET',
            url: 'https://youtube-v31.p.rapidapi.com/search',
            params: {
                relatedToVideoId: id,
                part: 'id,snippet',
                type: 'video',
                maxResults: '100'
            },
            headers: {
                'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
                'X-RapidAPI-Key': 'c2a42b6d56msh38aa1c128e4ed6fp154206jsn1e68146473a7'
            }
        };
        setLoadRelated(true)
        await axios.request(options).then(function (response) {
            response.data.items.shift()
            console.log(response.data.items);
            setData(response.data)
        }).catch(function (error) {
            console.error(error);
        });
        setLoadRelated(false)
    }


    useEffect(() => {
        fetchRelated()
        fetchComments()
    }, [id])


    return (
        <div className="pt-16">

            <div className="text-gray-400 p-5 grid grid-cols-12">
                <div className="left-section col-span-8 ">
                    {load ?

                        <Skeleton baseColor="#202020" highlightColor="#444" height={500} />
                        :
                        <iframe className="w-full h-[550px]"
                            src={`https://www.youtube.com/embed/${id}`}>
                        </iframe>
                    }
                    {/* <video width="320" height="240" autoplay src="https://www.youtube.com/watch?v=OoNKD2YCvnY"></video> */}
                </div>
                <div className="right-section w-full col-span-4 bg-[#020304] p-5 h-[550px] rounded-r-md overflow-y-scroll">
                    {/* <p className="text-md text-start">

                        {data?.snippet?.description}
                    </p> */}
                    {comments?.map((comment) => {
                        if (load) {
                            return (
                                <Skeleton baseColor="#202020" highlightColor="#444" height={200} />
                            )
                        }
                        return (
                            <div key={comment.id} className="comment bg-[#272728] flex flex-col rounded-md p-4 my-2">
                                <div className="top flex items-center">
                                    <img src={comment?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl} className=' h-12 w-12 rounded-full' alt="" />
                                    <p className="name ml-5">{comment?.snippet?.topLevelComment?.snippet?.authorDisplayName}</p>
                                </div>
                                <div className="bottom my-3 flex">
                                    <p className="comment flex">{comment?.snippet?.topLevelComment?.snippet?.textDisplay}</p>
                                </div>
                            </div>
                        )
                    })}


                </div>
            </div>
            <h1 className="text-white text-4xl font-bold my-5 flex justify-center font-sans">You might also like</h1>
            <div className="bottom-section px-5 mx-auto">

                {loadRelated ?

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

                    <div className="pt-2 py-3 w-full  grid gap-8 grid-cols-1 md:grid-cols-4 px-5 md:px-10">
                        {data.items?.map((item, index) => {
                            return (
                                <span key={item.id.videoId}>
                                    {item.snippet && <Video item={item} />}
                                </span>
                            )
                        })}
                    </div>
                }
            </div>
        </div>
    )
}

export default Watch