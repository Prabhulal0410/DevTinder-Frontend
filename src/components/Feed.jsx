import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AnimatePresence } from 'framer-motion'
import { addFeed, removeUserFromFeed } from '../utils/feedSlice.js'
import UserCard from './UserCard.jsx'
import toast from 'react-hot-toast'
import axios from 'axios'
import { BASE_URL } from '../utils/constants.js'

const Feed = () => {
  const dispatch = useDispatch()
  const feed = useSelector((store) => store.feed)

  const fetchFeed = async () => {
    if (feed) return
    try {
      const res = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      })
      dispatch(addFeed(res.data))
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong while loading your feed.')
    }
  }

  useEffect(() => {
    fetchFeed()
  }, [])

  const handleSwipe = (direction, userId) => {
    // TODO: fire Interested/Ignore API call here based on `direction`
    dispatch(removeUserFromFeed(userId))
  }

  const users = feed?.users

  if (!users) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <span className="loading loading-spinner text-[#5B6EF5]" />
      </div>
    )
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
        <h2 className="font-[Inter] font-semibold text-xl text-[#EDEDEF]">
          No more profiles right now
        </h2>
        <p className="font-[Inter] text-sm text-[#8B8D98] mt-2">
          Check back later for new developers to connect with.
        </p>
      </div>
    )
  }

  const visibleUsers = users.slice(0, 3)

  return (
    <div className="flex items-center justify-center h-[70vh] relative">
      <AnimatePresence>
        {visibleUsers
          .map((user, index) => (
            <UserCard
              key={user._id}
              user={user}
              isTop={index === 0}
              onSwipe={handleSwipe}
            />
          ))
          .reverse()}
      </AnimatePresence>
    </div>
  )
}

export default Feed