import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEmail } from '../Context/EmailContex'

function RecipientInput() {
    const { recipients, setReceipients, emailContent } = useEmail();
    const [input, setInput] = useState('')
    const [error, setError] = useState('')

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email)
    }


    const handleAddEmail = () => {

        if (!validateEmail(input)) {
            setError('Invalid email address!')
            return;
        }

        if (recipients.includes(input)) {
            setError('Email already exists!')
            return;
        }
        setReceipients([...recipients, input])
        setInput('')
        setError('')
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddEmail()
        }
    }

    const handleRemove = (emailToRemove) => {
        setReceipients(recipients.filter((email) => email !== emailToRemove))
    }

    const handleSendEmail = async () => {
        if (recipients.length === 0) {
            setError("Please add at least one recipient");
            return;
        }

        try {

            const subjectRes = await fetch(`${import.meta.env.VITE_API_URL}/api/email/generate-subject`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: emailContent }),
            });

            const subjectData = await subjectRes.json();
            const generatedSubject = subjectRes.ok ? subjectData.subject : "No Subject";


            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/email/send`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    recipients,
                    subject: generatedSubject,
                    body: emailContent,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                console.log('Done email')
                alert('Email send !!')
                // toast.success("Email sent successfully!");
                setError('');

            } else {
                // toast.error(data.error || "Failed to send email");
                setError(data.error || "Failed to send email");
            }
        } catch (err) {
            setError("Error connecting to server");
        }
    }

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className='mb-4'>
                <label className='block text-bold mb-1 font-semibold black'>Recipeints</label>
                <div className='w-full border p-2 rounded'>
                    <input
                        type='email'
                        placeholder='Enter Recipeints Email ID: '
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className=' p-2 rounded w-full'
                        onKeyDown={handleKeyDown}
                    />
                    {/* <button type='button' className='bg-gray-300 text-black px-2 py-2 rounded-full' onClick={handleAddEmail} >
                        +
                    </button> */}
                </div>
                {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
                <div className='mt-2 flex flex-wrap gap-2'>
                    {recipients.map((email) => (
                        <span key={email} className='p-1 bg-gray-200 rounded-full flex items-center gap-2'>{email}
                            <button type='button' onClick={() => handleRemove(email)} className='text-black-500'>&times;</button>
                        </span>
                    ))}
                </div>
                <div className='items-center justify-center flex '>
                    <button className='p-4 rounded-full bg-black text-center font-bold text-white hover:bg-white hover:text-black border-2 cursor-pointer'

                        onClick={handleSendEmail}>
                        Send Email
                    </button>
                </div>

            </div>
        </>
    )
}

export default RecipientInput