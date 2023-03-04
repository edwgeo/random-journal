import { Post } from "./components/Post";
import { Posts } from "./components/Posts";
import { Routes, Route, Link } from "react-router-dom";
import React, { useEffect, useState, useMemo } from 'react';
import { db } from './firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { PostsContext } from "./utils/PostsContext";
import { CreatePost } from "./components/CreatePost";
import EditPost from "./components/EditPost";
import { About } from "./components/About";

function App() {
	const [posts, setPosts] = useState([])
	// why we're using useMemo here: https://dmitripavlutin.com/react-context-and-usecontext/ (4. Updating the Context)
	// and: https://beta.reactjs.org/reference/react/useMemo#skipping-re-rendering-of-components
	const value = useMemo(
		() => ({posts, setPosts}), 
		[posts]
	)

	// asynchronously get the posts from firebase
	const getPosts = async () => {
		const querySnapshot = await getDocs(collection(db, "posts"))

		const simplifiedPostData = []
		querySnapshot.forEach(doc => {
			// console.log(doc.id, " => ", doc.data());
			simplifiedPostData.push({ id: doc.id, data: doc.data() })
		})
		// console.log(simplifiedPostData)
		setPosts(simplifiedPostData)
	}

	useEffect(() => {
		getPosts()
	}, [])

	return (
		<PostsContext.Provider value={value}>
		<center>
		<div className="App">
			<nav>
				[ <a href="/">All Posts </a> |
				<Link to="/create"> Create a Post</Link> |
				<Link to="/about"> About</Link> ]
			</nav>
			<Routes>
				<Route path="/" element={<Posts />} />
				<Route path="/post/:id" element={<Post />} />
				<Route path="/create" element={<CreatePost />} />
				<Route path="/about" element={<About />} />
				<Route path="/edit/:id" element={<EditPost />} />
			</Routes>
		</div>
		</center>
		</PostsContext.Provider>
	);
}

export default App;

// Note on useMemo:
// the useMemo hook takes in two things - a callback, and a dependency array.
// Just like in useEffect, the callback is only called when any of the items in the dependency array changes.
// In this case we can implement `value` in two ways:
	// const value = {posts, setPosts}
// or:
	// const value = useMemo( () => ({posts, setPosts}), [posts] )
// using the first method: every time App re-renders, `value` will be set to a NEW object (even if it looks the same as the old one)
// Remember how every Context Consumer (the children within the Context Provider) re-renders once the value in the Context Provider changes?
// In this case, that means that every time App re-renders, `value` will be set to a new object, and every Context Consumer will re-render too.