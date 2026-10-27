# WorkList

WorkList es una lista de tareas ligera en español. Permite organizar pendientes, marcarlos como completados y conservarlos en el almacenamiento local del navegador.

## Tecnologías
- HTML, CSS y JavaScript nativo
- npm para el servidor local de desarrollo
- `localStorage` para guardar las tareas en este dispositivo

## Estructura
```
public/
  index.html           # Interfaz de la aplicación
  css/styles.css       # Estilos adaptables a móvil y escritorio
  app/
    main/
      main_controller.js # Interacciones y persistencia de tareas
```

## Funcionalidades
- Crear tareas (hasta 160 caracteres), completarlas y eliminarlas.
- Filtrar la lista por todas, pendientes o completadas.
- Limpiar las tareas completadas.
- Guardar y recuperar tareas desde `localStorage`.
- Interfaz adaptable, controles accesibles y estados vacíos.

## Cómo correrlo
Requiere Node.js y npm. Desde la carpeta del proyecto, instala las dependencias e inicia el servidor:

```sh
npm install
npm start
```

Abre <http://localhost:8000>. También se puede servir la carpeta `public/` con cualquier servidor estático.

## Migración
Se retiraron Bower, AngularJS y la copia antigua de AngularJS que estaba dentro de `public/lib`. La aplicación no necesita un framework de frontend; npm solo gestiona `http-server`, la herramienta de desarrollo.
