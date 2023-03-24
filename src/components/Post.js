import React, {memo, useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

// wrapping a functional component with memo ensures that it only rerenders if the props 
// it receives are the same object (not just look the same, they ARE the SAME)
export const Post = memo(() => {
    const {id} = useParams()
    const [post, setPost] = useState()
    const navigate = useNavigate()

    const deletePost = async (id) => {
        await deleteDoc(doc(db, "posts", id))
        navigate('/')
    }
    
    const getPost = async () => {
        const docRef = doc(db, "posts", id)
        const docSnap = await getDoc(docRef)
        // console.log("Post:", docSnap.data())
        setPost(docSnap.data())
    }
    useEffect(() => {
        getPost()
    }, [])
    return (
        <>
        {post 
            ? <>
                <h3>{post.title}</h3>
                <div>Created: {post.created.toDate().toLocaleDateString()}</div>
                <div>{post.text}</div>
                <button onClick={() => {navigate("/edit/" + id, {state: {title: post.title, text: post.text}})}}>Edit Post</button>
                <button onClick={() => deletePost(id)}>Delete this post</button>
            </>
            : <h3>Loading...</h3>
        }
        </>
    )
})

// NOTE on memo:
// one "gotcha" here is when you are passing in a prop that is re-instantiated every time the Application re-renders
// for example, doing this in a parent component:
//      const value = {}
// and passing value as a prop into a child component that is wrapped in memo (like the above) will make the memoization meaningless, because
// `{}` creates a NEW object instance every time it is called, and it will be called on every re-render of the parent component.
// In other words, even if it looks the same it isn't the same object in memory and so the child component will re-render regardless.