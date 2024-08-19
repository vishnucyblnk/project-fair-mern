import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { BASEURL } from '../services/baseUrl';
import { editProfileAPI } from '../services/allApis';
import { ToastContainer, toast } from 'react-toastify';

function Profile() {
    const [preview, setPreview] = useState("")
    const user = JSON.parse(localStorage.getItem('existingUser'));
    const [userData,setUserData] = useState({
        id: user._id, username: user.username, email: user.email, password: user.password, github: user.github || '', linkedin: user.linkedin || '', profImg: user.profImg || ''
    })

    useEffect(() => {
        // if (userData.profImg && userData.profImg instanceof File) {
        //     setPreview(URL.createObjectURL(userData.profImg))
        // }else{
        //     setPreview("https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-1024.png")
        // }   
        if (userData.profImg) {
            setPreview(URL.createObjectURL(project.projectImage))
        }
    }, [userData.profImg])

    // useEffect(()=>{
    //     const user = JSON.parse(localStorage.getItem('existingUser'));
    //     if(user){
    //         setUserData((prevState)=>({
    //             ...prevState, id: user._id, username: user.username, email: user.email, password: user.password, github: user.github || '', linkedin: user.linkedin || '', profImg: user.profImg || ''})
    //         )
    //     }
    // },[userData.profImg]);


    const handleUpdate = async (e) => {
        e.preventDefault()
        const { id, username, email, password, github, linkedin, profImg } = userData
        if (!username || !email || !password || !github || !linkedin ) {
            alert("please fill the form completely")
        } else {
            const token = sessionStorage.getItem("token")
            const reqBody = new FormData()
            reqBody.append("username", username)
            reqBody.append("email", email)
            reqBody.append("password", password)
            reqBody.append("github", github)
            reqBody.append("linkedin", linkedin)
            if (profImg instanceof File) {
                reqBody.append("profImg", profImg);
            }
            if (profImg) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}`
                }
                const res = await editProfileAPI(id, reqBody, reqHeader)
                if (res.status === 200) {
                    localStorage.setItem("existingUser", JSON.stringify(res.data.updateProfile))
                    localStorage.setItem("Role", res.data.role)
                    toast.success('Profile updated successfully');
                } else {
                    toast.warning(res.response.data)
                }

            } else {
                const reqHeader = {
                    "Content-Type": "application/json", "Authorization": `Bearer ${token}`
                }
                const res = await editProfileAPI(id, reqBody, reqHeader)
                if (res.status === 200) {
                    localStorage.setItem("existingUser", JSON.stringify(res.data.updateProfile))
                    localStorage.setItem("Role", res.data.role)
                    toast.success('Profile updated successfully');

                } else {
                    toast.warning(res.response.data)
                }
            }
        }
    }

    console.log(userData);

    return (
        <>
            <div className='card shadow p-5'>
                <div className='d-flex justify-content-between'>
                    <h2>My Profile</h2>
                </div>
                <div className='row justify-content-center mt-3'>
                    {/* picture */}
                    <label htmlFor="profile" className='text-center' >
                        <input id='profile' type="file" style={{ display: 'none' }} onChange={e => setUserData({ ...userData, profImg: e.target.files[0] })}/>
                        <img width={'200px'} height={'200px'} className='rounded-circle' src={preview ? preview : `https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-1024.png`} alt="profile-pic" />
                        
                    </label>
                    <div className='mb-3'>
                        <input type="text" className='form-control' placeholder='Username' value={userData?.username} onChange={e => setUserData({ ...userData, username: e.target.value })} />
                    </div>
                    <div className='mb-3'>
                        <input type="text" className='form-control' placeholder='Email' value={userData?.email} onChange={e => setUserData({ ...userData, email: e.target.value })} />
                    </div>
                    <div className='mb-3'>
                        <input type="text" className='form-control' placeholder='Password' value={userData?.password} onChange={e => setUserData({ ...userData, password: e.target.value })} />
                    </div>
                    <div className='mb-3'>
                        <input type="text" className='form-control' placeholder='Github ' value={userData?.github} onChange={e => setUserData({ ...userData, github: e.target.value })} />
                    </div>
                    <div className='mb-3'>
                        <input type="text" className='form-control' placeholder='LinkedIn' value={userData?.linkedin} onChange={e => setUserData({ ...userData, linkedin: e.target.value })} />
                    </div>
                    <Button onClick={handleUpdate} variant="primary"> Update Profile</Button>
                </div>
            </div>
            <ToastContainer position="top-center" autoClose={5000} theme="colored" />
        </>
    )
}

export default Profile