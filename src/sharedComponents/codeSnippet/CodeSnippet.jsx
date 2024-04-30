import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { IoCopyOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { useState } from 'react';



const CodeSnippet = ({codes}) => {
    // console.log(codes);

    const [copy, setCopy] = useState(false)

   
    const codeString = `${codes}`;


    return (
        <section className=' font-bold flex justify-start  items-center h-fit mt-6 pt-4'>
            <div className='max-w-2xl min-w-[23rem] bg-[#3a404d] rounded-md overflow-hidden ' >

                <div className='flex justify-between text-white text-2xl  items-center px-5'>
                    <p className='text-sm'>
                        The Example of codes</p>
                    {
                        copy ?
                            <button className='flex gap-1 items-center text-sm font-semibold py-1'>
                                <FaCheck></FaCheck>
                                <p> copied</p>
                            </button>
                            :
                            <button
                                onClick={() => {
                                    setCopy(true);
                                    navigator.clipboard.writeText(codeString);
                                    setTimeout(() => {
                                        setCopy(false)
                                    }, 2000)
                                }}
                                className='flex gap-1 items-center text-sm font-semibold py-1'>
                                <IoCopyOutline></IoCopyOutline>
                                <p> copy code</p>
                            </button>
                    }
                </div>
                <SyntaxHighlighter language="javascript" style={atomOneDark} customStyle={{ padding: '20px' }} wrapLongLines={false}>
                    {codeString}
                </SyntaxHighlighter>
            </div>

        </section>
    );
};

export default CodeSnippet;