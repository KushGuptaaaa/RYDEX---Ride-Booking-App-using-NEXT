'use client'
import React, { useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import AuthModal from './AuthModal'
import { LogOut } from 'lucide-react'

function Nav() {
    const { data: session } = useSession()
    const [authOpen, setAuthOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)

    const handleLogOut = async () => {
        await signOut({ redirect: false })
        setProfileOpen(false)
    }

    return (
        <>
            <motion.div
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`fixed top-3 left-1/2 -translate-x-1/2
        w-[94%] md:w-[86%]
        z-50 rounded-full bg-[#0B0B0B] text-white
        shadow-[0_15px_50px_rgba(0,0,0,0.7)] py-3`}
            >
                <div className='max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between'>
                    <Image src={"/logo.png"} alt='logo' width={44} height={44} priority />

                    <div className='flex items-center gap-3 relative'>
                        {!session?.user ? (
                            <button
                                className='px-4 py-1.5 rounded-full bg-white text-black text-sm'
                                onClick={() => setAuthOpen(true)}
                            >
                                Login
                            </button>
                        ) : (
                            <>
                                <button
                                    className='w-11 h-11 rounded-full bg-white text-black font-bold'
                                    onClick={() => setProfileOpen(p => !p)}
                                >
                                    {session.user.name?.charAt(0).toUpperCase()}
                                </button>

                                <AnimatePresence>
                                    {profileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute top-14 right-0 w-[300px] bg-white text-black rounded-2xl shadow-xl border"
                                        >
                                            <div className='p-5'>
                                                <p className='font-semibold text-lg'>{session.user.name}</p>
                                                <p className='text-xs text-gray-500 mb-4'>{session.user.email}</p>

                                                <button
                                                    className='w-full flex items-center gap-3 py-3 hover:bg-gray-100 rounded-xl'
                                                    onClick={handleLogOut}
                                                >
                                                    <LogOut size={16} />
                                                    Logout
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </>
                        )}
                    </div>
                </div>
            </motion.div>

            <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
        </>
    )
}

export default Nav
