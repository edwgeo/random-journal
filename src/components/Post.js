import React, {memo, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Link } from 'react-router-dom';

// wrapping a functional component with memo ensures that it only rerenders if the props 
// it receives are the same object (not just look the same, they ARE the SAME)
export const Post = memo(() => {
    const {id} = useParams()
    const [post, setPost] = useState()
    
    const getPost = async () => {
        const docRef = doc(db, "posts", id)
        const docSnap = await getDoc(docRef)
        console.log(docSnap.data())
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
                <div>{post.text}</div>
                <Link to={"/edit/" + id} state={{title: post.title, text: post.text}}>
                    Edit this post
                </Link>
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