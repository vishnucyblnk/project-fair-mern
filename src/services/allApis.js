import { commonAPI } from "./commonApi";
import { BASEURL } from "./baseUrl";

// register API
export const registerAPI = async (user)=>{
    return await commonAPI("POST",`${BASEURL}/user/register`,user,"")
}

// login API
export const loginAPI = async (user)=>{
    return await commonAPI("POST",`${BASEURL}/user/login`,user,"")
}

// AddProject API
export const addProjectAPI = async (project,header)=>{
    return await commonAPI("POST",`${BASEURL}/projects/add`,project,header)
}

// getAllUserProjects API
export const userProjectAPI = async (header)=>{
    return await commonAPI("GET",`${BASEURL}/user/all-projects`,"",header)
}

// homeProjects API
export const homeProjectsAPI = async ()=>{
    return await commonAPI("GET",`${BASEURL}/home/projects`,"","")
}

// allProjects API
export const allProjectsAPI = async (searchKey,header)=>{
    return await commonAPI("GET",`${BASEURL}/projects/all?search=${searchKey}`,"",header)
}

// editproject API
export const editProjectAPI = async (projectId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${BASEURL}/project/edit/${projectId}`,reqBody,reqHeader)
}

// deleteproject API
export const deleteProjectAPI = async (projectId,reqHeader)=>{
    return await commonAPI("DELETE",`${BASEURL}/project/remove/${projectId}`,{},reqHeader)
}

// editprofile API
export const editProfileAPI = async (profileId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${BASEURL}/profile/edit/${profileId}`,reqBody,reqHeader)
}

