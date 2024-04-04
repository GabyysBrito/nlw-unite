// let participantes = [{}]
let participantes = [
  {
    nome: "Diego Fernandez",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 01, 19, 23),
    dataCheckIn: new Date(2024, 2, 01, 20, 20)
  },

  {
  nome: "Gabrielle Oliveira",
  email: "Gabrielle@gmail.com",
  dataInscricao: new Date(2024, 1, 02, 19, 23),
  dataCheckIn: new Date(2024, 1, 05, 20, 20)
  },

  {
    nome: "Carlos Silva",
    email: "carlos@gmail.com",
    dataInscricao: new Date(2024, 0, 15, 14, 30),
    dataCheckIn: new Date(2024, 0, 15, 15, 45)
  },
  {
    nome: "Mariana Santos",
    email: "mariana@gmail.com",
    dataInscricao: new Date(2024, 0, 20, 10, 15),
    dataCheckIn: new Date(2024, 0, 20, 11, 30)
  },
  {
    nome: "Pedro Almeida",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 1, 5, 16, 45),
    dataCheckIn: new Date(2024, 1, 5, 17, 30)
  },
  {
    nome: "Ana Souza",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 2, 10, 13, 20),
    dataCheckIn: new Date(2024, 2, 10, 14, 40)
  },
  {
    nome: "Rafaela Lima",
    email: "rafaela@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 9, 55),
    dataCheckIn: new Date(2024, 2, 25, 10, 30)
  },

  {
    nome: "João Oliveira",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 3, 1, 17, 10),
    dataCheckIn: new Date(2024, 3, 1, 17, 55)
  },

  {
    nome: "Amanda Pereira",
    email: "amanda@gmail.com",
    dataInscricao: new Date(2024, 3, 5, 11, 40),
    dataCheckIn: new Date(2024, 3, 5, 12, 15)
  },
  {
    nome: "Lucas Martins",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 3, 10, 14, 20),
    dataCheckIn: new Date(2024, 3, 10, 15, 10)
  }

];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null){
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `
    <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
      <br>
      <small>
        ${participante.email}
      </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
    `
}

const atualizarLista = (participante) => {

  let output = ""
  
  //estrtura de repetição
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  //substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output

  } 

atualizarLista(participantes[2])

const adicionarParticipante = (event) => {
  event.preventDefault() //não faça o padrão 

  const dadosDoFomurlario = new FormData(event.target) //alvo do formlario

  const participante = {
      nome: dadosDoFomurlario.get('nome'),
      email: dadosDoFomurlario.get('email'),
      dataInscricao: new Date(),
      dataCheckIn: null //não existe ainda então nulo
    }

    //verificar de participante existe 
    const participanteExiste = participantes.find(
      (p) => p.email == participante.email
    )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  //Limpar formulário
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
  
  if(confirm(mensagemConfirmacao) == false) {
    return 
  }

  alert(resultado)

  //encontrar o participante dentro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )
  //atualizar o check-in do participante
  participante.dataCheckIn = new Date()
  //atualizar a lista de participantes
  atualizarLista(participantes)

}
