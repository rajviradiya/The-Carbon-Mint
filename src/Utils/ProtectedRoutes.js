import React from 'react'
import { useFierbase } from '../context/fierbasecontext'
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
    const fierbase = useFierbase()
    return  children 

    // return fierbase.authuserrrr ? children : <Navigate to="/" />
}

export default ProtectedRoutes