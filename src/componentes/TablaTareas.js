import React from 'react';

const TablaTareas = ({ tareas, onEliminar, onToggleEstado }) => {
    return React.createElement(
        'table',
        { style: { width: '100%', borderCollapse: 'collapse', marginTop: '20px' } },
        React.createElement(
            'thead',
            null,
            React.createElement(
                'tr',
                null,
                React.createElement('th', { style: { border: '1px solid #ddd', padding: '10px' } }, 'Nombre'),
                React.createElement('th', { style: { border: '1px solid #ddd', padding: '10px' } }, 'Estado'),
                React.createElement('th', { style: { border: '1px solid #ddd', padding: '10px' } }, 'Acciones')
            )
        ),
        React.createElement(
            'tbody',
            null,
            tareas.length === 0
                ? React.createElement(
                      'tr',
                      null,
                      React.createElement(
                          'td',
                          { colSpan: 3, style: { textAlign: 'center', padding: '10px', color: '#999' } },
                          'No hay tareas disponibles.'
                      )
                  )
                : tareas.map((tarea) =>
                      React.createElement(
                          'tr',
                          { key: tarea.id },
                          React.createElement('td', { style: { border: '1px solid #ddd', padding: '10px' } }, tarea.name),
                          React.createElement('td', { style: { border: '1px solid #ddd', padding: '10px' } }, tarea.completed ? 'Completada' : 'Pendiente'),
                          React.createElement(
                              'td',
                              { style: { border: '1px solid #ddd', padding: '10px' } },
                              React.createElement(
                                  'button',
                                  { onClick: () => onToggleEstado(tarea.id, tarea.completed), style: { marginRight: '10px' } },
                                  tarea.completed ? 'Marcar como pendiente' : 'Marcar como completada'
                              ),
                              React.createElement(
                                  'button',
                                  { onClick: () => onEliminar(tarea.id), style: { color: 'red' } },
                                  'Eliminar'
                              )
                          )
                      )
                  )
        )
    );
};

export default TablaTareas;
