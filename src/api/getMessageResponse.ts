const getMessageResponse = async(message: string) => {
    try{
        return new Promise<string>(resolve => {
            setTimeout(() => {
            const response = "NotImplemented"
            resolve(response)    
            }, 3000)
        })
    }catch(err){
        throw (err);
    }
}

export { getMessageResponse }