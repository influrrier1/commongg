import React from 'react';
import TextPost from './TextPost.js';
import VideoPost from './VideoPost.js';
import ImagePost from './ImagePost.js';

function Post(props) {
    console.log(props.post)
    if (props.post.type === "text") {
        return (
            <div className="Post">
                {console.log("Making text post for: ", props.post)}
                <TextPost post={props.post} />
                <br/>
            </div>
        );
    } else if (props.post.type === "image") {
        return (
            <div className="Post">
                <ImagePost post={props.post} />
                <br/>
            </div>
        );
    } else if (props.post.type === "video") {
        return (
            <div className="Post">
                <VideoPost post={props.post} />
                <br/>
            </div>
        );
    }
}

export default Post;
