const mainContainer = document.querySelector('#main');

const ClientName = document.querySelector(".client-name");
const CNPJ = document.querySelector(".client-cnpj");
const data = document.querySelector('#data');
const total = document.querySelector('#total');
const tableBody = document.querySelector('.table-body');

const inputName = document.querySelector('#txtName');
const inputCnpj = document.querySelector('#txtCnpj');
const inputData = document.querySelector('#input-Data');
const inputProductName = document.querySelector('#input-productName');
const inputQuant = document.querySelector('#input-quantidade');
const inputPrice =  document.querySelector('#input-price');
const form = document.querySelector('#form');
const downloadLink = document.querySelector('#download');


let PriceTotal = [];
const items = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if(!inputName.value || !inputPrice.value) {
    alert('Algum dado não foi inserido corretamente!')
    return
  }
  const name = inputProductName.value;
  const quantidade = inputQuant.value || '1';
  const price = Number(inputPrice.value) * Number(quantidade);;
  PriceTotal.push(Number(price));
  
  items.push({
    quant: quantidade,
    desc: name,
    price: price
  });


  changeDOM();
  addItemTable(quantidade, name, price);
  alert('Atualizado com sucesso');

  window.scroll(0, window.innerHeight)
  
})

downloadLink.addEventListener('click', () => {
  getIMG();
});

function getIMG() {
  domtoimage.toPng(mainContainer)
    .then(function(dataUrl) {
      downloadLink.download = 'criasom.png';
      downloadLink.href = dataUrl;
    })
    .catch(function (err){
      console.error(err);
    })
}

function getDateFormated() {
  const data = new Date();
  const dia = data.getDate();
  const mes = data.getMonth();
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

function formatPrice(number) {
  return number.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function addItemTable() {
  tableBody.innerHTML = '';
  items.map((item, index) => {
    const tr = document.createElement('tr');
    const tdQuant = document.createElement('td');
    const tdName = document.createElement('td');
    const tdPrice = document.createElement('td');
    
    tdPrice.classList.add('table-single-total');
  
    tdQuant.textContent = item.quant;
    tdName.textContent = item.desc;
    tdPrice.textContent = formatPrice(item.price);
  
    tr.appendChild(tdQuant);
    tr.appendChild(tdName);
    tr.appendChild(tdPrice);

    tr.addEventListener('dblclick', () => {
      const confirmDelete = confirm('Deseja excluir item?');
      if(!confirmDelete) return;
      items.splice(index, 1);
      addItemTable();
    });
  
    tableBody.appendChild(tr);
  });
}

function changeDOM() {
  const totalSoma = formatPrice(PriceTotal.reduce((acc, currValue) => acc + currValue, 0));
  

  ClientName.textContent = inputName.value;
  CNPJ.textContent = inputCnpj.value || '--- local de aplicação ---';
  data.textContent = inputData.value.replace(/-/g, '/') || getDateFormated();
  total.textContent = totalSoma;
}