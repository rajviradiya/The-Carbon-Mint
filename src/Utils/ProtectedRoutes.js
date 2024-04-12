import React from 'react'
import { useFierbase } from '../context/fierbasecontext'
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
    const fierbase = useFierbase()
    if (fierbase?.multipleLandParcel) {
        return fierbase.multipleLandParcel ? children : <Navigate to="/" />
    }
}

export default ProtectedRoutes