import React, { useEffect, useContext, memo } from 'react';
import { Link } from 'react-router-dom';
import { PostsContext } from '../utils/PostsContext';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const Posts = memo(() => {
    const {posts, setPosts} = useContext(PostsContext)
    
    // asynchronously get the posts from firebase
	const getPosts = async () => {
		const querySnapshot = await getDocs(collection(db, "posts"))

		const simplifiedPostData = []
		querySnapshot.forEach(doc => {
			// console.log(doc.id, " => ", doc.data());
			simplifiedPostData.push({ id: doc.id, data: doc.data() })
		})
		console.log(simplifiedPostData)
		setPosts(simplifiedPostData)
	}

	useEffect(() => {
		getPosts()
	}, [])
    
    // Note: encapsulate all the state changing functionality into a reducer function:
    // - sorting
    // - initially getting the posts
    // To do this, you would need to change App.js's code to have the reducer function. Then pass the dispatch and state into the provider.
    
    const sortAscendingDate = (p) => {
        // [...p] makes a copy of the list. Since .sort sorts the item in place, 
        // it fools React and doesn't rerender because it's technically the same object.
        // https://stackoverflow.com/questions/50288154/react-component-doesnt-rerender-after-sorting-array-in-store
        return [...p].sort((x,y) => x.data.created.seconds - y.data.created.seconds)
    }

    const sortAlphabetical = (p) => {
        return [...p].sort((x,y) => ('' + x.data.title).localeCompare(y.data.title))
    }

    const onSortChange = (e) => {
        e.preventDefault()
        if (e.target.value == 'date_ascending') {
            console.log('a')
            setPosts(p => sortAscendingDate(p))
        } else if (e.target.value == 'date_descending') {
            console.log('b')
            setPosts(p => sortAscendingDate(p).reverse())
        } else if (e.target.value == 'alphabetical') {
            setPosts(p => sortAlphabetical(p))
        } else {
            console.log('invalid sort selection')
            setPosts(p => p)
        }

    }
    
    return (
        <div>
            <h2>All Posts</h2>
            <div>
                Sort by: 
                <select name='sort' onChange={(e) => onSortChange(e)}>
                    <option value='date_ascending'>Oldest to newest</option>
                    <option value='date_descending'>Newest to oldest</option>
                    <option value='alphabetical'>Alphabetical</option>
                </select>
            </div>
            {posts.length > 0
            ? posts.map((post) => {
                console.log(post)
                return (
                    <div key={post.id}>
                        <Link to={"/post/"+post.id}>{post.data.title}</Link>
                    </div>
                )
            })
            : <div>Loading...</div>
            }
        </div>
    )
})

// display the list of posts as links
// link should send user to the post in question
// use navigate() to send them to these posts
// should/could we use useContext to store the post data? We've already queried and got all the posts and their data
// otherwise, we would need to make another call to firebase to get the post based on the id.