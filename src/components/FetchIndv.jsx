import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getIndvData } from '../APIs/api';
import { useQuery } from '@tanstack/react-query';
import reactLogo from '../assets/react.svg'


const FetchIndv = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { data, isPending, isError, error } = useQuery({
        queryKey: ["post",params.id],
        queryFn: () => getIndvData(params.id),
        // refetchInterval: 10
    })
    // const { id, title, body } = data;
    if (isPending) return <div className='text-6xl h-lvh flex justify-center items-center'><img src={reactLogo} alt="Loading" className='h-50 animate-spin' /></div>
    if (isError) return <h1 className='text-6xl'>{error.message || "Try Fixing Api"}</h1>
    return (
        <div className="min-h-screen bg-gray-50 p-6 sm:p-10">

            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">
                    Detailed Item
                </h1>


                <div className="grid  gap-4 ">
                    <div className="flex  flex-col p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-500  transition-all duration-200 group">
                        <h2 className="text-sm border-l-2 px-1 font-semibold text-gray-700 truncate capitalize">
                            {data.id}
                        </h2>
                        <h2 className="text-sm pb-2 font-semibold text-gray-700 truncate capitalize">
                            <span className=' border-b'>{data.title}</span>
                        </h2>
                        <h2 className="text-sm py-2 font-semibold text-gray-700  capitalize">
                            {data.body}
                        </h2>
                    </div>
                </div>
                <div className='py-5'>
                    <button
                        onClick={() => { navigate(-1) }}
                        className=' shadow-lg active:shadow-none transition-all duration-200 group border px-4 py-2 rounded-md border-gray-200 capitalize hover:border-blue-500 hover:bg-sky-100'>back</button>
                </div>
            </div>
        </div>
    );
};

export default FetchIndv;