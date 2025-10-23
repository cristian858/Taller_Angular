# Taller_Angular_c.ochoao

Aplicación web en Angular que muestra una lista de series de TV con vista de detalle usando Bootstrap. Los datos se obtienen desde una API externa. Al hacer clic en una serie del listado, se muestra su información en la columna derecha.

## Características principales
- Listado de series en una tabla (id, nombre, canal, temporadas).
- Al hacer clic en una fila se muestra un Card con el detalle: imagen (si está disponible), título, canal, descripción, temporadas y enlace al sitio.
- El enlace se muestra como URL visible y abre en una nueva pestaña.
- Datos obtenidos desde API externa usando HttpClient.
- Promedio de temporadas calculado y mostrado en el footer de la tabla.
- Arquitectura Angular moderna con standalone components y signals.
- Bootstrap para estilos y diseño responsive.

## Estructura del proyecto
- `src/index.html` — página principal con Bootstrap CDN y configuración base.
- `src/app/` — aplicación Angular:
  - `app.html` — template principal con router-outlet.
  - `app.config.ts` — configuración de la aplicación (HttpClient, routing).
  - `app.routes.ts` — configuración de rutas.
  - `series/` — módulo de series:
    - `serie.model.ts` — definición de la clase Serie (id, name, channel, seasons, description, link, image).
    - `series.service.ts` — servicio para obtener datos de la API y calcular promedios.
    - `series.component.ts` — componente principal con lógica de selección y manejo de estado.
    - `series.component.html` — template con navbar, tabla y card de detalle.
    - `series.component.css` — estilos mínimos específicos del componente.
    - `series-module.ts` — configuración del módulo con lazy loading.

## API Externa
Los datos se obtienen desde: `https://gist.githubusercontent.com/josejbocanegra/8490b48961a69dcd2bfd8a360256d0db/raw/34ff30dbc32392a69eb0e08453a3fc975a3890f0/series.json`