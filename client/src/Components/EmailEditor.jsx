import React, { useEffect } from 'react'
import { useEmail } from '../Context/EmailContex'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder'

function EmailEditor() {
    const { emailContent, setEmailContent } = useEmail()
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Write or edit your email here '
            }),
        ],
        content: emailContent,
        onUpdate({ editor }) {
            setEmailContent(editor.getHTML())
        }
    })

    useEffect(() => {
        if (editor && emailContent !== editor.getHTML()) {
            editor.commands.setContent(emailContent)
        }
    }, [editor, emailContent])

    return (
        <>
            <div className='mb-4'>
                <label className='font-bold mb-1 black'>Email Editor</label>
                {/* <textarea className='w-full border p-2 rounded' value={emailContent} placeholder='Write or edit your email here' /> */}
                <div className='border p-2 rounded min-h-[150px] focus-within:outline-none focus-within:ring-0'>
                    <EditorContent editor={editor} className='min-h-[150px] outline-none max-w-none'/>
                </div>
            </div>
        </>
    )
}

export default EmailEditor