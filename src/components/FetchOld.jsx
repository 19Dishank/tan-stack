import React, { useEffect, useState } from 'react';
import { getApi, oldMathod } from '../APIs/api';
import reactLogo from '../assets/react.svg'


const FetchOld = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(null);
    const fetchApi = async () => {
        try {
            const res = await oldMathod();
            res.status === 200 ? setData(res.data) : [];
            setLoading(false);
        } catch (error) {
            console.log(error);
            setIsError(error)
            setLoading(true);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchApi();
    }, []);

    if (loading) return <div className='text-6xl h-lvh flex justify-center items-center'><img src={reactLogo} alt="Loading" className='h-50 animate-spin'/></div>

    if (isError) return <h1 className='text-6xl'>{isError.message}</h1>

    return (
        <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">
                    Items List
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {data.map((ele) => (
                        <div
                            key={ele.id}
                            className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-500  transition-all duration-200 group"
                        >   
                            <h2 className="text-sm font-semibold text-gray-700 truncate capitalize">
                                {ele.title}
                            </h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );


};

export default FetchOld;



