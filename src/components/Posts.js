import React, { useContext, memo } from 'react';
import { Link } from 'react-router-dom';
import { PostsContext } from '../utils/PostsContext';

export const Posts = memo(() => {
    const {posts, setPosts} = useContext(PostsContext)
    return (
        <div>
            <h2>All Posts</h2>
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