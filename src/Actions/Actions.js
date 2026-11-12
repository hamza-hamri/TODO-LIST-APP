import {ADD  , UPDATE  , DELETE  , DELETE_ALL} from './TypeActions';

export  function AddTask (nom , description , priorite , deadline , progres)
{
    return {type : ADD , payload : {nom ,description ,  priorite , deadline , progres }}
}

export  function UpdateTask (indice , nom , description , priorite , deadline , progres)
{
    return {type : UPDATE  , payload : {indice , nom , description , priorite , deadline , progres}}
}

export  function DeleteTask (indice)
{
    return {type : DELETE  , payload : {indice}}
}

export  function DeleteAllTask ()
{
    return {type : DELETE_ALL}
}

