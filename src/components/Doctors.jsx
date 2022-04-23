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
    const [eps, setEps] = React.useState('')
    const [place, setPlace] = React.useState('')
    const [state, setState] = React.useState('')
    const [list, setList] = React.useState([])
    const [editMode, setEditMode] = React.useState(false)

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
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo nombre paciente está vacio!'
            })
            return
        }
    
        if (!nameDoctor.trim()) {
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo nombre doctor está vacio!'
            })
            return 
        }
    
        if (!date.trim()) {
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo fecha está vacio!'
            })
            return 
        }
    
        if (!time.trim()) {
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo hora está vacio!'
            })
            return 
        }
    
        if (!reason.trim()) {
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo razón de la cita está vacio!'
            })
            return 
        }
    
        if (!eps.trim()) {
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo eps está vacio!'
            })
            return 
        }
        if (!place.trim()) {
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo lugar está vacio!'
            })
            return 
        }
        
        if (!state.trim()) {
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo estado está vacio!'
            })
            return 
        }

        try {
            const db = firebase.firestore()
            const cita = {
                patient: namePatient,
                doctor: nameDoctor,
                date: date,
                time: time,
                reason: reason,
                eps: eps,
                place: place,
                state: state
            }
            await db.collection('doctores').add(cita)
            mySwal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Cita registrada exitosamente',
                showConfirmButton: false,
                timer: 1500
            })
            setList([
                ...list,
                {
                    id: nanoid(),
                    patient: namePatient,
                    doctor: nameDoctor,
                    date: date,
                    time: time,
                    reason: reason,
                    eps: eps,
                    place: place,
                    state: state
                }
            ])
        } catch (error) {
            console.error(error);
        }
        setNamePatient('')
        setNameDoctor('')
        setDate('')
        setTime('')
        setReason('')
        setEps('')
        setPlace('')
        setState('')
        setEditMode(false)
    }

    const auxUpdate = (item) => {
        setNamePatient(item.patient)
        setNameDoctor(item.doctor)
        setDate(item.date)
        setTime(item.time)
        setReason(item.reason)
        setEps(item.eps)
        setPlace(item.place)
        setState(item.state)
        setEditMode(true)
        setId(item.id)
    }

    const updateDoctor = async e => {
        e.preventDefault()

        if (!namePatient.trim()) {
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo nombre paciente está vacio!'
            })
            return
        }
    
        if (!nameDoctor.trim()) {
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo nombre doctor está vacio!'
            })
            return 
        }
    
        if (!date.trim()) {
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo fecha está vacio!'
            })
            return 
        }
    
        if (!time.trim()) {
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo hora está vacio!'
            })
            return 
        }
    
        if (!reason.trim()) {
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo razón de la cita está vacio!'
            })
            return 
        }
    
        if (!eps.trim()) {
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo eps está vacio!'
            })
            return 
        }
        if (!place.trim()) {
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo lugar está vacio!'
            })
            return 
        }
        
        if (!state.trim()) {
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo estado está vacio!'
            })
            return 
        }

        try {
            const db = firebase.firestore()
            await db.collection('doctores').doc(id).update({
                patient: namePatient,
                doctor: nameDoctor,
                date: date,
                time: time,
                reason: reason,
                eps: eps,
                place: place,
                state: state
            })
            mySwal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Cita actualizada',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {
            console.error(error);
        }

        setNamePatient('')
        setNameDoctor('')
        setDate('')
        setTime('')
        setReason('')
        setEps('')
        setPlace('')
        setState('')
        setEditMode(false)
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

    const confirmDelete = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, Eliminar!'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteDoctor(id)
                Swal.fire(
                    'Eliminado!',
                    'La cita ha sido eliminada.',
                    'success'
                )
            }
        })
    }

    const cancel =()=>{
        setNamePatient('')
        setNameDoctor('')
        setDate('')
        setTime('')
        setReason('')
        setEps('')
        setPlace('')
        setState('')
        setEditMode(false)
    }

    return (
        <div className='container mt-3'>
        <h1 className='text-center'>TALLER REACT</h1>
        <hr/>
        <div className='row'>
            <div className="table-responsive">
                <h4 className="text-center">Listado de Citas</h4>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Paciente</th>
                            <th>Medico</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Razón de la Cita</th>
                            <th>EPS</th>
                            <th>Lugar</th>
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
                                <td>{item.eps}</td>
                                <td>{item.place}</td>
                                <td>{item.state}</td>
                                <td>
                                <button className='btn btn-danger btn-sm float-end mx-2' onClick={()=> confirmDelete(item.id)}><i className="fa-solid fa-trash-can"></i></button>
                            <button className='btn btn-warning btn-sm float-end' onClick={()=> auxUpdate(item)}><i className="fa-solid fa-file-pen"></i></button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            <div className="container">
                <h4 className="text-center">
                    {
                        editMode ? 'Editar Doctor': 'Agregar Doctor'
                    }
                </h4>
                <form className="row g-3 justify-content-center" onSubmit={editMode ? updateDoctor: saveDoctor}>
                    <div className="col-md-5">
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='nombre del paciente'
                            onChange={(e)=>setNamePatient(e.target.value)}
                            value = {namePatient}
                        />
                    </div>
                    <div className="col-md-5">
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='nombre del doctor'
                            onChange={(e)=>setNameDoctor(e.target.value)}
                            value = {nameDoctor}
                        />
                    </div>
                    <div className="col-md-5">
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='fecha de la cita'
                            onChange={(e)=>setDate(e.target.value)}
                            value = {date}
                        />
                    </div>
                    <div className="col-md-5">
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='hora de la cita'
                            onChange={(e)=>setTime(e.target.value)}
                            value = {time}
                        />
                    </div>
                    <div className="col-md-5">
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='motivo de la cita'
                            onChange={(e)=>setReason(e.target.value)}
                            value = {reason}
                        />
                    </div>
                    <div className="col-md-5">
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='eps afiliado'
                            onChange={(e)=>setEps(e.target.value)}
                            value = {eps}
                        />
                    </div>
                    <div className="col-md-5">
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='lugar de la cita'
                            onChange={(e)=>setPlace(e.target.value)}
                            value = {place}
                        />
                    </div>
                    <div className="col-md-5">
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='estado de la cita'
                            onChange={(e)=>setState(e.target.value)}
                            value = {state}
                        />
                    </div>
                    <div className="col-md-10">
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
                    </div>
                                          
                </form>
            </div>
        </div>
    </div>
    )
}

export default Doctor