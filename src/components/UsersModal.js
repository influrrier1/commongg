import React, { useState, useEffect } from 'react';
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function UsersModal(props) {
    const [show, setShow] = useState(false);
    const [usersList, setUsersList] = useState([]);

    //on mount find following and follower 
    useEffect(() => {
        handleClose();
        setUsersList([]);
        var tempList = [];
        //fetch the usersList
        if (props.type === "following") {
            if (props.user.following != null) {
                Object.values(props.user.following).forEach((user) => {
                    //retrieve the users one by onbe
                    props.getUserWithId(user).then((curUser) => {
                        tempList.push({...curUser, id: user});
                    })
                });
            }
        } else if (props.type === "followers") {
            if (props.user.followers != null) {
                Object.values(props.user.followers).forEach((user) => {
                    //retrieve the users one by onbe
                    props.getUserWithId(user).then((curUser) => {
                        tempList.push({...curUser, id: user});
                    })
                });
            }
        }
        setUsersList(tempList);
        
        
    }, [props.user, props.type]);

    useEffect(() => {
        //if parent want the modal to show directly do it
        if (props.show === true) {
            setShow(true);
        };
    }, [props.show])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 

    const modalHeaderStyle = {
        borderBottom: "0 none",
        textAlign: "center"
    }

    const modalContentStyle = {
        color: "#BF9AFC",
        backgroundColor: "#202020",
        borderBottom: ""
    }

    const followStyle = {
        color: "#BF9AFC",
        fontSize: "1.6rem",
        marginRight: "1rem"
    };

    const numberStyle = {
        fontSize: "1.6rem",
        cursor: "pointer"
    };

    function checkTitle() {
        if (props.type === "following") {
            return (<Modal.Title>Following</Modal.Title>)
        } else if (props.type === "followers") {
            return (<Modal.Title>Followers</Modal.Title>)
        } else {
            return (<Modal.Title>Error</Modal.Title>)
        }
    }

    function checkButton() {
        if (props.type === "following") {
            return (
            <span role="button" onClick={handleShow} style={numberStyle}>{props.user.followCounts.following}
                <span style={followStyle}> following</span>
            </span>)
        } else if (props.type === "followers") {
            return (
                <span role="button" onClick={handleShow} style={numberStyle}>{props.user.followCounts.follower}
                    <span style={followStyle}> followers</span>
                </span>)
        }
        
    }

    function checkUsersList() {
        return (<>
            {usersList.map((user) => {
                return <Link to={"/profile/" + user.id}>
                <div className="row" style={{ width: "100%" }}>
                  <img
                    alt={user.username}
                    src={user.profile_picture}
                    style={{
                      borderRadius: '50%',
                      height: '1.8rem',
                      marginRight: '.8rem',
                      width: '1.8rem',
                    }}
                  />
                  <span style={{ color: "white", position: "relative", bottom: "-.2rem" }}>{user.username}</span>
                </div>
              </Link>
            })}
         </>)
    }
    
    return (
        <div className="CreateCommentModal" >
            {checkButton()}
            
            <Modal show={show} onHide={handleClose}>
                <div style={modalContentStyle}>
                    <Modal.Header closeButton style={modalHeaderStyle}>
                        {checkTitle()}
                    </Modal.Header>
                    <Modal.Body>
                        {checkUsersList()}
                    </Modal.Body>
                </div>
                
            </Modal>
        </div>
    )
}

export default UsersModal;