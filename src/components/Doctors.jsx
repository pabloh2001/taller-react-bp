import React from "react";
import { nanoid } from "nanoid";
import {firebase} from '../firebase'

const Doctor = () => {
    const [id, setId] = React.useState('')
    const [namePatient, setNamePatient] = React.useState('')
    const [nameDoctor, setNameDoctor] = React.useState('')
    const [date, setDate] = React.useState('')
    const [time, setTime] = React.useState('')
    const [reason, setReason] = React.useState('')
    const [state, setState] = React.useState('')
    const [list, setList] = React.useState([])
    const [editMode, setEditMode] = React.useState(null)
    const [error, setError] = React.useState(null)


    const save = async (e) => {
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
                    state: state
                }
            ])
        } catch (error) {
            console.log(error);
        }

        setEditMode(false)
        setNamePatient('')
        setNameDoctor('')
        setDate('')
        setTime('')
        setReason('')
        setState('')
    }


    return (
        <div className='container mt-5'>
        <h1 className='text-center'>TALLER REACT</h1>
        <hr/>
        <div className='row'>
            <div className="col-8">
                <h4 className="text-center">Listado de Citas</h4>
                <ul className="list-group">
                {
                    list.map((item)=>(
                        <li className='list-group-item' key={item.id}>
                            <span className='lead'>{item.namePatient} - {item.nombreDescripcion}</span>
                            <button className='btn btn-danger btn-sm float-end mx-2' onClick={()=> eliminar(item.id)}>Eliminar</button>
                            <button className='btn btn-warning btn-sm float-end' onClick={()=> auxEditar(item)}>editar</button>
                        </li>
                    ))
                }
                </ul>
            </div>
            <div className="col-4">
                <h4 className="text-center">
                    {
                        modoEdicion ? 'Editar Frutas': 'Agregar Frutas'
                    }
                </h4>
                <form onSubmit={modoEdicion ? editar: guardarDatos}>
                    {
                        error ? <span className='text-danger'>{error}</span> : null
                    }
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
                        placeholder='estado de la cita'
                        onChange={(e)=>setState(e.target.value)}
                        value = {state}
                    />


                    {
                        !modoEdicion? (
                            <button className='btn btn-primary btn-block' type='submit'>Agregar</button>
                        )
                        :
                        (  <>
                            <button className='btn btn-warning btn-block' type='submit'>Editar</button>
                            <button className='btn btn-dark btn-block mx-2' onClick={() => cancelar()}>Cancelar</button>
                            </>
                        )
                    }
                                          
                </form>
            </div>
        </div>
    </div>
    )
}