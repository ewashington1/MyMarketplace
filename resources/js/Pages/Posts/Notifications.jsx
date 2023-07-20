import React from 'react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head, Link } from '@inertiajs/react'
import { formatDistance } from "date-fns";

//user ternary to check whether post or follow
const Notifications = ({auth, notifications}) => {
    console.log(notifications);
  return (
    <AuthenticatedLayout user={auth.user}>
        <Head title="Notifications" />
        <div className=' mx-auto max-w-xl'>
            {notifications.map((notification, index) => (
                <div className='flex justify-between border-b-2 py-1' key={index}>
                    {/* ternary if post associated with noti */}
                    {notification.post !== null ? 
                        <div className='flex align-top'>
                            <Link href={`/post/${notification.post.id}`} className='pr-2'>
                                <img className='w-[2rem]' src={`storage/${notification.post.image}`} alt="post" />
                            </Link>
                            <div className='text-lg'>
                                <Link className=' font-extrabold text-blue-500' href={`/profile/${notification.actor.id}`}>{notification.actor.profile.username}</Link>
                                {notification.message}
                            </div>
                            
                        </div> :
                    <div className='flex align-top'>
                        <Link href={`/profile/${notification.actor.id}`} className='pr-2'>
                            <img
                                src={
                                    notification.actor.profile.pfp
                                        ? `/storage/${notification.actor.profile.pfp}`
                                        : "/storage/profile/default.png"
                                }
                                alt="pfp"
                                className="inline max-h-full h-10 rounded-full"
                            />
                        </Link>
                        <div className='text-lg'>
                            <Link className=' font-extrabold text-blue-500' href={`/profile/${notification.actor.profile.id}`}>{notification.actor.profile.username}</Link>
                            {notification.message}
                        </div>
                        
                    </div>
                    }
                    <div className=' text-slate-400'>
                        {formatDistance(
                            new Date(Date.parse(notification.updated_at)),
                            new Date(),
                            { addSuffix: true }
                        )}
                    </div>
                </div>
            ))}
        </div>
        
    </AuthenticatedLayout>
  )
}

export default Notifications