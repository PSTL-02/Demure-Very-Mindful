import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    // error check - check that context is available
    // ie are you using it inside of the AuthContext.Provider component
    if(!context){
        throw Error('useAuthContext must be used inside of AuthContextProvider')
    }

    return context
}