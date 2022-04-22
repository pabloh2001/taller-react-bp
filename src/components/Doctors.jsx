import React from "react";
import { nanoid } from "nanoid";
import {firebase} from '../firebase'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const mySwal = withReactContent(Swal)

const Doctor = () => {
    const [id, setId] = React.useState('')
    const [namePatient, setNamePatient] = React.useState('')
    const [nameDoctor, setNameDoctor] = React.useState('')
    const [date, setDate] = React.useState('')
    const [time, setTime] = React.useState('')
    const [reason, setReason] = React.useState('')
    const [coments, setComents] = React.useState('')
    const [state, setState] = React.useState('')
    const [list, setList] = React.useState([])
    const [editMode, setEditMode] = React.useState(null)
    const [error, setError] = React.useState(null)

    React.useEffect(()=>{
        const getData = async () =>{
            try{
                const db = firebase.firestore()
                const data = await db.collection('doctores').get()
                const array = data.docs.map(item =>(
                    {
                        id:item.id, ...item.data()
                    }
                ))
                setList(array)

            }catch(error){
                console.error(error)
            }
        }
        getData()

    })



    const saveDoctor = async (e) => {
        e.preventDefault()

        if (!namePatient.trim()) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo nombre está vacio!'
            })
        }

        try {
            const db = firebase.firestore()
            const cita = {
                patient: namePatient,
                doctor: nameDoctor,
                date: date,
                time: time,
                reason: reason,
                coments: coments,
                state: state
            }
            await db.collection('doctores').add(cita)
            setList([
                ...list,
                {
                    id: nanoid(),
                    patient: namePatient,
                    doctor: nameDoctor,
                    date: date,
                    time: time,
                    reason: reason,
                    coments:coments,
                    state: state
                }
            ])
        } catch (error) {
            console.error(error);
        }

        setEditMode(false)
        setNamePatient('')
        setNameDoctor('')
        setDate('')
        setTime('')
        setReason('')
        setComents('')
        setState('')
    }

    const auxUpdate = (item) => {
        setNamePatient(item.patient)
        setNameDoctor(item.doctor)
        setDate(item.date)
        setTime(item.time)
        setReason(item.reason)
        setComents(item.coments)
        setState(item.state)
    }

    const updateDoctor = async (e) => {
        e.preventDefault()

        try {
            const db = firebase.firestore()
            await db.collection('doctores').update({
                patient: namePatient,
                doctor: nameDoctor,
                date: date,
                time: time,
                reason: reason,
                coments: coments,
                state: state
            })
        } catch (error) {
            console.error(error);
        }

        setEditMode(false)
        setNamePatient('')
        setNameDoctor('')
        setDate('')
        setTime('')
        setReason('')
        setComents('')
        setState('')
    }

    const deleteDoctor = async (id) =>{
        try{
            const db = firebase.firestore()
            await db.collection('doctores').doc(id).delete()
            const aux = list.filter(item => item.id !== id)
            setList(aux)
        }catch(error){
            console.error(error)
        }
    }

    const cancel =()=>{
        setEditMode(false)
        setNamePatient('')
        setNameDoctor('')
        setDate('')
        setTime('')
        setReason('')
        setComents('')
        setState('')
    }

    return (
        <div className='container mt-5'>
        <h1 className='text-center'>TALLER REACT</h1>
        <hr/>
        <div className='row'>
            <div className="col-8">
                <h4 className="text-center">Listado de Citas</h4>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Paciente</th>
                            <th>Medico</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Razón de la Cita</th>
                            <th>Comentarios</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        list.map((item) => (
                            <tr key={item.id}>
                                <td>{item.patient}</td>
                                <td>{item.doctor}</td>
                                <td>{item.date}</td>
                                <td>{item.time}</td>
                                <td>{item.reason}</td>
                                <td>{item.coments}</td>
                                <td>{item.state}</td>
                                <td>
                                <button className='btn btn-danger btn-sm float-end mx-2' onClick={()=> deleteDoctor(item.id)}>Eliminar</button>
                            <button className='btn btn-warning btn-sm float-end' onClick={()=> auxUpdate(item)}>editar</button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            <div className="col-4">
                <h4 className="text-center">
                    {
                        editMode ? 'Editar Doctor': 'Agregar Doctor'
                    }
                </h4>
                <form onSubmit={editMode ? updateDoctor: saveDoctor}>
                    <input
                        className='form-control mb-2'
                        type="text"
                        placeholder='nombre del paciente'
                        onChange={(e)=>setNamePatient(e.target.value)}
                        value = {namePatient}
                    />
                    <input
                        className='form-control mb-2'
                        type="text"
                        placeholder='nombre del doctor'
                        onChange={(e)=>setNameDoctor(e.target.value)}
                        value = {nameDoctor}
                    />
                    <input
                        className='form-control mb-2'
                        type="text"
                        placeholder='fecha de la cita'
                        onChange={(e)=>setDate(e.target.value)}
                        value = {date}
                    />
                    <input
                        className='form-control mb-2'
                        type="text"
                        placeholder='hora de la cita'
                        onChange={(e)=>setTime(e.target.value)}
                        value = {time}
                    />
                    <input
                        className='form-control mb-2'
                        type="text"
                        placeholder='motivo de la cita'
                        onChange={(e)=>setReason(e.target.value)}
                        value = {reason}
                    />
                     <input
                        className='form-control mb-2'
                        type="text"
                        placeholder='acerca de la cita'
                        onChange={(e)=>setComents(e.target.value)}
                        value = {coments}
                    />
                    <input
                        className='form-control mb-2'
                        type="text"
                        placeholder='estado de la cita'
                        onChange={(e)=>setState(e.target.value)}
                        value = {state}
                    />


                    {
                        !editMode? (
                            <button className='btn btn-primary btn-block' type='submit'>Agregar</button>
                        )
                        :
                        (  <>
                            <button className='btn btn-warning btn-block' type='submit'>Editar</button>
                            <button className='btn btn-dark btn-block mx-2' onClick={() => cancel()}>Cancelar</button>
                            </>
                        )
                    }
                                          
                </form>
            </div>
        </div>
    </div>
    )
}

export default Doctor