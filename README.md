# ComponentBot

Autor: Alejandro Aguirre Díaz

Descripción: ComponentBot es una aplicación web educativa que identifica componentes electrónicos mediante preguntas binarias (Sí/No) y mejora su precisión a medida que el usuario le enseña nuevos casos.

## Sitio Web

Consulta la versión publicada en GitHub Pages:

https://aad23110162.github.io/ComponentBot/

## Objetivo del Proyecto

El objetivo de ComponentBot es ofrecer una experiencia interactiva para reforzar conocimientos de electrónica básica y embebida, combinando:

- Identificación guiada de componentes.
- Aprendizaje incremental a partir de errores.
- Gestión local de una base de conocimiento exportable.

## Funcionalidades Principales

- Motor de preguntas basado en atributos técnicos de los componentes.
- Flujo de adivinanza con confirmación de resultado.
- Aprendizaje de nuevos componentes desde la interfaz.
- Persistencia local con localStorage.
- Importación y exportación de base de datos en formato JSON.
- Interfaz responsive para escritorio y dispositivos móviles.

## Estructura del Repositorio

```text
ComponentBot/
├── index.html       # Punto de entrada para GitHub Pages
├── app.js           # Lógica del juego y del aprendizaje
├── styles.css       # Estilos de la interfaz
├── components.json  # Base de datos inicial
├── README.md        # Documentación del proyecto
└── LICENSE          # Licencia
```

## Arquitectura Funcional

El sistema se basa en tres capas simples:

1. Presentación
Interfaz HTML/CSS con estados de juego, panel de base de datos y componentes visuales.

2. Lógica
Gestión del flujo de preguntas, evaluación de candidatos, confirmación de hipótesis y aprendizaje.

3. Datos
Base inicial en JSON y estado persistente en localStorage con posibilidad de respaldo externo.

## Flujo de Uso

1. Iniciar una nueva partida.
2. Responder preguntas sobre el componente pensado.
3. Confirmar si la adivinanza es correcta.
4. Si falla, registrar el componente correcto y sus atributos.
5. Guardar cambios automáticamente o exportar respaldo en JSON.

## Ejecución Local

No requiere instalación de dependencias ni build.

```bash
git clone https://github.com/AAD23110162/ComponentBot.git
cd ComponentBot
python3 -m http.server 8000
```

Abrir en el navegador: http://localhost:8000

Tambien es posible abrir index.html directamente, aunque se recomienda servidor local para un comportamiento consistente de carga de recursos.

## Despliegue en GitHub Pages

Configuración recomendada:

1. Publicar la rama main.
2. Ir a Settings > Pages.
3. En Source seleccionar Deploy from a branch.
4. Elegir main y carpeta /(root).

GitHub Pages detecta index.html como entrada principal automáticamente.

## Modelo de Datos

Cada componente se representa como un objeto con:

- id: identificador único.
- name: nombre visible.
- desc: descripción breve.
- attrs: diccionario de atributos booleanos.

Ejemplo:

```json
{
   "id": "led_rgb",
   "name": "LED RGB",
   "desc": "LED de tres canales de color",
   "attrs": {
      "emiteLuz": true,
      "esRGB": true,
      "esModulo": false
   }
}
```

## Respaldo y Recuperación

- Exportar JSON: genera copia completa de base y estadísticas.
- Importar JSON: reemplaza la base activa por la cargada.
- Reset total: restaura estado base.

Se recomienda exportar periódicamente para preservar el aprendizaje acumulado.

## Buenas Prácticas de Mantenimiento

- Mantener consistencia en nombres de atributos.
- Validar cada nuevo componente antes de incorporarlo a la base inicial.
- Evitar duplicados funcionales con IDs distintos.
- Versionar cambios relevantes en la estructura de datos.
