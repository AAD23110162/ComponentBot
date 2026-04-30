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

## Algoritmo y detalles técnicos

ComponentBot está diseñado como un juego tipo "Adivina quién" aplicado a componentes electrónicos: el usuario piensa en un componente y el sistema realiza preguntas binarias (atributos) para identificarlo.

Principales pasos del algoritmo:

- Inicialización: el conjunto de candidatos se carga desde `components.json` o desde la copia guardada en `localStorage`.
- Selección de pregunta: en cada turno el sistema evalúa los atributos que no han sido preguntados y calcula, para cada atributo, cuántos candidatos responderían "sí" y cuántos "no". Se prioriza el atributo que mejor balancea la partición (minimiza |yes - no|). Esta heurística busca maximizar la reducción del espacio de búsqueda en cada pregunta (implementado en `getBestQuestion()` en `app.js`).
- Aplicación de la respuesta: según la respuesta del usuario se filtra la lista de candidatos:
   - Respuesta **Sí**: se mantienen candidatos con ese atributo `true` y aquellos con el atributo indefinido.
   - Respuesta **No**: se mantienen candidatos con ese atributo `false` y aquellos con el atributo indefinido.
   - Respuesta **Tal vez** / **No sé**: no se aplica filtrado (conservador), para evitar eliminar candidatos con datos incompletos.

- Decisión de adivinanza: cuando el número de candidatos es 1 (o cae por debajo de un umbral configurable), el sistema propone una adivinanza al usuario.

- Aprendizaje: si la adivinanza es incorrecta, el usuario puede introducir el componente correcto y marcar sus atributos. Ese nuevo registro se añade a la base de datos en memoria y se persiste en `localStorage`.

Aspectos técnicos y complejidad:

- Complejidad temporal por turno: O(A * N) donde A es el número de atributos posibles y N el número de candidatos actuales (se cuentan yes/no por atributo). En la práctica A es limitado (decenas) y N decrece con cada pregunta.
- Complejidad espacial: O(N) para almacenar candidatos; la base de datos completa también ocupa O(M) donde M es número total de componentes.
- Persistencia: los datos y estadísticas se guardan en `localStorage` usando claves específicas para permitir restauración entre sesiones y exportar/importar respaldos en JSON.

Limitaciones conocidas:

- El sistema utiliza filtros booleanos y mantiene candidatos con atributos indefinidos (comportamiento conservador). Esto reduce falsos negativos pero puede mantener demasiados candidatos si los registros están incompletos.
- No se aplica un modelo probabilístico (por ejemplo, estimación Bayesiana) ni se usa información mutua/entropía explícita; la heurística actual es simple y explicable.
- Ambigüedades semánticas en nombres y descripciones pueden provocar duplicados o confusiones; se recomienda normalizar `id` y `name` al agregar componentes.

Mejoras propuestas:

- Reemplazar la heurística actual por un criterio de ganancia de información (information gain) o puntuación probabilística para priorizar preguntas.
- Introducir pesos y confidencias en atributos (por ejemplo, si un atributo fue verificado muchas veces su peso aumenta).
- Añadir un modo de desambiguación que muestre diferencias entre los dos candidatos más probables antes de adivinar.
- Soporte para coincidencia por similitud de texto (fuzzy matching) al aprender nuevos nombres.

Privacidad y datos:

- Toda la información de aprendizaje se almacena localmente en el navegador (`localStorage`). No se transmite a servidores externos por defecto.

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
