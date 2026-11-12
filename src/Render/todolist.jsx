import {faClipboard , faPlus , faTrash  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon ,  } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import {useSelector , useDispatch} from 'react-redux'
import { AddTask, DeleteAllTask, DeleteTask, UpdateTask } from '../Actions/Actions';


export default function TodoList ()
{
    const [taskName , setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskPriority, setTaskPriority] = useState('');
    const [taskDeadline, setTaskDeadline] = useState('');
    const [taskProgres, setTaskProgres] = useState('');
    const [showTable , setShowTable ] = useState(false);
    const [indice , setIndice] = useState('');
    const [buttonText , setButtonText] = useState('Ajouter');
    const [erreur , setErreur] = useState();
    const myDispatch = useDispatch();
    const data = useSelector(D => D.taches);

    const ViderForm =()=>
        {
            setTaskName('');
            setTaskDescription('');
            setTaskPriority('');
            setTaskProgres('');
            setTaskDeadline('');
        }

    const ValiderForm  = () =>
        {
            

            if(taskName.trim() === '')
                return "The task name is mandatory!";
            if(taskDescription.length > 100)
                return  "The task description is mandatory!";
            if(taskPriority =='')
                return "You should pick The priority of your Task";
            if(taskProgres == '')
                return  "Select the progress status";
            if(taskDeadline == '')
            {
            return  'The deadline is mandatory !';
            }else{
                const Today = new Date().toLocaleDateString('en-CA');   
                if(taskDeadline < Today)
                    return  'The deadline cannot be in the past!' ;  
            }
            return '';
        }
    const Show  = () =>
        {
            
            const msg = ValiderForm()
            setErreur(msg);

            if(msg != '') return setErreur("Please fill in all the fields.");
            setShowTable(true);
            if(buttonText == "Ajouter")
                {
                    myDispatch(AddTask(taskName , taskDescription , taskPriority , taskDeadline , taskProgres))
                }
            else
            {
                myDispatch(UpdateTask(indice ,taskName , taskDescription , taskPriority , taskDeadline , taskProgres ))
                setButtonText('Ajouter');
            }
            ViderForm();
            ValiderForm();
        }
    const EditerTask = (elt , i) =>
        {
            setTaskName(elt.nom);
            setTaskDescription(elt.description);
            setTaskPriority(elt.priorite);
            setTaskDeadline(elt.deadline);
            setTaskProgres(elt.progres);

            setButtonText('Update')
        }
    
    const DeleteAll = () =>
        {
            
            myDispatch(DeleteAllTask());
            setShowTable(false);
            setButtonText('ADD Task')
            ViderForm();
            
        }
    return (
        <>
        
            <h1 className="text-amber-50 my-4 text-center mx-2 text-3xl font-blackops">TaskFlow.</h1>
            <div className=' my-5  flex text-center border-2 bg-[#D9DADC] border-white py-2 w-full flex-col'>
                <h6 className='text-3xl  text-black font-bold'><FontAwesomeIcon className='text-black text-3xl' icon={faClipboard}/>Task List.</h6>
                <p className='font-normal mt-2 text-slate-950 font-blackops'>Organize your day, one task at a time.</p>
            </div>
            <div className="mx-4 my-6 flex items-center gap-3 ">
            <h1 className=' text-3xl px-3  w-auto text-black font-bold inline rounded  font-serif bg-yellow-400 transition duration-500 cursor-pointer'> <FontAwesomeIcon icon={faPlus} className='text-center'/> ADD TASK</h1>  {erreur && (

    <p className="mx-3 my-2  px-4  text-center  py-2 rounded-xl border border-red-500/50 bg-red-500/10 text-red-400 text-lg">
        ⚠️ {erreur}
    </p>
)}
            </div>
            
            <div className='flex flex-col relative '>
            <label htmlFor='nomTask' className='mx-5 font-bold text-2xl mb-2 text-amber-50'>Task Name</label>
            <input id="nomTask" value={taskName} onChange={(e)=> setTaskName(e.target.value)} type="text" placeholder='Ex : Learn React.....' className='w-7xl mx-3 px-5 py-4 text-base text-white bg-slate-900 border border-slate-700 rounded-xl  placeholder:text-slate-500 outline-none transition-all duration-300  focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20  hover:border-slate-500' /> 
            <p className='mx-4 text-gray-400 my-1'>Give the task a clear name!</p>   
            </div>

            <div className='flex flex-col mt-5 relative'>
            <label htmlFor='descTask' className='mx-5 font-bold text-2xl mb-2 text-amber-50'>Task Description</label>
            <div className="relative mx-3">
             <textarea id="descTask" value={taskDescription}  onChange={(e)=> {setTaskDescription(e.target.value)}}   placeholder="Ex : I'll learn how to create a component...." className='w-7xl   p-4 pb-10 bg-slate-900 text-white border border-slate-700 rounded-xl outline-none  focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 transition-all' /> 
            {taskDescription.length > 100  ? (<span className="absolute bottom-3 right-57 text-xs text-red-600 font-bold">{taskDescription.length}/ 100</span> ): taskDescription.length===0? (<span className="absolute bottom-3 right-57 text-xs text-slate-400 font-bold">{taskDescription.length}/ 50</span> ): (<span className="absolute bottom-3 right-57 text-xs text-green-500">{taskDescription.length}/ 100</span>)} 
            </div>
            <p className='mx-4 text-gray-400 my-1'>A clear description, no more than 100 characters!</p>
            </div>

            <div className='flex flex-col   mt-5'>
            <label htmlFor='priorityTask' className='mx-5 font-bold text-2xl mb-2 text-amber-50'>Task Priority</label>
            <select id="priorityTask" value={taskPriority} onChange={(e)=>setTaskPriority(e.target.value)} className='w-7xl mx-3 px-5 py-4  bg-slate-900 text-white border border-slate-700 rounded-xl outline-none cursor-pointer transition-all duration-300 hover:border-violet-400  focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 focus:shadow-lg focus:shadow-violet-500/10"'>
                <option value="select the priority for your task...">Select the Priority For your Task...</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <p className='mx-4 text-gray-400 my-1'>Pick the Priority of Your Task !</p>  

            </div>

            <div className='flex flex-col mt-5 '>
            <label htmlFor='deadlineTask' className='mx-5 font-bold text-2xl mb-2 text-amber-50'>Task Deadline</label>
            <input id="deadlineTask" value={taskDeadline} onChange={(e)=>setTaskDeadline(e.target.value)} type="date" placeholder='Ex : Learn React.....' className='w-7xl mx-3 px-5 py-4 text-base text-white bg-slate-900 border border-slate-700 rounded-xl  placeholder:text-slate-500 outline-none transition-all duration-300  focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20  hover:border-slate-500' /> 
            <p className='mx-4 text-gray-400 my-1'>Give the task a Deadline , You should respect it 😅!</p>   
            </div>

            <div className='flex flex-col mt-5 '>
            <label htmlFor='progres' className='mx-5 font-bold text-2xl mb-2 text-amber-50'>Task Progress</label>
           <div className="flex gap-6 mx-3 items-center">

  

  <label className="flex items-center gap-2 cursor-pointer">
    <input type="radio" checked={taskProgres == "TODO"} onChange={(e)=> setTaskProgres(e.target.value)} name="progres" value="TODO" className="w-5 h-5 accent-violet-500 cursor-pointer" />
    <span className="text-white">TODO</span>
  </label>

  <label className="flex items-center gap-2 cursor-pointer">
    <input type="radio" checked={taskProgres == "In progress"} onChange={(e)=> setTaskProgres(e.target.value)} name="progres" value="In progress" className="w-5 h-5 accent-violet-500 cursor-pointer" />
    <span className="text-white">In progress</span>
  </label>
  <label className="flex items-center gap-2 cursor-pointer">
    <input type="radio" checked={taskProgres == "Completed"} onChange={(e)=> setTaskProgres(e.target.value)} name="progres"  value="Completed" className="w-5 h-5 accent-violet-500 cursor-pointer" />
    <span className="text-white">Completed</span>
  </label>
</div> 
<p className='mx-4 text-gray-400 my-1'>Are you already making progress on your task?!</p>  
</div>

<button type="button" onClick={()=> Show()} className='border-2 text-2xl my-3 mx-3 w-7xl hover:cursor-pointer hover:bg-lime-500 transition duration-500 bg-lime-600 h-15 rounded-2xl' >{buttonText}</button>

{showTable? (
    
<>
<div className="flex gap-5 items-center mx-5 mt-8 mb-2">
      <h2 className="text-2xl font-bold text-amber-50">
        Mes tâches ({data.length})
      </h2>

      <button
        type="button"
        onClick={()=> DeleteAll()}
        className="px-4 py-2 text-sm text-red-400 border border-red-600/50 rounded-xl hover:bg-red-600 hover:text-white hover:cursor-pointer transition duration-300"
      >
        <FontAwesomeIcon icon={faTrash} className="mr-2" />
        Delete All
      </button>
    </div>


<table className='w-7xl  mx-5 my-2 text-left text-sm text-gray-600'>
    <thead className='bg-950  border-2 border-slate-800 text-xs uppercase text-gray-700'>
        <tr>
            <th className='px-6 py-4 hover:bg-slate-900 text-white cursor-pointer  border-2 border-slate-900'>TASK NAME</th>
            <th className='px-6 py-4 hover:bg-slate-900 text-white  cursor-pointer border-2 border-slate-900'>TASK DESCRIPTION</th>
            <th className='px-6 py-4 hover:bg-slate-900 text-white cursor-pointer border-2 border-slate-900'>TASK PRIORITY</th>
            <th className='px-6 py-4 hover:bg-slate-900 text-white cursor-pointer border-2 border-slate-900'>TASK DEADLINE</th>
            <th className='px-6 py-4 hover:bg-slate-900 text-white cursor-pointer border-2 border-slate-900'>TASK PROGRESS</th>
            <th className='px-6 py-4 hover:bg-slate-900 text-white cursor-pointer border-2 border-slate-900'>ACTIONS</th>
        </tr>
    </thead>
    <tbody className='divide-y divide-gray-200'>
     {data.map((elt , i)=>
    {
        return (
          <tr key={i} className='cursor-pointer  border-2 '>
            <td  className='font-bold text-2xl  text-white font-archivo px-6 py-4 border-2 border-slate-900'>{elt.nom}</td>
            <td  className='font-bold text-2xl text-white font-archivo px-6 py-4 border-2 border-slate-900'>{elt.description}</td>
            <td  className='font-bold text-2xl text-white font-archivo px-6 py-4 border-2 border-slate-900'>{elt.priorite}</td>
            <td  className='font-bold text-2xl text-white font-archivo px-6 py-4 border-2 border-slate-900 '>{elt.deadline}</td>
            <td  className='font-bold text-2xl text-white font-archivo px-6 py-4 border-2 border-slate-900' >{elt.progres}</td>
            <td  className='font-bold text-2xl text-white font-archivo px-6 py-4 border-2 border-slate-900'><div className='flex gap-2'>
                <button className=' text-2xl my-3 mx-3 font-serif py-2 px-3 hover:cursor-pointer w-50 hover:text-white border-2 text-red-500 border-red-600 hover:bg-red-700 transition duration-500  h-15 rounded-2xl'
                 type="button" onClick={()=>myDispatch(DeleteTask(i))} >Delete</button>
                <button className=' text-2xl w-50 my-3 mx-3 py-2 px-3 hover:cursor-pointer hover:text-white text-blue-600 hover:bg-blue-700 transition duration-500 border-2 border-blue-600 h-15 rounded-2xl' 
                type="button" onClick={()=> EditerTask(elt , i)}>Update</button></div></td>
        </tr>  
        )

    })}   
    </tbody>

</table>
</>


) : null }



            
        
        </>
    )
}