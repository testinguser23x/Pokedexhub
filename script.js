// Clase principal de la Pokédex
class Pokedex {
    constructor() {
        this.pokemonList = [];
        this.filteredPokemon = [];
        this.offset = 0;
        this.limit = 20;
        this.isLoading = false;
        this.currentSearch = '';
        this.currentTypeFilter = '';
        this.currentSortBy = 'number';
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadPokemon();
    }

    bindEvents() {
        // Evento de búsqueda
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.currentSearch = e.target.value.toLowerCase();
            this.filterAndDisplayPokemon();
        });

        // Evento de filtro por tipo
        document.getElementById('typeFilter').addEventListener('change', (e) => {
            this.currentTypeFilter = e.target.value;
            this.filterAndDisplayPokemon();
        });

        // Evento de ordenamiento
        document.getElementById('sortBy').addEventListener('change', (e) => {
            this.currentSortBy = e.target.value;
            this.filterAndDisplayPokemon();
        });

        // Evento de cargar más
        document.getElementById('loadMoreBtn').addEventListener('click', () => {
            this.loadMorePokemon();
        });

        // Evento de cierre del modal
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });

        // Evento de clic fuera del modal
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('pokemonModal');
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }

    async loadPokemon() {
        this.showLoading(true);
        
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offset}`);
            const data = await response.json();
            
            // Cargar detalles de cada Pokémon
            const pokemonDetails = await Promise.all(
                data.results.map(pokemon => this.fetchPokemonDetails(pokemon.url))
            );
            
            this.pokemonList.push(...pokemonDetails);
            this.filteredPokemon = [...this.pokemonList];
            
            this.displayPokemon();
            this.showLoading(false);
            
            // Mostrar botón de cargar más si hay más Pokémon
            if (data.next) {
                document.getElementById('loadMore').style.display = 'block';
            } else {
                document.getElementById('loadMore').style.display = 'none';
            }
        } catch (error) {
            console.error('Error al cargar Pokémon:', error);
            this.showLoading(false);
            this.showError('Error al cargar los Pokémon. Por favor, intenta de nuevo.');
        }
    }

    async fetchPokemonDetails(url) {
        try {
            const response = await fetch(url);
            const pokemon = await response.json();
            
            // Obtener información de la especie para la descripción
            const speciesResponse = await fetch(pokemon.species.url);
            const species = await speciesResponse.json();
            
            // Obtener cadena de evolución
            const evolutionChain = await this.getEvolutionChain(species.evolution_chain.url);
            
            return {
                id: pokemon.id,
                name: pokemon.name,
                number: pokemon.id.toString().padStart(3, '0'),
                image: pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default,
                types: pokemon.types.map(type => type.type.name),
                height: pokemon.height / 10, // Convertir a metros
                weight: pokemon.weight / 10, // Convertir a kg
                baseExperience: pokemon.base_experience,
                abilities: pokemon.abilities.map(ability => ({
                    name: ability.ability.name,
                    isHidden: ability.is_hidden
                })),
                stats: pokemon.stats.map(stat => ({
                    name: stat.stat.name,
                    value: stat.base_stat
                })),
                cries: pokemon.cries,
                evolutionChain: evolutionChain,
                description: this.getSpanishDescription(species)
            };
        } catch (error) {
            console.error('Error al obtener detalles del Pokémon:', error);
            return null;
        }
    }

    async getEvolutionChain(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return this.parseEvolutionChain(data.chain);
        } catch (error) {
            console.error('Error al obtener cadena de evolución:', error);
            return [];
        }
    }

    parseEvolutionChain(chain) {
        const evolutions = [];
        
        const parseChain = (currentChain) => {
            evolutions.push({
                name: currentChain.species.name,
                url: currentChain.species.url
            });
            
            if (currentChain.evolves_to.length > 0) {
                currentChain.evolves_to.forEach(evolution => {
                    parseChain(evolution);
                });
            }
        };
        
        parseChain(chain);
        return evolutions;
    }

    getSpanishDescription(species) {
        const spanishEntry = species.flavor_text_entries.find(
            entry => entry.language.name === 'es'
        );
        return spanishEntry ? spanishEntry.flavor_text.replace(/\f/g, ' ') : '';
    }

    filterAndDisplayPokemon() {
        let filtered = [...this.pokemonList];
        
        // Filtrar por búsqueda
        if (this.currentSearch) {
            filtered = filtered.filter(pokemon => 
                pokemon.name.toLowerCase().includes(this.currentSearch) ||
                pokemon.number.includes(this.currentSearch)
            );
        }
        
        // Filtrar por tipo
        if (this.currentTypeFilter) {
            filtered = filtered.filter(pokemon => 
                pokemon.types.includes(this.currentTypeFilter)
            );
        }
        
        // Ordenar
        filtered.sort((a, b) => {
            if (this.currentSortBy === 'number') {
                return a.id - b.id;
            } else {
                return a.name.localeCompare(b.name);
            }
        });
        
        this.filteredPokemon = filtered;
        this.displayPokemon();
    }

    displayPokemon() {
        const pokemonListElement = document.getElementById('pokemonList');
        pokemonListElement.innerHTML = '';
        
        this.filteredPokemon.forEach(pokemon => {
            if (pokemon) {
                const pokemonCard = this.createPokemonCard(pokemon);
                pokemonListElement.appendChild(pokemonCard);
            }
        });
    }

    createPokemonCard(pokemon) {
        const card = document.createElement('div');
        card.className = 'pokemon-card';
        card.onclick = () => this.showPokemonDetails(pokemon);
        
        card.innerHTML = `
            <div class="pokemon-image">
                <img src="${pokemon.image}" alt="${pokemon.name}" loading="lazy">
            </div>
            <div class="pokemon-number">#${pokemon.number}</div>
            <div class="pokemon-name">${pokemon.name}</div>
            <div class="pokemon-types">
                ${pokemon.types.map(type => `<span class="type-badge" style="background-color: var(--${type})">${this.getTypeSpanishName(type)}</span>`).join('')}
            </div>
        `;
        
        return card;
    }

    getTypeSpanishName(type) {
        const typeNames = {
            normal: 'Normal',
            fire: 'Fuego',
            water: 'Agua',
            electric: 'Eléctrico',
            grass: 'Planta',
            ice: 'Hielo',
            fighting: 'Lucha',
            poison: 'Veneno',
            ground: 'Tierra',
            flying: 'Volador',
            psychic: 'Psíquico',
            bug: 'Bicho',
            rock: 'Roca',
            ghost: 'Fantasma',
            dragon: 'Dragón',
            dark: 'Siniestro',
            steel: 'Acero',
            fairy: 'Hada'
        };
        
        return typeNames[type] || type;
    }

    async showPokemonDetails(pokemon) {
        const modal = document.getElementById('pokemonModal');
        const detailsContainer = document.getElementById('pokemonDetails');
        
        // Mostrar loading
        detailsContainer.innerHTML = '<div class="loading active"><div class="spinner"></div><p>Cargando detalles...</p></div>';
        modal.classList.add('active');
        
        // Obtener descripciones de habilidades
        const abilitiesWithDescriptions = await this.getAbilitiesDescriptions(pokemon.abilities);
        
        detailsContainer.innerHTML = `
            <div class="pokemon-details-header">
                <div class="pokemon-details-image">
                    <img src="${pokemon.image}" alt="${pokemon.name}">
                </div>
                <h2 class="pokemon-details-title">${pokemon.name}</h2>
                <div class="pokemon-details-number">#${pokemon.number}</div>
                <div class="pokemon-details-types">
                    ${pokemon.types.map(type => `<span class="type-badge" style="background-color: var(--${type})">${this.getTypeSpanishName(type)}</span>`).join('')}
                </div>
            </div>
            
            ${pokemon.description ? `
                <div class="pokemon-details-section">
                    <p style="font-style: italic; color: var(--text-secondary);">${pokemon.description}</p>
                </div>
            ` : ''}
            
            <div class="pokemon-details-section">
                <h3>Información Básica</h3>
                <div class="pokemon-info-grid">
                    <div class="pokemon-info-item">
                        <div class="pokemon-info-label">Altura</div>
                        <div class="pokemon-info-value">${pokemon.height} m</div>
                    </div>
                    <div class="pokemon-info-item">
                        <div class="pokemon-info-label">Peso</div>
                        <div class="pokemon-info-value">${pokemon.weight} kg</div>
                    </div>
                    <div class="pokemon-info-item">
                        <div class="pokemon-info-label">Exp. Base</div>
                        <div class="pokemon-info-value">${pokemon.baseExperience}</div>
                    </div>
                </div>
            </div>
            
            <div class="pokemon-details-section">
                <h3>Estadísticas</h3>
                <div class="stats-container">
                    ${pokemon.stats.map(stat => `
                        <div class="stat-item">
                            <div class="stat-name">${this.getStatSpanishName(stat.name)}</div>
                            <div class="stat-bar-container">
                                <div class="stat-bar" style="width: ${(stat.value / 255) * 100}%"></div>
                            </div>
                            <div class="stat-value">${stat.value}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="pokemon-details-section">
                <h3>Habilidades</h3>
                <div class="abilities-list">
                    ${abilitiesWithDescriptions.map(ability => `
                        <div class="ability-item">
                            <div class="ability-name">${ability.name} ${ability.isHidden ? '(Oculta)' : ''}</div>
                            <div class="ability-description">${ability.description}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            ${pokemon.evolutionChain.length > 1 ? `
                <div class="pokemon-details-section">
                    <h3>Cadena de Evolución</h3>
                    <div class="evolution-chain">
                        ${pokemon.evolutionChain.map((evolution, index) => `
                            <div class="evolution-stage">
                                <div class="evolution-image">
                                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.getPokemonIdFromUrl(evolution.url)}.png" alt="${evolution.name}" onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.getPokemonIdFromUrl(evolution.url)}.png'">
                                </div>
                                <div class="evolution-name">${evolution.name}</div>
                            </div>
                            ${index < pokemon.evolutionChain.length - 1 ? '<div class="evolution-arrow">→</div>' : ''}
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            
            ${pokemon.cries && (pokemon.cries.latest || pokemon.cries.legacy) ? `
                <div class="pokemon-details-section">
                    <button class="sound-button" onclick="pokedex.playPokemonCry('${pokemon.cries.latest || pokemon.cries.legacy}')">
                        🔊 Reproducir sonido
                    </button>
                </div>
            ` : ''}
        `;
    }

    async getAbilitiesDescriptions(abilities) {
        const abilitiesWithDescriptions = [];
        
        for (const ability of abilities) {
            try {
                const response = await fetch(ability.ability.url);
                const data = await response.json();
                
                const spanishDescription = data.flavor_text_entries.find(
                    entry => entry.language.name === 'es'
                );
                
                abilitiesWithDescriptions.push({
                    name: ability.name,
                    isHidden: ability.isHidden,
                    description: spanishDescription ? spanishDescription.flavor_text.replace(/\f/g, ' ') : 'Descripción no disponible'
                });
            } catch (error) {
                console.error('Error al obtener descripción de habilidad:', error);
                abilitiesWithDescriptions.push({
                    name: ability.name,
                    isHidden: ability.isHidden,
                    description: 'Descripción no disponible'
                });
            }
        }
        
        return abilitiesWithDescriptions;
    }

    getStatSpanishName(stat) {
        const statNames = {
            hp: 'PS',
            attack: 'Ataque',
            defense: 'Defensa',
            'special-attack': 'Ataque Esp.',
            'special-defense': 'Defensa Esp.',
            speed: 'Velocidad'
        };
        
        return statNames[stat] || stat;
    }

    getPokemonIdFromUrl(url) {
        const matches = url.match(/\/(\d+)\/$/);
        return matches ? matches[1] : '1';
    }

    playPokemonCry(audioUrl) {
        const audio = new Audio(audioUrl);
        audio.play().catch(error => {
            console.error('Error al reproducir sonido:', error);
        });
    }

    closeModal() {
        const modal = document.getElementById('pokemonModal');
        modal.classList.remove('active');
    }

    loadMorePokemon() {
        if (!this.isLoading) {
            this.offset += this.limit;
            this.loadPokemon();
        }
    }

    showLoading(show) {
        const loadingElement = document.getElementById('loading');
        if (show) {
            loadingElement.classList.add('active');
        } else {
            loadingElement.classList.remove('active');
        }
    }

    showError(message) {
        const pokemonListElement = document.getElementById('pokemonList');
        pokemonListElement.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
                <p>${message}</p>
            </div>
        `;
    }
}

// Inicializar la Pokédex cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    window.pokedex = new Pokedex();
});