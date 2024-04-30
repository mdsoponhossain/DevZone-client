import { useLoaderData } from 'react-router-dom';
import CodeSnippet from '../../sharedComponents/codeSnippet/CodeSnippet';
import { useContext } from 'react';
import { Context } from '../../contextApi/ContextProvider';
const BlogDetails = () => {
    const data = useLoaderData();
    const { toTitleCase, toSentenceCase,convertUTCtoLocal } = useContext(Context)
    // console.log(data);
    return (
        <div className=' max-h-[96vh] min-h-[96vh] md:max-h-[89vh] md:min-h-[89vh] overflow-y-hidden'>
            <p className='w-[97%] roboto-regular text-center'><span className='font-bold text-md   text-justify'>{toTitleCase(data?.tag)}</span> in details</p>
            <div key={data?._id} className="card-body p-3 md:p-5 lg:p-8  text-justify h-[100vh] overflow-y-auto overflow-x-hidden">
                <h2 className="card-title roboto-bold">{toTitleCase(data?.title)}</h2>
                {

                    data?.date && <p className="pl-2 text-xs flex justify-end "> Posted on {convertUTCtoLocal(data?.date)}</p>

                }
                <p className='roboto-regular'>{data?.topic}</p>
                {
                    data?.codeOne && <CodeSnippet codes={data?.codeOne}></CodeSnippet>
                }
                <p className='roboto-regular'>{toSentenceCase(data?.overview)}</p>
                {
                    data?.codeTwo && <CodeSnippet codes={data?.codeTwo}></CodeSnippet>
                }
                <p className="mb-6 pb-6 roboto-regular "> <span className="roboto-bold">Note:</span> {toSentenceCase(data?.note)}</p>
                <p className='roboto-regular'>{toSentenceCase(data?.description)}</p>
            </div>
        </div>
    );
};

export default BlogDetails;