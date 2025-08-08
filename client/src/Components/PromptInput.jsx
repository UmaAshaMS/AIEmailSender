import React, { useState } from 'react'
import { useEmail } from '../Context/EmailContex'

function PromptInput() {

    const { prompt, setPrompt, setEmailContent } = useEmail()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleGenerateEmail = async () => {
        setLoading(true)
        setError('')

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/email/generate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt
                }),
            })

            const data = await res.json()
            if (res.ok) {
                setEmailContent(data.emailText);
            }
            else {
                setError(data.error || "Failed to generate email");
            }
        }
        catch (error) {
            setError("Error connecting to server");
        }finally {
            setLoading(false);
          }



    }

    return (
        <>
            <div className='mb-4'>
                <label className='block font-semibold mb-1'>Prompt</label>
                <textarea
                    className='w-full border p-2 rounded'
                    placeholder='Enter the subject of email  : '
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />

                <button
                    type='button'

                    onClick={handleGenerateEmail}
                    className='cursor-pointer mt-2  text-white bg-black  px-4 py-2 rounded-full hover:bg-gray-600 disabled:opacity-50'
                    disabled={!prompt || loading}
                >
                    {loading ? 'Generating...' : 'Draft'}
                </button>

                {error && <p className='text-red-500 mt-1 text-sm'>{error}</p>}

            </div>

        </>
    )
}

export default PromptInput