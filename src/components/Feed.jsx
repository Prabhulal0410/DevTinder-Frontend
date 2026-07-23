import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AnimatePresence } from 'framer-motion'
import { UserX, RefreshCw } from 'lucide-react'
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
    dispatch(removeUserFromFeed(userId))
  }

  const users = feed?.users

  if (!users) {
    return (
      <div className="flex items-center justify-center h-[60vh] sm:h-[70vh]">
        <span className="loading loading-spinner text-[#5B6EF5]" />
      </div>
    )
  }

  if (users.length === 0) {
    return (
      <div className="flex items-center justify-center h-[60vh] sm:h-[70vh] px-4">
        <div className="flex flex-col items-center text-center max-w-xs">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#17181C] border border-[#2A2B30] flex items-center justify-center mb-4 sm:mb-5">
            <UserX className="w-6 h-6 sm:w-7 sm:h-7 text-[#5B6EF5]" strokeWidth={1.5} />
          </div>
          <h2 className="font-sans font-semibold text-base sm:text-lg text-[#EDEDEF]">
            You're all caught up
          </h2>
          <p className="font-sans text-sm text-[#8B8D98] mt-2 leading-relaxed">
            No new developers in your feed right now. Check back soon for fresh profiles.
          </p>
          <button
            onClick={fetchFeed}
            className="mt-5 sm:mt-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-[#17181C] border border-[#2A2B30] text-[#EDEDEF] text-sm font-sans font-medium hover:border-[#5B6EF5] transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>
    )
  }

  const visibleUsers = users.slice(0, 3)

  return (
    <div className="w-full flex justify-center px-4 sm:px-6 py-6 sm:py-10">
      <div className="relative w-full max-w-[270px] sm:max-w-[320px] lg:max-w-[360px] aspect-[17/28]">
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
    </div>
  )
}

export default Feed