import React from 'react';

function ProfilePicture(props) {
  return (
    <div className="ProfilePicture">
        <img src={props.user.profile.profile_picture} alt={props.user.profile.username + "picture"} width={props.width} height={props.height} style={{borderRadius:"50%"}}></img>
    </div>
  );
}

export default ProfilePicture;