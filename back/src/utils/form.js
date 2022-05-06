const getSuccesResponse = (code, data) => {
    return {
        code: code,
        data: data
    }
}

const nonDataSuccessResponse = (code) => {
    return {
        code: code
    }
}

const failResponse = (code, message) => {
    return {
        code: code,
        message: message
    } 
}

export {
    getSuccesResponse,
    nonDataSuccessResponse,
    failResponse
}