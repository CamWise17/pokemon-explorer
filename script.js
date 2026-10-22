const fetchButton =
    document.getElementById("fetch-button");

const searchButton =
    document.getElementById("search-button");

const searchBox =
    document.getElementById("search-box");

const container =
    document.getElementById("pokemon-container");

const showMessage = (text) => {
    const heading =
        document.createElement("h2");

    heading.textContent = text;

    container.textContent = "";

    container.appendChild(heading);
};

const createCard = (pokemon) => {

    const card =
        document.createElement("div");

    card.classList.add("card");

    const image =
        document.createElement("img");

    image.src =
        pokemon.sprites.front_default;

    image.alt =
        pokemon.name;

    const name =
        document.createElement("h3");

    name.textContent =
        pokemon.name;

    const height =
        document.createElement("p");

    height.textContent =
        `Height: ${pokemon.height}`;

    const weight =
        document.createElement("p");

    weight.textContent =
        `Weight: ${pokemon.weight}`;

    card.append(
        image,
        name,
        height,
        weight
    );

    container.appendChild(card);
};

const fetchPokemon = async () => {

    showMessage("Fetching Pokemon...");

    try {

        const response =
            await fetch(
                "https://pokeapi.co/api/v2/pokemon?limit=20"
            );

        const data =
            await response.json();

        container.textContent = "";

        for (const item of data.results) {

            const pokemonResponse =
                await fetch(item.url);

            const pokemon =
                await pokemonResponse.json();

            createCard(pokemon);
        }

    } catch (error) {

        showMessage(
            `Error: ${error.message}`
        );

    }
};

const searchPokemon = async (name) => {

    showMessage("Searching...");

    try {

        const response =
            await fetch(
                `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
            );

        if (!response.ok) {

            showMessage(
                "Pokemon not found."
            );

            return;
        }

        const pokemon =
            await response.json();

        container.textContent = "";

        createCard(pokemon);

    } catch (error) {

        showMessage(
            `Error: ${error.message}`
        );

    }
};

fetchButton.addEventListener(
    "click",
    fetchPokemon
);

searchButton.addEventListener(
    "click",
    () => {

        const searchText =
            searchBox.value.trim();

        if (!searchText) {

            showMessage(
                "Please enter a Pokemon."
            );

            return;
        }

        searchPokemon(searchText);
    }
);