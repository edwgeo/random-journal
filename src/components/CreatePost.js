import React, {memo, useRef} from "react";
import '../css/CreatePost.css';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export const CreatePost = memo(() => {
    const navigate = useNavigate()
    // using refs rather than using state; we avoid rerendering on every new letter this way
    const titleRef = useRef(null)
    const textRef = useRef(null)
    const submitRef = useRef(null)
    const createDoc = async () => {
        const docRef = await addDoc(collection(db, "posts"), {
            title: titleRef.current.value,
            text: textRef.current.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        submitRef.current.setAttribute("disabled", true)
        console.log("Create Post title: ", titleRef.current.value)
        console.log("Create Post text: ", textRef.current.value)
        await createDoc()
        submitRef.current.removeAttribute("disabled")
        titleRef.current.value = ""
        textRef.current.value = ""
        navigate('/')
    }
    
    return (
        <>
            <form>
                <div>Title: <input className='input-with-padding' ref={titleRef} placeholder="title"></input></div>
                <div>
                    <textarea 
                        className='input-with-padding'
                        ref={textRef}
                        placeholder="Enter your text here..." 
                        rows='8' 
                        cols='80'
                    >
                    </textarea>
                </div>
                <button ref={submitRef} onClick={handleSubmit} type='submit'>Submit</button>
            </form>
        </>
    )
})