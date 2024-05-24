const pokemonImage = document.querySelector('.pokemon_image');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonName = document.querySelector('.pokemon_name');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const prev = document.querySelector('.btn-prev');
const next = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon)=>{
    const APIResponse =  await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    //status 200 = encontrado
    //status 404 = nao encontrado
    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
}
const renderPokemon = async (pokemon)=>{
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data){
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    }else{
        pokemonName.innerHTML ='dados não encontrados';
        pokemonNumber.innerHTML ='';
        pokemonImage.style.display = 'none';
    }
}
form.addEventListener('submit', (event)=>{
    event.preventDefault()
    renderPokemon(input.value.toLowerCase())
})
prev.addEventListener('click', ()=>{
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon)
    }
})
next.addEventListener('click', ()=>{
        searchPokemon += 1;
        renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon);
