import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link, useParams, useLocation } from "react-router-dom"


const Result = ({ result }) => {
  return (
    <Link to={`/watch/${result?.id?.videoId}`}>
      <div className="bg-[#272728] cursor-pointer h-72 w-full my-  rounded-md p-3">
        <div className="top-section flex">
          <div className="">
            <h3 className="title text-center flex text-gray-300 text-xl font-bold">{result.snippet.title}</h3>
            <p className="text-gray-500 text-start mt-5">{result.snippet.description}</p>
          </div>
          <img src={result?.snippet?.thumbnails?.high?.url} className="h-64 w-64 rounded-md" alt="" />
        </div>

      </div>
    </Link>
  )
}
const Results = () => {

  let { search } = useLocation()
  console.log(search.search_query)
  const [results, setResults] = useState()

  const fetchResults = async () => {
    const options = {
      method: 'GET',
      url: 'https://youtube-v31.p.rapidapi.com/search',
      params: {
        q: 'music',
        part: 'snippet,id',
        regionCode: 'US',
        maxResults: '50',
        order: 'date'
      },
      headers: {
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
        'X-RapidAPI-Key': 'c2a42b6d56msh38aa1c128e4ed6fp154206jsn1e68146473a7'
      }
    };

    await axios.request(options).then(function (response) {
      setResults(response.data?.items)
      // console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }

  useEffect(() => {
    fetchResults();
  })


  return (
    <div className="pt-20 mx-2 grid gap-4 grid-cols-2">
      {/* {results?.map((result) => {
        return (
          <Result result={result} key={result.id} />
        )
      })} */}
    </div>
  )
}

export default Results