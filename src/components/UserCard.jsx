import React, { useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

const SWIPE_THRESHOLD = 120
const EXIT_DISTANCE = 600
const DEFAULT_ABOUT = "New here — still writing my bio!"

const getInitials = (firstName, lastName) =>
  `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase()

const UserCard = ({ user, onSwipe, isTop }) => {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-250, 250], [-18, 18])
  const likeOpacity = useTransform(x, [20, SWIPE_THRESHOLD], [0, 1])
  const nopeOpacity = useTransform(x, [-SWIPE_THRESHOLD, -20], [1, 0])
  const scale = useTransform(x, [-250, 0, 250], [0.97, 1, 0.97])

  const [imgFailed, setImgFailed] = useState(false)

  const handleDragEnd = (_, info) => {
    const passedThreshold = Math.abs(info.offset.x) > SWIPE_THRESHOLD
    if (!passedThreshold) return

    const direction = info.offset.x > 0 ? 'right' : 'left'
    const target = direction === 'right' ? EXIT_DISTANCE : -EXIT_DISTANCE

    animate(x, target, {
      type: 'spring',
      stiffness: 250,
      damping: 25,
      onComplete: () => onSwipe(direction, user._id),
    })
  }

  const { firstName, lastName, photoUrl, age, gender, about, skills } = user
  const showAbout = about && about !== DEFAULT_ABOUT

  return (
    <motion.div
      className="absolute inset-0 m-auto w-[340px] h-[560px] rounded-3xl border border-[#2A2B30] bg-[#17181C] overflow-hidden cursor-grab active:cursor-grabbing select-none"
      style={{
        x,
        rotate,
        scale: isTop ? scale : 0.95,
        boxShadow: isTop
          ? '0 25px 60px -15px rgba(91, 110, 245, 0.3), 0 0 0 1px rgba(91, 110, 245, 0.08)'
          : '0 15px 40px -20px rgba(0, 0, 0, 0.6)',
      }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.85}
      onDragEnd={handleDragEnd}
      initial={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 16, opacity: 0 }}
      animate={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 16, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
    >
      {/* Photo */}
      <div className="relative w-full h-[380px] bg-[#0A0A0C]">
        {!imgFailed && photoUrl ? (
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover pointer-events-none"
            draggable={false}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-[#5B6EF5]/10 border border-[#5B6EF5]/30 flex items-center justify-center">
              <span className="font-sans font-semibold text-2xl text-[#5B6EF5]">
                {getInitials(firstName, lastName)}
              </span>
            </div>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#17181C] to-transparent pointer-events-none" />

        <motion.div
          style={{ opacity: likeOpacity }}
          className="absolute top-5 left-5 rotate-[-12deg] border-[3px] border-[#3DD68C] rounded-lg px-3 py-1 pointer-events-none"
        >
          <span className="font-sans font-bold text-lg tracking-wider text-[#3DD68C]">
            LIKE
          </span>
        </motion.div>

        <motion.div
          style={{ opacity: nopeOpacity }}
          className="absolute top-5 right-5 rotate-[12deg] border-[3px] border-[#F45B69] rounded-lg px-3 py-1 pointer-events-none"
        >
          <span className="font-sans font-bold text-lg tracking-wider text-[#F45B69]">
            NOPE
          </span>
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-3 h-[180px] overflow-hidden">
        <div className="flex items-baseline gap-2 flex-wrap">
          <h2 className="font-sans font-semibold text-xl text-[#EDEDEF] leading-none">
            {firstName} {lastName}
          </h2>
          {age && (
            <span className="font-sans text-base text-[#8B8D98] leading-none">
              {age}
            </span>
          )}
          {gender && (
            <span className="font-mono text-[10px] uppercase tracking-wide px-2 py-1 rounded-full bg-[#0A0A0C] border border-[#2A2B30] text-[#8B8D98] leading-none">
              {gender}
            </span>
          )}
        </div>

        {showAbout && (
          <p className="font-sans text-sm text-[#8B8D98] leading-relaxed line-clamp-2">
            {about}
          </p>
        )}

        {skills?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {skills.map((skill) => (
              <span
                key={skill}
                className="font-mono text-xs px-2.5 py-1 rounded-md bg-[#5B6EF5]/10 border border-[#5B6EF5]/20 text-[#5B6EF5]"
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