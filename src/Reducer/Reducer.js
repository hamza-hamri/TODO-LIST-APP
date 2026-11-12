import {ADD , UPDATE , DELETE  , DELETE_ALL} from '../Actions/TypeActions';
import {produce} from 'immer'

const initialState = {taches : []}
export default function Taches (state = initialState , action)
{
    switch(action.type)
    {
        case ADD :
        {
            return {...state , taches : [...state.taches , {nom : action.payload.nom , description :  action.payload.description , priorite : action.payload.priorite , deadline :  action.payload.deadline , progres : action.payload.progres}]}
        }

        case UPDATE :
        {
            const updateTask = produce(state , draft =>
                {draft.taches.splice
                    (action.payload.indice , 1 , {nom : action.payload.nom , description :  action.payload.description , priorite : action.payload.priorite , deadline :  action.payload.deadline , progres : action.payload.progres})
                })
                return updateTask ;
        }

        case DELETE :
        {
            return {...state , taches : state.taches.filter((elt , i) => i != action.payload.indice)}
        }

        case DELETE_ALL:
        {
            return []
        }

        default:
            return state ;
    }
}