import React, { useEffect, useState } from 'react';
import Header from '../componentes/Header';
import TablaTareas from '../componentes/TablaTareas';

const TaskManagerPage = () => {
    const [tareas, setTareas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nuevaTarea, setNuevaTarea] = useState('');

    useEffect(() => {
        fetchTareas();
    }, []);

    const fetchTareas = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/tasks');
            if (!response.ok) throw new Error('Error al obtener las tareas');
            const data = await response.json();
            setTareas(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const agregarTarea = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: nuevaTarea }),
            });
            if (!response.ok) throw new Error('Error al crear tarea');
            const tareaCreada = await response.json();
            setTareas((prev) => [...prev, tareaCreada]);
            setNuevaTarea('');
        } catch (error) {
            console.error(error);
        }
    };

    const eliminarTarea = async (id) => {
        try {
            await fetch(`http://localhost:8000/api/tasks/${id}`, {
                method: 'DELETE',
            });
            setTareas((prev) => prev.filter((tarea) => tarea.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const toggleEstadoTarea = async (id, completed) => {
        try {
            const response = await fetch(`http://localhost:8000/api/tasks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: !completed }),
            });
            if (!response.ok) throw new Error('Error al actualizar tarea');
            const tareaActualizada = await response.json();
            setTareas((prev) =>
                prev.map((tarea) => (tarea.id === id ? tareaActualizada : tarea))
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <Header />
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Nueva tarea"
                    value={nuevaTarea}
                    onChange={(e) => setNuevaTarea(e.target.value)}
                    style={{ marginRight: '10px', padding: '5px', width: '70%' }}
                />
                <button onClick={agregarTarea} style={{ padding: '5px 10px' }}>
                    Agregar
                </button>
            </div>
            {loading ? (
                <p>Cargando tareas...</p>
            ) : (
                <TablaTareas
                    tareas={tareas}
                    onEliminar={eliminarTarea}
                    onToggleEstado={toggleEstadoTarea}
                />
            )}
        </div>
    );
};

export default TaskManagerPage;
