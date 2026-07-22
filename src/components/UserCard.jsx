import React from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

const SWIPE_THRESHOLD = 120

const UserCard = ({ user, onSwipe, isTop }) => {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-15, 15])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])

  const handleDragEnd = (_, info) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      onSwipe('right', user._id)
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      onSwipe('left', user._id)
    }
  }

  const { firstName, lastName, photoUrl, skills } = user

  return (
    <motion.div
      className="absolute w-80 rounded-2xl border border-[#2A2B30] bg-[#17181C] shadow-xl overflow-hidden cursor-grab active:cursor-grabbing"
      style={{ x, rotate, opacity }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      initial={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 12 }}
      animate={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 12 }}
      exit={{ x: x.get() > 0 ? 300 : -300, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div className="w-full h-96 bg-[#0A0A0C]">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover pointer-events-none"
          draggable={false}
        />
      </div>

      <div className="p-4">
        <h2 className="font-[Inter] font-semibold text-lg text-[#EDEDEF]">
          {firstName} {lastName}
        </h2>

        {skills?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="font-[JetBrains_Mono] text-xs px-2 py-1 rounded-md bg-[#0A0A0C] border border-[#2A2B30] text-[#8B8D98]"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default UserCard