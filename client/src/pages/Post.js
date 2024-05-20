import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Post() {
    const { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const postResponse = await axios.get(`http://localhost:1620/posts/byId/${id}`);
                setPostObject(postResponse.data);
                
                const commentsResponse = await axios.get(`http://localhost:1620/comments/${id}`);
                setComments(commentsResponse.data);
            } catch (error) {
                console.error("Error fetching post data:", error);
            }
        };

        fetchPostData();
    }, [id]);

    const addComment = async () => {
        
            const response = await axios.post(`http://localhost:1620/comments`, {
                commentBody: newComment,
                PostId: id
            }, 
            {
                headers:{
                    accessToken: sessionStorage.getItem("accessToken")
                }
            }).then((response) => {
                if(response.data.error){
                    console.log(response.data.error);
                }
                else{

                
            
            //console.log("Comment added.");
            setComments([...comments, response.data]);
            setNewComment(""); // Clear input field
        }})
    };

    return (
        <div className="postPage">
            <div className="leftSide">
                <div className="post" id="individual">
                    <div className="title">{postObject.title}</div>
                    <div className="body">{postObject.postText}</div>
                    <div className="footer">{postObject.username}</div>
                </div>
            </div>
            <div className="rightSide">
                <div className='addCommentContainer'>
                    <input type="text" placeholder='Comment..' autoComplete='off'
                           value={newComment} onChange={(event) => setNewComment(event.target.value)} />
                    <button onClick={addComment}>Add Comment</button>
                </div>
                <div className='listOfComments'>
                    {comments.map((comment, key) => (
                        <div key={key} className='comment'>{comment.commentBody}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Post;
