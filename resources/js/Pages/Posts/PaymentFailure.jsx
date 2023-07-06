import React from 'react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head} from "@inertiajs/react"

const PaymentFailure = ({auth, message}) => {
  return (
    <AuthenticatedLayout user={auth.user}>
        <Head title="Payment Error" />
        <div className="grid grid-cols-9  h-full w-8/12 m-auto justify-items-center items-center">
            <h1 className=" col-span-9 text-6xl mt-64">
                {message}
            </h1>
        </div>
    </AuthenticatedLayout>
  )
}

export default PaymentFailure