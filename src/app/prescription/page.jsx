"use client"
import { useState } from "react";
import OpenAI from "openai";
import { IoMdRefresh } from "react-icons/io";
import { FaSearch } from "react-icons/fa";

export const openai = new OpenAI({ 
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
})
export default function Chatbot() {
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleUserInput = async () => {
        setChatHistory(prevChat => [
            ...prevChat, { role: 'user', content: userInput },
        ]);
        setUserInput('');
        try{
            const chatCompletion = await openai.chat.completions.create({
                messages: [...chatHistory, { role: 'system', content: `I am suffering from ${userInput}.Give me food and exercises to overcome that disease in 5 sentences.` }],
                model: 'gpt-3.5-turbo-0125',
            });

            setChatHistory(prevChat => [
                ...prevChat,
                {
                    role: 'assistant',
                    content: chatCompletion.choices[0].message.content
                }
            ]);
        }
        catch(err)
        {
            console.log(err)
        }
    };

    return (
        <div className="flex flex-col justify-between" style={{ height: 'calc(100vh - 10vh)' }}>
            <div onClick={()=>setChatHistory([])}className="flex text-white justify-between p-3 bg-teal-500">
                <h1 className="font-semibold">HealCare</h1>
                <h1><IoMdRefresh className="h-6 w-6"/></h1>
            </div>
            <div>
                <div className="overflow-auto p-2 bg-white">
                    {
                        chatHistory.map((message, index) => (
                            <div key={index} className="text-gray-500">
                                <div>
                                    {
                                    message.role === 'user' ? <img src="https://icons.veryicon.com/png/o/internet--web/web-interface-flat/6606-male-user.png" alt="#" className="h-7 w-7 rounded-full"/> : 
                                    <img src="https://miro.medium.com/v2/resize:fit:962/1*I9KrlBSL9cZmpQU3T2nq-A.jpeg" alt="#" className="h-7 w-7 rounded-full border border-teal-500 p-1"/>
                                    }
                                </div>
                                <div className={`${message.role === 'user' ?"bg-slate-200":"bg-neutral-200"} rounded-md text-sm font-medium p-2 my-1.5`}>
                                    {message.content}
                                </div>  
                            </div>
                        ))
                    }
                </div>
                <div className="flex justify-center p-2  bg-teal-500">
                        <input type="text" className="p-2 w-full outline-none rounded-s-md text-sm font-medium" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Enter your disease here"/>
                        <button onClick={handleUserInput} className="text-teal-500 bg-white p-2 rounded-e-md"><FaSearch className="h-6 w-5"/></button>
                </div>
            </div>
        </div>
        
    );
}

