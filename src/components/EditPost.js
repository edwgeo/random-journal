import React, {memo, useEffect, useRef} from "react";
import '../css/CreatePost.css';
import { collection, addDoc, doc, updateDoc } from "firebase/firestore"; 
import { db } from "../firebase/firebase";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const EditPost = memo(() => {
    const {id} = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    console.log(location)
    const {title, text} = location.state

    // using refs rather than using state; we avoid rerendering on every new letter this way
    const titleRef = useRef(null)
    const textRef = useRef(null)
    const submitRef = useRef(null)
    const modifyDoc = async () => {
        const docRef = doc(db, "posts", id);
        await updateDoc(docRef, {
            title: titleRef.current.value,
            text: textRef.current.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        submitRef.current.setAttribute("disabled", true)
        console.log(titleRef.current.value)
        console.log(textRef.current.value)
        await modifyDoc()
        submitRef.current.removeAttribute("disabled")
        titleRef.current.value = ""
        textRef.current.value = ""
        navigate(-1) // same as clicking back button
    }
    useEffect(() => {
        titleRef.current.value = title;
        textRef.current.value = text;
    }, [])
    
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

export default EditPost;