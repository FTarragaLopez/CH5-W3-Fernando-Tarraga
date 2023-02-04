/* eslint-disable arrow-parens */
/* eslint-disable no-await-in-loop */
/* eslint-disable new-cap */
/* eslint-disable camelcase */
/* eslint-disable indent */
/* eslint-disable quotes */
const lists__pokemons = document.getElementById("lists__pokemons");
const buttons = document.getElementById("buttons");
const urlPokemon = " https://pokeapi.co/api/v2/pokemon";
let btnNext;
let btnPrevious;
let templateHtml;
console.log("⏮⏩");

async function GetPokemons(url) {
  try {
    const response = await fetch(url);
    const results = await response.json();
    console.log(results);
    DataPokemons(results.results);

    btnNext = results.next
      ? `<button class="btn" data-url=${results.next}>⏩</button>`
      : "";
    btnPrevious = results.previous
      ? `<button class="btn" data-url=${results.previous}>⏮</button>`
      : "";
    buttons.innerHTML = btnPrevious + " " + btnNext;
  } catch (error) {
    console.log(error);
  }
}

GetPokemons(urlPokemon);

const DataPokemons = async (data) => {
  lists__pokemons.innerHTML = "";
  try {
    for (const index of data) {
      const resp = await fetch(index.url);
      const resul = await resp.json();
      console.log(resul);
      templateHtml = `
            <div class="pokemon__img">
            <img src=${resul.sprites.other.dream_world.front_default} alt=${resul.name}/>
            <p>${resul.name}</p>
            </div>
            `;
      lists__pokemons.innerHTML += templateHtml;
    }
  } catch (error) {
    console.log(error);
  }
};

buttons.addEventListener("click", (e) => {
  if (e.target.matches(".btn")) {
    const value = e.target.dataset.url;
    console.log(value);
    GetPokemons(value);
  }
});
