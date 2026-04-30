# ⚡ ComponentBot

**Un juego interactivo para adivinar componentes electrónicos usando preguntas de Sí/No.**

ComponentBot es una aplicación web que implementa un algoritmo de árbol binario de decisión para identificar componentes electrónicos. Si el bot falla en la adivinanza, aprende el nuevo componente y lo agrega a su base de datos.

## 🚀 Características

- **Juego interactivo**: Piensa en un componente electrónico y responde preguntas Sí/No
- **Aprendizaje inteligente**: El bot aprende nuevos componentes cuando falla
- **Base de datos dinámica**: Más juegos = más componentes aprendidos
- **Persistencia local**: Los datos se guardan en localStorage
- **Exportar/Importar**: Descarga tu progreso como JSON o importa bases de datos
- **Interfaz futurista**: Diseño visual inspirado en interfaces de ciencia ficción
- **Fully Responsive**: Funciona en desktop, tablet y móvil

## 📦 Estructura del Proyecto

```
ComponentBot/
├── index.html           # Página principal (estadior estándar de GitHub Pages)
├── app.js              # Lógica del juego y manejo de datos
├── styles.css          # Estilos y temas visuales
├── components.json     # Base de datos inicial de componentes
├── README.md           # Este archivo
└── LICENSE             # Licencia del proyecto
```

## 🎮 Cómo Jugar

1. Abre la aplicación: https://tu-usuario.github.io/ComponentBot
2. Haz clic en **"COMENZAR PARTIDA"**
3. Piensa en un componente electrónico real
4. Responde honestamente a las preguntas de Sí/No
5. Si el bot adivina correctamente, confirma el resultado
6. Si falla, enséñale cuál era el componente correcto definiendo sus características

## 📊 Gestión de Datos

### Exportar tu progreso
- Abre la sección "BASE DE DATOS & GESTIÓN"
- Haz clic en "⬇ EXPORTAR JSON"
- Guarda el archivo en tu computadora como copia de seguridad

### Importar una base de datos
- Sube un archivo JSON previamente exportado
- Los componentes se cargarán automáticamente

### Reset Total
- Reinicia la base de datos al estado inicial
- **Advertencia**: Esta acción no puede deshacerse

## 🔧 Instalación Local

### Requisitos
- Un navegador web moderno (Chrome, Firefox, Safari, Edge)
- No requiere servidor ni instalación de dependencias

### Pasos
1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/ComponentBot.git
   cd ComponentBot
   ```

2. Abre `index.html` en tu navegador:
   - Opción 1: Haz doble clic en `index.html`
   - Opción 2: Usa un servidor local:
     ```bash
     python3 -m http.server 8000
     # Luego abre http://localhost:8000
     ```

## 🌐 Publicar en GitHub Pages

### Método Automático (recomendado)

1. **Crea un repositorio en GitHub**
   - Nombre: `ComponentBot` (o tu preferencia)
   - Descripción: "Juego interactivo para adivinar componentes electrónicos"

2. **Sube los archivos**
   ```bash
   git add .
   git commit -m "feat: Proyecto ComponentBot listo para GitHub Pages"
   git push origin main
   ```

3. **Habilita GitHub Pages**
   - Ve a Settings → Pages
   - En "Build and deployment":
     - Source: **Deploy from a branch**
     - Branch: **main** / **/(root)**
   - Guarda los cambios

4. **Accede a tu página**
   - Tu sitio estará disponible en: `https://tu-usuario.github.io/ComponentBot`
   - Puede tardar 1-2 minutos en aparecer

### Configuración Alternativa (rama `gh-pages`)

Si prefieres usar una rama dedicada:

```bash
# Crea rama gh-pages
git checkout --orphan gh-pages

# Envía los cambios
git add .
git commit -m "Deploy: ComponentBot para GitHub Pages"
git push origin gh-pages

# En Settings → Pages, selecciona la rama gh-pages
```

## 🎨 Personalización

### Cambiar tema de colores
Edita las variables CSS en `styles.css`:
```css
:root {
  --bg: #f4f7fb;           /* Color de fondo */
  --primary: #2563eb;      /* Color primario */
  --green: #10b981;        /* Color de éxito */
  --warning: #f59e0b;      /* Color de advertencia */
  /* ... más variables */
}
```

### Agregar más componentes iniciales
Edita `components.json` y agrega nuevos componentes en el array:
```json
{
  "id": "mi_componente",
  "name": "Mi Componente",
  "desc": "Descripción del componente",
  "attrs": { /* atributos true/false */ }
}
```

## 📝 Atributos Disponibles

El juego utiliza los siguientes atributos para clasificar componentes:

- **pasivo**: Componente pasivo
- **emiteLuz**: Emite luz visible
- **esMCU**: Contiene microcontrolador
- **inalambrico**: Comunicación inalámbrica
- **esSensor**: Es sensor
- **esDisplay**: Es display/pantalla
- **tieneWifi**: WiFi integrado
- **tieneBT**: Bluetooth integrado
- **esActuador**: Mueve cargas físicas
- ... y muchos más!

**Mecánica de Adivinanza y Pesos**

