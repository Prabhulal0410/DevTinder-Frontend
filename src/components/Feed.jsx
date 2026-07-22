import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {addFeed} from '../utils/feedSlice.js'
import toast from 'react-hot-toast'
import axios from 'axios'
import { BASE_URL } from '../utils/constants.js'

const Feed = () => {

  const dispatch = useDispatch()
  const feed = useSelector((store)=>store.data)

  const feedData = async () => {
    if(feed) return
    try {
      const res = await axios.get(`${BASE_URL}/user/feed`, {
      withCredentials: true,
    })
    dispatch(addFeed(res.data))
    return res.data
    } catch (error) {
      console.log(error)
      toast.error(error);
    }
    
  }
  useEffect(()=>{
    feedData()
  },[])

  return (
    <div>Feed</div>
  )
}

export default Feed