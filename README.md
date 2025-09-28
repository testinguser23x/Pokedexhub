# 🌟 Pokédex Interactiva

![Pokédex](https://img.shields.io/badge/Pokédex-Interactiva-red?style=for-the-badge&logo=github&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

Una Pokédex interactiva moderna y responsiva construida con HTML, CSS y JavaScript vanilla. 🚀

## 📋 Tabla de Contenidos

- [🎯 Características](#-características)
- [🛠️ Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🚀 Cómo Funciona](#-cómo-funciona)
- [🎨 Diseño y Estilos](#-diseño-y-estilos)
- [📱 Responsividad](#-responsividad)
- [🔧 Instalación y Uso](#-instalación-y-uso)
- [🌐 Despliegue en GitHub Pages](#-despliegue-en-github-pages)
- [📄 Licencia](#-licencia)
- [👨‍💻 Créditos](#-créditos)

## 🎯 Características

### ✨ Funcionalidades Principales

- 📖 **Catálogo Completo**: Acceso a todos los Pokémon existentes a través de la PokéAPI
- 🔍 **Búsqueda en Tiempo Real**: Busca Pokémon por nombre o número de Pokédex
- 🎨 **Filtros por Tipo**: Filtra Pokémon por sus tipos (Fuego, Agua, Eléctrico, etc.)
- 📊 **Ordenamiento**: Ordena por número de Pokédex o nombre alfabéticamente
- 🖼️ **Imágenes Oficiales**: Utiliza sprites oficiales de la PokéAPI
- 📱 **Diseño Responsivo**: Perfectamente adaptado para móviles, tablets y escritorio

### 🎮 Características Interactivas

- 🃏 **Tarjetas de Pokémon**: Diseño moderno con hover effects y animaciones
- 📋 **Vista Detallada**: Modal con información completa del Pokémon
- 📈 **Estadísticas Visuales**: Barras de progreso para las estadísticas base
- 🔗 **Cadena de Evolución**: Muestra la línea evolutiva del Pokémon
- 🔊 **Sonidos**: Reproduce el grito del Pokémon (cuando está disponible)
- 🌍 **Contenido en Español**: Nombres, tipos y descripciones en español

## 🛠️ Tecnologías Utilizadas

### 💻 Frontend Puro

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos modernos con animaciones y transiciones
- **JavaScript Vanilla**: Lógica interactiva sin frameworks
- **PokéAPI**: Fuente de datos oficial de Pokémon
- **Google Fonts**: Tipografías Orbitron y Roboto

### 🎨 Características Técnicas

- ⚡ **Carga Asíncrona**: Carga eficiente de datos con paginación
- 🔄 **Actualización Dinámica**: Filtros y búsqueda sin recargar la página
- 🎯 **Optimización**: Lazy loading para imágenes y carga progresiva
- 📊 **Manejo de Errores**: Gestión robusta de errores y estados de carga

## 📁 Estructura del Proyecto

```
github-page/
├── 📄 index.html          # Estructura HTML principal
├── 🎨 styles.css          # Estilos CSS y diseño
├── ⚙️ script.js           # Lógica JavaScript
└── 📖 README.md           # Documentación del proyecto
```

### 📄 Descripción de Archivos

#### `index.html` 📄
- **Estructura Principal**: Contiene la estructura semántica de la aplicación
- **Componentes**:
  - Header con título y buscador
  - Panel de filtros por tipo y ordenamiento
  - Grid para mostrar las tarjetas de Pokémon
  - Modal para vista detallada
- **Metadatos**: Configuración de viewport y enlaces a recursos externos

#### `styles.css` 🎨
- **Variables CSS**: Definición de colores y temas
- **Diseño Oscuro**: Paleta de colores minimalista con tema oscuro
- **Colores por Tipo**: Cada tipo de Pokémon tiene su color característico
- **Animaciones**: Transiciones suaves y efectos hover
- **Media Queries**: Diseño responsivo para diferentes dispositivos

#### `script.js` ⚙️
- **Clase Pokedex**: Arquitectura orientada a objetos
- **Métodos Principales**:
  - `loadPokemon()`: Carga inicial de Pokémon
  - `filterAndDisplayPokemon()`: Filtrado y visualización
  - `showPokemonDetails()`: Vista detallada en modal
  - `getEvolutionChain()`: Obtención de cadena evolutiva
- **Event Listeners**: Manejo de eventos de usuario
- **API Integration**: Comunicación con la PokéAPI

## 🚀 Cómo Funciona

### 🔄 Flujo de Datos

1. **Inicialización**: La clase `Pokedex` se inicializa cuando el DOM está cargado
2. **Carga Inicial**: Se cargan los primeros 20 Pokémon desde la PokéAPI
3. **Procesamiento**: Para cada Pokémon se obtiene información detallada:
   - Datos básicos (nombre, número, tipos)
   - Imágenes oficiales
   - Estadísticas base
   - Habilidades y descripciones
   - Cadena de evolución
4. **Visualización**: Los Pokémon se muestran en tarjetas interactivas
5. **Interacción**: Los usuarios pueden buscar, filtrar y ver detalles

### 🎯 Procesos Clave

#### Búsqueda y Filtrado 🔍
```javascript
// Búsqueda en tiempo real
document.getElementById('searchInput').addEventListener('input', (e) => {
    this.currentSearch = e.target.value.toLowerCase();
    this.filterAndDisplayPokemon();
});

// Filtrado por tipo
document.getElementById('typeFilter').addEventListener('change', (e) => {
    this.currentTypeFilter = e.target.value;
    this.filterAndDisplayPokemon();
});
```

#### Carga de Detalles 📋
```javascript
async fetchPokemonDetails(url) {
    // Obtener datos básicos del Pokémon
    const response = await fetch(url);
    const pokemon = await response.json();
    
    // Obtener información adicional
    const speciesResponse = await fetch(pokemon.species.url);
    const species = await speciesResponse.json();
    
    // Obtener cadena de evolución
    const evolutionChain = await this.getEvolutionChain(species.evolution_chain.url);
    
    return { /* datos procesados */ };
}
```

#### Vista Detallada 🎨
```javascript
async showPokemonDetails(pokemon) {
    // Mostrar modal con información completa
    const modal = document.getElementById('pokemonModal');
    const detailsContainer = document.getElementById('pokemonDetails');
    
    // Construir HTML con todos los detalles
    detailsContainer.innerHTML = `
        <div class="pokemon-details-header">
            <!-- Imagen, nombre, tipos -->
        </div>
        <div class="pokemon-details-section">
            <!-- Información básica -->
        </div>
        <div class="pokemon-details-section">
            <!-- Estadísticas con barras de progreso -->
        </div>
        <!-- Más secciones... -->
    `;
}
```

## 🎨 Diseño y Estilos

### 🌈 Sistema de Colores

#### Tema Oscuro Minimalista
```css
:root {
    --bg-primary: #0f0f0f;      /* Fondo principal */
    --bg-secondary: #1a1a1a;    /* Fondo secundario */
    --bg-card: #252525;         /* Fondo de tarjetas */
    --text-primary: #ffffff;    /* Texto principal */
    --text-secondary: #b0b0b0; /* Texto secundario */
    --accent-color: #ff6b6b;   /* Color de acento */
}
```

#### Colores por Tipo de Pokémon
```css
:root {
    --normal: #A8A878;     --fire: #F08030;
    --water: #6890F0;      --electric: #F8D030;
    --grass: #78C850;      --ice: #98D8D8;
    --fighting: #C03028;   --poison: #A040A0;
    --ground: #E0C068;     --flying: #A890F0;
    --psychic: #F85888;    --bug: #A8B820;
    --rock: #B8A038;       --ghost: #705898;
    --dragon: #7038F8;     --dark: #705848;
    --steel: #B8B8D0;      --fairy: #EE99AC;
}
```

### ✨ Animaciones y Efectos

#### Hover Effects
```css
.pokemon-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    border-color: var(--accent-color);
}
```

#### Loading Animation
```css
.spinner {
    border: 4px solid var(--border-color);
    border-top: 4px solid var(--accent-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}
```

## 📱 Responsividad

### 🖥️ Breakpoints

#### Dispositivos Grandes (> 768px)
- Grid de 4 columnas para tarjetas de Pokémon
- Filtros en línea horizontal
- Modal de 800px de ancho máximo

#### Tablets (≤ 768px)
- Grid de 2-3 columnas
- Filtros apilados verticalmente
- Modal adaptado al tamaño de pantalla

#### Móviles (≤ 480px)
- Grid de 1 columna
- Elementos de interfaz optimizados para tacto
- Cadena de evolución en vertical

### 🎯 Optimizaciones Móviles

- **Touch Targets**: Elementos interactivos de mínimo 44px
- **Scroll Optimizado**: Desplazamiento suave en listas largas
- **Performance**: Carga progresiva y lazy loading
- **Accesibilidad**: Navegación por teclado y screen readers

## 🔧 Instalación y Uso

### 📋 Requisitos Previos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet para acceder a la PokéAPI

### 🚀 Configuración Local

1. **Clonar el Repositorio**
   ```bash
   git clone https://github.com/tu-usuario/pokedex-interactiva.git
   cd pokedex-interactiva
   ```

2. **Abrir en Navegador**
   ```bash
   # Método 1: Abrir directamente
   open index.html
   
   # Método 2: Usar servidor local (recomendado)
   python -m http.server 8000
   # Luego visitar http://localhost:8000
   ```

3. **Disfrutar de la Pokédex** 🎉

### 🛠️ Desarrollo

#### Estructura de Código
- **Modular**: Código organizado en clases y métodos
- **Legible**: Nombres descriptivos y comentarios claros
- **Maintenible**: Separación de responsabilidades

#### Personalización
- **Colores**: Modificar variables CSS en `styles.css`
- **Tipografías**: Cambiar fuentes en `index.html`
- **Funcionalidades**: Extender métodos en `script.js`

## 🌐 Despliegue en GitHub Pages

### 📥 Pasos para Despliegue

1. **Crear Repositorio en GitHub**
   - Ir a [GitHub](https://github.com)
   - Crear nuevo repositorio llamado `pokedex-interactiva`

2. **Subir Archivos**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Pokédex Interactiva"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/pokedex-interactiva.git
   git push -u origin main
   ```

3. **Configurar GitHub Pages**
   - Ir a Settings > Pages
   - Seleccionar rama `main`
   - Seleccionar carpeta `/root`
   - Hacer clic en Save

4. **Visitar tu Sitio** 🎉
   - Tu Pokédex estará disponible en: `https://tu-usuario.github.io/pokedex-interactiva`

### ⚡ Optimizaciones para Producción

- **Minificación**: Comprimir CSS y JavaScript
- **Imágenes**: Optimizar imágenes y usar WebP cuando sea posible
- **Caching**: Configurar encabezados de caché adecuados
- **CDN**: Usar CDN para fuentes y recursos estáticos

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Puedes ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Créditos

Desarrollado con ❤️ por **maykolg**

- **GitHub**: [github.com/maykolg](https://github.com/maykolg)
- **Año**: 2025

### 🙏 Agradecimientos

- **PokéAPI**: Por proporcionar la API de datos de Pokémon
- **Nintendo/Game Freak**: Por crear el mundo Pokémon
- **Comunidad Open Source**: Por las herramientas y recursos utilizados

---

🌟 **Si te gusta este proyecto, no olvides darle una estrella en GitHub!** ⭐