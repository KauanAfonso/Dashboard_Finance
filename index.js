// Função para renderizar uma única transação
function renderTransaction(transaction) {
    const card = document.createElement('div');
    card.className = 'card';

    const inputId = document.createElement('input');
    inputId.type = 'hidden';
    inputId.value = transaction._id;
    inputId.id = `transaction-${transaction._id}`;

    const nameEl = document.createElement('h4');
    nameEl.textContent = `Nome da transação: ${transaction.name}`;

    const typeEl = document.createElement('h5');
    typeEl.textContent = `Tipo: ${transaction.type_t}`;

    const valueEl = document.createElement('p');
    valueEl.textContent = `Valor: R$ ${parseFloat(transaction.value).toFixed(2)}`;

    const btnDelete = document.createElement('button');
    btnDelete.textContent = 'Excluir';
    btnDelete.className = 'btn btn-danger';
    btnDelete.id = `delete-${transaction._id}`;

    const btnUpdate = document.createElement('button');
    btnUpdate.textContent = 'Atualizar';
    btnUpdate.className = 'btn btn-dark';
    btnUpdate.setAttribute('data-bs-toggle', 'modal');
    btnUpdate.setAttribute('data-bs-target', '#staticBackdrop');

    card.append(inputId, nameEl, typeEl, valueEl, btnUpdate, btnDelete);
    document.getElementById('transactions').appendChild(card);

    const url = `http://localhost:3000/transaction/${transaction._id}`;
    btnDelete.addEventListener('click', () => deleteTransaction(url));
    btnUpdate.addEventListener('click', () => loadUpdateForm(url, transaction));
}

// Buscar e renderizar todas as transações
async function getTransactions(url) {
    const response = await fetch(url);
    const data = await response.json();
    data.forEach(renderTransaction);
}

// Calcular o total das transações
async function getTotal() {
    try {
        const response = await fetch('http://localhost:3000/transaction');
        const data = await response.json();

        const total = data.reduce((acc, item) => {
            const value = parseFloat(item.value);
            return item.type_t === 'Entry' ? acc + value : acc - value;
        }, 0);

        return total;
    } catch (error) {
        console.error('Erro ao calcular total:', error);
        return 0;
    }
}

// Mostrar total no DOM
async function renderTotal() {
    const total = await getTotal();
    document.getElementById('total_value').textContent = `R$ ${total.toFixed(2)}`;
}

// Criar uma nova transação
document.getElementById('form').addEventListener('submit', async (ev) => {
    ev.preventDefault();

    const data = {
        name: document.getElementById('name').value,
        value: document.getElementById('value').value,
        type_t: document.getElementById('entry_exit').value
    };

    await fetch('http://localhost:3000/transaction', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    });

    ev.target.reset();
    location.reload();
});

// Atualizar uma transação
async function updateTransaction(url) {
    const updatedData = {
        name: document.getElementById('name_update').value,
        value: document.getElementById('value_update').value,
        type_t: document.getElementById('entry_exit_update').value
    };

    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(updatedData)
    });

    const result = await response.json();
    console.log('Atualizado:', result);
}

// Carregar dados no formulário de atualização
function loadUpdateForm(url, transaction) {
    const form = document.getElementById('form_update');
    form.action = url;

    document.getElementById('name_update').value = transaction.name;
    document.getElementById('value_update').value = transaction.value;
    document.getElementById('entry_exit_update').value = transaction.type_t;

    form.onsubmit = (ev) => {
        ev.preventDefault();
        updateTransaction(url).then(() => location.reload());
    };
}

// Deletar uma transação
async function deleteTransaction(url) {
    await fetch(url, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' }
    });

    alert('Transação deletada com sucesso!');
    location.reload();
}

// Inicialização
getTransactions('http://localhost:3000/transaction');
renderTotal();
