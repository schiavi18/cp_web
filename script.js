// Dados iniciais
const initialData = [
  {
    nome: "Andressa Alves",
    posicao: "Meio-campo",
    clube: "Corinthians",
    foto: "https://example.com/andressa.jpg",
    gols: 15,
    assistencias: 10,
    jogos: 28,
    favorita: false
  },
  {
    nome: "Dayana Rodríguez",
    posicao: "Meio-campo",
    clube: "Corinthians",
    foto: "https://example.com/dayana.jpg",
    gols: 5,
    assistencias: 12,
    jogos: 30,
    favorita: false
  },
  {
    nome: "Mariza",
    posicao: "Zagueira",
    clube: "Corinthians",
    foto: "https://example.com/mariza.jpg",
    gols: 2,
    assistencias: 1,
    jogos: 32,
    favorita: false
  },
  {
    nome: "Thaís Regina",
    posicao: "Zagueira",
    clube: "Corinthians",
    foto: "https://example.com/thais.jpg",
    gols: 1,
    assistencias: 2,
    jogos: 25,
    favorita: false
  },
  {
    nome: "Letícia Teles",
    posicao: "Zagueira",
    clube: "Corinthians",
    foto: "https://example.com/leticia.jpg",
    gols: 0,
    assistencias: 0,
    jogos: 18,
    favorita: false
  }
];

const STORAGE_KEY = "jogadoras";

//local storage inicia 
function initData() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  }
}
//retorna lista

function getJogadoras() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

//salva lista
function setJogadoras(jogadoras) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jogadoras));
}
//cards
function renderJogadoras() {
  const container = document.getElementById("cardsContainer");
  container.innerHTML = "";

  let jogadoras = getJogadoras();
  const search = document.getElementById("search").value.toLowerCase();
  const filterClube = document.getElementById("filterClube").value;

  // filtro
  jogadoras = jogadoras.filter(j =>
    (j.nome.toLowerCase().includes(search) || j.posicao.toLowerCase().includes(search)) &&
    (filterClube === "" || j.clube === filterClube)
  );

  jogadoras.forEach((j, index) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${j.foto}" alt="${j.nome}">
      <h3>${j.nome}</h3>
      <p>${j.posicao} - ${j.clube}</p>
      <p>Gols: ${j.gols} | Assistências: ${j.assistencias} | Jogos: ${j.jogos}</p>
      <div class="actions">
        <button class="action-btn" onclick="toggleFavorita(${index})">${j.favorita ? "★" : "☆"}</button>
        <button class="action-btn" onclick="editJogadora(${index})">✏️</button>
        <button class="action-btn" onclick="deleteJogadora(${index})">🗑️</button>
      </div>
    `;

    container.appendChild(card);
  });

  atualizarFiltroClubes();
}

function atualizarFiltroClubes() {
  const jogadoras = getJogadoras();
  const select = document.getElementById("filterClube");
  const clubes = [...new Set(jogadoras.map(j => j.clube))];

  select.innerHTML = `<option value="">Todos os clubes</option>`;
  clubes.forEach(clube => {
    const option = document.createElement("option");
    option.value = clube;
    option.textContent = clube;
    select.appendChild(option);
  });
}

function toggleFavorita(index) {
  const jogadoras = getJogadoras();
  jogadoras[index].favorita = !jogadoras[index].favorita;
  setJogadoras(jogadoras);
  renderJogadoras();
}

document.getElementById("playerForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const jogadoras = getJogadoras();

  const novaJogadora = {
    nome: document.getElementById("nome").value,
    posicao: document.getElementById("posicao").value,
    clube: document.getElementById("clube").value,
    gols: parseInt(document.getElementById("gols").value),
    assistencias: parseInt(document.getElementById("assistencias").value),
    jogos: parseInt(document.getElementById("jogos").value),
    foto: document.getElementById("foto").value,
    favorita: false
  };

  const editIndex = document.getElementById("editIndex").value;
  if (editIndex !== "") {
    jogadoras[editIndex] = novaJogadora;
    alert("Jogadora editada com sucesso!");
  } else {
    jogadoras.push(novaJogadora);
    alert("Jogadora adicionada com sucesso!");
  }

  setJogadoras(jogadoras);
  this.reset();
  document.getElementById("editIndex").value = "";
  renderJogadoras();
});


function editJogadora(index) {
  const jogadora = getJogadoras()[index];
  document.getElementById("nome").value = jogadora.nome;
  document.getElementById("posicao").value = jogadora.posicao;
  document.getElementById("clube").value = jogadora.clube;
  document.getElementById("gols").value = jogadora.gols;
  document.getElementById("assistencias").value = jogadora.assistencias;
  document.getElementById("jogos").value = jogadora.jogos;
  document.getElementById("foto").value = jogadora.foto;
  document.getElementById("editIndex").value = index;
}


function deleteJogadora(index) {
  const jogadoras = getJogadoras();
  jogadoras.splice(index, 1);
  setJogadoras(jogadoras);
  alert("Jogadora removida com sucesso!");
  renderJogadoras();
}


function ordenarPorNome() {
  const jogadoras = getJogadoras();
  jogadoras.sort((a, b) => a.nome.localeCompare(b.nome));
  setJogadoras(jogadoras);
  renderJogadoras();
}

function ordenarPorPosicao() {
  const jogadoras = getJogadoras();
  jogadoras.sort((a, b) => a.posicao.localeCompare(b.posicao));
  setJogadoras(jogadoras);
  renderJogadoras();
}


document.getElementById("search").addEventListener("input", renderJogadoras);
document.getElementById("filterClube").addEventListener("change", renderJogadoras);


initData();
renderJogadoras();