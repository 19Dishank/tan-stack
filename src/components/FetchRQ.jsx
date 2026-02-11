import { deletePost, getApi, updatePost } from '../APIs/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import reactLogo from '../assets/react.svg';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Pencil, Trash } from 'lucide-react';

const FetchRQ = () => {
    const queryClient = useQueryClient();
    const [pageNumber, setPageNumber] = useState(0);

    const { data, isPending, isError, error } = useQuery({
        queryKey: ['posts', pageNumber],
        queryFn: () => getApi(pageNumber),

    });

    const deleteMutation = useMutation({
        mutationFn: (id) => deletePost(id),
        onSuccess: (data, id) => {
            queryClient.setQueryData(['posts', pageNumber], (curElem) => {
                return curElem?.filter((post) => post.id !== id)
            })
        }
    });

    const updateMutation = useMutation({
        mutationFn: (id) => updatePost(id),
        onSuccess: (apiData, postId) => {

            queryClient.setQueryData(['posts', pageNumber], (postsData) => {
                return postsData?.map((curPost) => {
                    return curPost.id === postId
                        ? { ...curPost, title: apiData.data.title }
                        : curPost
                });
            });
        },
    });

    if (isPending)
        return (
            <div className="text-6xl h-lvh flex justify-center items-center">
                <img src={reactLogo} alt="Loading" className="h-50 animate-spin" />
            </div>
        );

    if (isError)
        return <h1 className="text-6xl">{error.message || 'Try Fixing Api'}</h1>;

    return (
        <div className="min-h-screen bg-gray-50 p-6 lg:p-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8 border-b pb-4">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Items List
                    </h1>
                    <span className="text-sm font-medium text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                        Page {pageNumber / 16 + 1}
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {data?.map((ele) => (
                        <div
                            key={ele.id}
                            className="relative group bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all duration-300"
                        >
                            <NavLink
                                to={`/rq/${ele.id}`}
                                className="flex items-center p-5 pr-12"
                            >
                                <span className="shrink-0 w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg text-xs font-bold uppercase">
                                    {ele.id}
                                </span>
                                <h2 className="ml-4 text-sm font-semibold text-gray-800 truncate capitalize">
                                    {ele.title}
                                </h2>
                            </NavLink>


                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 ">
                                <button
                                    onClick={() => updateMutation.mutate(ele.id)}
                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                    title="Update Item"
                                >
                                    <Pencil size={18} />
                                </button>
                                <button
                                    onClick={() => deleteMutation.mutate(ele.id)}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                    title="Delete Item"
                                >
                                    <Trash size={18} />
                                </button>
                            </div>

                        </div>
                    ))}
                </div>

                <div className="mt-12 flex items-center justify-center gap-4">
                    <button
                        disabled={pageNumber === 0}
                        onClick={() => setPageNumber((prev) => prev - 16)}
                        className="flex items-center px-6 py-2.5 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        Previous
                    </button>

                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-200">
                        {pageNumber / 16 + 1}
                    </div>

                    <button
                        disabled={pageNumber + 16 >= 100}
                        onClick={() => setPageNumber((prev) => prev + 16)}
                        className="flex items-center px-6 py-2.5 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FetchRQ;
