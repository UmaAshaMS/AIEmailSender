import { createContext, useContext, useState } from "react";

const EmailContext = createContext()

export const EmailProvider = ({ children }) => {
    const [prompt, setPrompt] = useState('')
    const [recipients, setReceipients] = useState([])
    const [emailContent, setEmailContent] = useState('')

    return (
        <EmailContext.Provider
            value={{
                prompt,
                setPrompt,
                recipients,
                setReceipients,
                emailContent,
                setEmailContent
            }}>
            {children}
        </EmailContext.Provider>
    )
}

export const useEmail = () => useContext(EmailContext);
