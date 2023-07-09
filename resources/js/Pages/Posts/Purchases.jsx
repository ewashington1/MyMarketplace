import React from 'react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from '@inertiajs/react';
import {Link} from '@inertiajs/react';

export const Purchases = ({auth, purchases}) => {

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title='Purchases' />
            <div className='justify-center items-center flex mt-3'>
                <table className='w-3/5 table-fixed'>
                    <thead>
                        <tr className=" border-b border-b-slate-300">
                            <th className='text-left'>Purchase ID</th>
                            <th className='text-left'>Post ID</th>
                            <th className='text-left'>Seller ID</th>
                            <th className='text-left'>Amount (USD)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchases.map((purchase, index) => (
                            <tr className=" border-b border-b-slate-300" key={index}>
                                <td className="font-bold">{purchase.id}</td>
                                <td>{purchase.post_id} (
                                    <a target="_blank" href={`/post/${purchase.post_id}`} className=' underline text-blue-500'>post</a>
                                )</td>
                                <td>{purchase.seller_id} (
                                    <a target="_blank" href={`/profile/${purchase.seller_id}`} className=' underline text-blue-500'>seller</a>
                                )</td>
                                <td>{purchase.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            
        </AuthenticatedLayout>
    )
}

export default Purchases;
