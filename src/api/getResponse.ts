export default async function getResponse(message: string): Promise<string> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Not Implemented")
        }, 5000)
    })
}
