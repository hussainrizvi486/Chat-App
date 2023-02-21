import React, { useEffect, useRef, useState } from 'react'
import { signOut } from 'firebase/auth';
import { addDoc, collection, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { GoSignOut } from 'react-icons/go';
import { IoSend } from 'react-icons/io5';

import Message from './Message'

const ChatRoom = ({ auth, db, user }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef();

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        console.log("down")
    };

    const logOutHandler = () => signOut(auth);

    const SubmitHandler = async (e) => {
        e.preventDefault()
        setMessage("")
        try {
            await addDoc(collection(db, 'Messages'), {
                text: message,
                uid: user.uid,
                url: user.photoURL,
                createdAt: serverTimestamp(),
            });

            scrollToBottom()

        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        const q = query(collection(db, "Messages"), orderBy('createdAt', 'asc'));
        const snp = onSnapshot(q, (snap) => {
            setMessages(snap.docs.map((i) => {
                const id = i.id;
                return { id, ...i.data() }
            }))
        })
        return () => {
            snp()
        }

    }, [auth, db]);

    
    return (
        <div className='chat-room'>
            <header>
                <h2>⚛️🔥💬</h2>
                <GoSignOut onClick={logOutHandler} />
            </header>
            <div className="chats">
                {messages.map(i => (
                    <Message
                        key={i.id}
                        user={i.uid === user.uid ? "me" : "other"}
                        text={i.text}
                        uri={i.url} />
                ))}

                <div style={{ float: "left", clear: "both" }}
                    ref={messagesEndRef}>
                </div>
            </div>


            <form className="msg-box" onSubmit={SubmitHandler}>
                <input type="text" placeholder='Enter your Message' value={message} onChange={(e) => { setMessage(e.target.value) }} required />
                <button type="submit">
                    <IoSend />
                </button>

            </form>
        </div>
    )
}

export default ChatRoom