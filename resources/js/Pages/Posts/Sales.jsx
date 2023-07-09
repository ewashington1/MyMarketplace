import React from 'react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from '@inertiajs/react';

export const Sales = ({auth, sales}) => {

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title='Sales' />
            <div className='justify-center items-center flex mt-3'>
                <table className='w-3/5 table-fixed'>
                    <thead>
                        <tr className=" border-b border-b-slate-300">
                            <th className='text-left'>Sale ID</th>
                            <th className='text-left'>Post ID</th>
                            <th className='text-left'>Buyer ID</th>
                            <th className='text-left'>Amount (USD)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale, index) => (
                            <tr className=" border-b border-b-slate-300" key={index}>
                                <td className="font-bold">{sale.id}</td>
                                <td>{sale.post_id} (
                                    <a target="_blank" href={`/post/${sale.post_id}`} className=' underline text-blue-500'>post</a>
                                )</td>
                                <td>{sale.buyer_id} (
                                    <a target="_blank" href={`/profile/${sale.buyer_id}`} className=' underline text-blue-500'>buyer</a>
                                )</td>
                                <td>{sale.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            
        </AuthenticatedLayout>
    )
}

export default Sales;
