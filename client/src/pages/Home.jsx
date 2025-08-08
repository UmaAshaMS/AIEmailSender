import React, { useEffect } from 'react'
import axios from 'axios'
import EmailEditor from '../Components/EmailEditor'
import PromptInput from '../Components/PromptInput'
import RecipientInput from '../Components/RecipientInput'

function Home() {
    // useEffect(() => {
    //     axios.get(`${import.meta.env.VITE_API_URL}/`)
    //       .then(res => {
    //         setMessage(res.data)
    //       })
    //       .catch(err => {
    //         console.error('Error fetching from backend:', err)
    //       })
    //   }, [])
    return (
        <>
            <div className="min-h-screen bg-gray-100 p-6">
                <h1 className="text-3xl font-bold underline text-center p-2">
                    AI Email Sender!
                </h1>
                <div className="max-w-2xl mx-auto space-y-6 bg-white p-6 rounded shadow">
                    <PromptInput />
                    <EmailEditor />
                    <RecipientInput />
                </div>
            </div>
        </>
    )
}

export default Home