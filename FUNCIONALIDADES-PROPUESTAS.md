# Funcionalidades propuestas para WorkList

## Estado actual

WorkList es una lista de tareas ligera que funciona en el navegador. Actualmente permite:

- Crear, completar y eliminar tareas.
- Filtrar tareas entre todas, pendientes y completadas.
- Limpiar las tareas completadas.
- Guardar las tareas en el almacenamiento local del navegador (`localStorage`).

## Mejoras recomendadas

Estas mejoras pueden implementarse sin añadir un servidor ni nuevas dependencias:

1. **Editar tareas** después de crearlas.
2. **Prioridades y fechas límite**, con indicadores visuales y orden por vencimiento.
3. **Buscar tareas** por texto.
4. **Deshacer eliminaciones** y pedir confirmación antes de borrar varias tareas.
5. **Exportar e importar una copia de seguridad**, para facilitar el respaldo y traslado de los datos.

## Otras opciones

### Organización y seguimiento

- **Categorías o etiquetas** para separar tareas por proyecto o tema.
- **Orden manual** de las tareas, por ejemplo, mediante arrastrar y soltar.
- **Vistas de tareas para hoy o vencidas** y un resumen del progreso.
- **Modo oscuro** para usar la aplicación con poca luz.

### Funciones que requieren más infraestructura

- **Cuentas y sincronización entre dispositivos:** requieren un backend, autenticación y almacenamiento remoto. `localStorage` solo conserva los datos en el navegador actual.
- **Recordatorios y notificaciones:** requieren permisos del navegador. Para que sean confiables, normalmente también hace falta una aplicación instalable con service worker y posiblemente un servicio backend.

## Orden sugerido

1. Corregir el manejo de errores al guardar: si `localStorage` falla, no mostrar también un mensaje de éxito.
2. Agregar edición de tareas.
3. Agregar prioridades y fechas límite.
4. Añadir exportación e importación de datos.
5. Incorporar búsqueda y, si resulta útil, categorías.
6. Evaluar sincronización o recordatorios solo si el uso lo requiere.
7. Añadir pruebas automatizadas antes de ampliar las funciones.

## Consideraciones

- La persistencia actual depende del navegador y el dispositivo; borrar los datos del navegador puede eliminar las tareas.
- Conviene priorizar funciones locales antes de añadir cuentas o servicios remotos, que aumentan la complejidad operativa.
- Este documento propone trabajo futuro; no implica que esas funciones ya estén implementadas.
