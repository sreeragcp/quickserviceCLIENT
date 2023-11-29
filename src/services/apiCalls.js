import axios from "axios";

export const commonRequest = async(method, url, body, header,tocken)=>{

    const config = {
        method,
        url,
        headers:header?header
        :{
            'Authorization': `Bearer ${tocken}`,
            "Content-Type":"application/json"
        },
        data:body
    }
    return axios(config).then((data)=>{
        return data
    }).catch((error)=>{
        console.log(error,'this is error')
        return error
    })
}


export const commonRequestAdmin = async(method, url, body, header,tocken)=>{
    const config = {
        method,
        url,
        headers:header?header
        :{
            'Authorization': `Bearer ${tocken}`,
            "Content-Type":"application/json"
        },
        data:body
    }
    return axios(config).then((data)=>{
        return data
    }).catch((error)=>{
        console.log(error,'this is error')
        return error
    })
}

export const commonRequestPartner = async(method, url, body, header,tocken)=>{
    const config = {
        method,
        url,
        headers:header?header
        :{
            'Authorization': `Bearer ${tocken}`,
            "Content-Type":"application/json"
        },
        data:body
    }
    return axios(config).then((data)=>{
        return data
    }).catch((error)=>{
        console.log(error,'this is error')
        return error
    })
}

