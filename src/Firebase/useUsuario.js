import {useEffect} from "react";
import {useState} from "react";
import {onChangeUser} from "./client";

const useUsuario = () => { 
    const [usuario, setUsuario] = useState(undefined)
    useEffect(() => {
        onChangeUser(setUsuario)
    }, [])

    return usuario
}

export default useUsuario