- **Resumen del algoritmo**: El juego comienza con todos los componentes de la base de datos como candidatos. En cada paso se elige una pregunta (un atributo) que intenta dividir a los candidatos de forma lo más equilibrada posible. La elección se basa en minimizar la diferencia absoluta entre la cantidad de componentes que responden "sí" y los que responden "no" para ese atributo (cálculo implementado en `getBestQuestion()` en [app.js](app.js#L1-L1200)).

- **Selección de la siguiente pregunta**: Para cada atributo no preguntado se cuenta cuántos candidatos tienen `true` (yes) y cuántos `false` (no). Se calcula `score = |yes - no|` y se elige el atributo con menor `score` (es decir, el que mejor equilibra la partición).

- **Cómo afectan las respuestas a los candidatos ("pesos" implícitos)**n
   - **✔ Sí**: se mantienen los componentes que tienen el atributo marcado como `true` y también los que no tienen definido ese atributo (`undefined`). En la implementación esto equivale a: un componente sobrevive si `item.attrs[attr] === undefined || item.attrs[attr] === true`.
   - **✖ No**: se mantienen los componentes que tienen el atributo marcado como `false` y también los que no tienen definido ese atributo (`undefined`). Es decir, sobrevive si `item.attrs[attr] === undefined || item.attrs[attr] === false`.
   - **— No sé / unknown**: no filtra la lista de candidatos en absoluto (la función `answer()` omite el filtrado cuando el valor es `'unknown'`).

   En términos numéricos simples (N = candidatos totales, y = sí, n = no, u = indefinidos):
   - Responder **Sí** deja `y + u` candidatos.
   - Responder **No** deja `n + u` candidatos.
   - Responder **Unknown** deja `N` candidatos.

   - **Diferencia entre "No sé" y "Tal vez"**

      - **"No sé"**: en la interfaz se registra como `"unknown"` y se muestra en el historial como `— NO SÉ`. En la lógica (en `answer()`), cuando el valor es `'unknown'` no se aplica ningún filtrado sobre los candidatos, por lo que la lista permanece con `N` candidatos.
      - **"Tal vez"**: en la interfaz se registra internamente como `null` y se muestra en el historial como `~ TAL VEZ`. El comportamiento frente al filtrado es el mismo que `"unknown"`: el código omite el filtrado cuando el valor es `null`, por lo que también deja `N` candidatos.

      - **Resumen práctico**: tanto `"No sé"` como `"Tal vez"` tienen el mismo efecto funcional en la supervivencia de candidatos (no filtran), la única diferencia es semántica/visual en el historial y en cómo se representa internamente (`'unknown'` vs `null`). El chequeo relevante en el código es `if (value !== null && value !== 'unknown')` (ver `answer()` en `app.js`).

- **Interpretación de "pesos"**: el código no usa multiplicadores numéricos explícitos; en cambio aplica un filtro booleano: coincidencia → mantiene (peso efectivo 1), contradicción → elimina (peso efectivo 0), indefinido → mantiene (neutral). Por tanto los "pesos" son implícitos y binarios en la regla de supervivencia de cada componente frente a una respuesta.

- **Consecuencia práctica**: los componentes con atributos no definidos tienen ventaja de supervivencia (son conservadores), por lo que el bot tiende a no descartar componentes cuya ficha esté incompleta. Esto ayuda al aprendizaje incremental, ya que componentes con pocos atributos no se eliminan prematuramente.

- **Dónde ver la lógica**: la selección de preguntas está en `getBestQuestion()` y el filtrado por respuesta en `answer()` dentro de [app.js](app.js#L1-L1200). Si quieres un sistema basado en probabilidades (pesos continuos) en lugar de filtros booleanos, puedo proponer y aplicar una modificación.

## 🐛 Solución de Problemas

### La aplicación no carga
- Asegúrate de que todos los archivos (`.html`, `.js`, `.css`, `.json`) estén en la misma carpeta
- Verifica que los nombres de archivo sean correctos (sensibles a mayúsculas)
- Intenta en una ventana incógnito del navegador

### Los datos no se guardan entre sesiones
- Activa localStorage en tu navegador
- Algunos navegadores en modo privado no permiten localStorage
- Descarga y sube manualmente el JSON de la base de datos

### Las rutas están rotas en GitHub Pages
- Verifica que el repositorio sea público
- Asegúrate de que la rama correcta esté seleccionada en Settings → Pages
- Espera 1-2 minutos después de hacer cambios

## 📄 Licencia

Este proyecto está bajo la licencia especificada en el archivo [LICENSE](LICENSE).

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor:
1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/MiFeature`)
3. Commit tus cambios (`git commit -m 'feat: Descripción del cambio'`)
4. Push a la rama (`git push origin feature/MiFeature`)
5. Abre un Pull Request

## 💡 Futuras Mejoras

- [ ] Añadir más componentes a la base de datos inicial
- [ ] Implementar visualización en tiempo real del árbol de decisión
- [ ] Agregar estadísticas avanzadas de desempeño
- [ ] Soporte para múltiples idiomas
- [ ] Modo difícil con componentes similares
- [ ] Historial de adivinanzas correctas/incorrectas

## 📞 Contacto

¿Preguntas o sugerencias? Abre un issue en GitHub o contacta al mantenedor del proyecto.

---

**¡Disfruta aprendiendo sobre componentes electrónicos de una forma divertida! ⚡🎮**