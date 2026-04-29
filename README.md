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

## 💡 Ideas para Mejorar

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