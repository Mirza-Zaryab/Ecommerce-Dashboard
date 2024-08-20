import React from 'react'
import { useDispatch } from 'react-redux'

import { getRequest } from '.';
import { setUser } from '../Redux/Reducers/authSlice';
import store from '../Redux/store';
import { setLoader } from '../Redux/Reducers/gernalSlice';
import { routes } from './routes';





export const getProductsFunc = async (payload, cb, isLoader = false) => {

    const onSuccess = (res) => {
        cb({
            data: res,
        })
    }
    const onError = (err) => {
        cb({
            error: true, err: err
        });
    }
    isLoader && store.dispatch(setLoader(true))

    await getRequest(payload, routes.getProducts, true, onSuccess, onError);

}
