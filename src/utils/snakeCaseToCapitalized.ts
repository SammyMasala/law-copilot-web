export function snakeCaseToCapitalized(data: string): string{
    try{
        const splitString = data.replace("_", " ")
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

        return splitString        
    }catch(error){
        throw error
    }

}