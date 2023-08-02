function calcIdade(event) {
  event.preventDefault();
  console.log("calcIdade ON");
  let user = pegarInfo();
  let idade = calcAno(user.ano, user.mes, user.dia);
  let faixa = faixaEtaria(idade);

  console.log(faixa);

  user = classData(user, idade, faixa);

  cadastrarUser(user);
  carregarUser();
}

function pegarInfo() {
  let nomeRecebido = document.getElementById("nome").value.trim();
  let diaRecebido = document.getElementById("dia-nascimento").value;
  let mesRecebido = document.getElementById("mes-nascimento").value;
  let anoRecebido = document.getElementById("ano-nascimento").value;

  let dadosUser = {
    nome: nomeRecebido,
    dia: diaRecebido,
    mes: mesRecebido,
    ano: anoRecebido,
  };

  console.log(dadosUser);

  return dadosUser;
}

function calcAno(ano, mes, dia) {
  let hoje = new Date();
  let aniversario = new Date(ano, mes - 1, dia);
  let idade = hoje.getFullYear() - aniversario.getFullYear();
  let diferencaMes = hoje.getMonth() - aniversario.getMonth();

  if (
    diferencaMes < 0 ||
    (diferencaMes === 0 && hoje.getDate() < aniversario.getDate())
  ) {
    idade--;
  }

  return idade;

  // let idade = 2023 - ano;
  // console.log(idade);
  // return idade;
}

function faixaEtaria(idade) {
  if (idade > 0 && idade < 12) {
    return "Criança";
  } else if (idade > 13 && idade < 17) {
    return "Adolescente";
  } else if (idade > 18 && idade < 65) {
    return "Adulto";
  } else if (idade > 65) {
    return "Idoso";
  }
}

function classData(user, calcAno, faixaEtaria, dia, mes, ano) {
  let nasc = `${user.dia}/${user.mes}/${user.ano}`;
  console.log(nasc);

  let udata = {
    ...user,
    dataNascimento: nasc,
    idadeAno: calcAno,
    etaria: faixaEtaria,
  };

  return udata;
}

function cadastrarUser(user) {
  let listaUser = [];

  if (localStorage.getItem("userCadastrado") != null) {
    listaUser = JSON.parse(localStorage.getItem("userCadastrado"));
  }

  listaUser.push(user);

  localStorage.setItem("userCadastrado", JSON.stringify(listaUser));
}

function carregarUser() {
  let listaRenderizada = [];

  if (localStorage.getItem("userCadastrado") != null) {
    listaRenderizada = JSON.parse(localStorage.getItem("userCadastrado"));
  }

  if (listaRenderizada.length == 0) {
    let tabela = document.getElementById("corpo-tabela");

    tabela.innerHTML = `<tr>
    <td colspan = "5">Nenhum usuário cadastrado!</td>
    </tr>`;
  } else {
    montarTabela(listaRenderizada);
  }

  console.log(listaRenderizada);
}

window.addEventListener("DOMContentLoaded", () => carregarUser());

function montarTabela(listaUser) {
  let tabela = document.getElementById("corpo-tabela");

  let template = "";

  listaUser.forEach((user) => {
    template += `                    
    <tr>
    <td data-cell="nome">${user.nome}</td>
    <td data-cell="data de nascimento">${user.dataNascimento}</td>
    <td data-cell="idade">${user.idadeAno}</td>
    <td data-cell="faixa etária">${user.etaria}</td>
    </tr>`;
  });

  tabela.innerHTML = template;
}

function clearUser() {
  localStorage.removeItem("userCadastrado");

  window.location.reload();
}
