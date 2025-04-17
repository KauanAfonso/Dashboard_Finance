


function renderTransactions(data){
    const div_main = document.createElement('div')
    div_main.classList = "card";

    const name_transaction = document.createElement('h4');
    name_transaction.textContent = `Nome da transação: ${data.name}`;

    const input_id = document.createElement('input');
    input_id.setAttribute('type','hidden');
    input_id.value = data.id;
    input_id.id = `transaction ${data.id}`

    const type = document.createElement('h5')
    type.textContent = `Transaction's type: ${data.type_t}`

    const value_transaction = document.createElement('p');
    value_transaction.textContent = `Value: ${data.value}`;

    const btn_delete = document.createElement('button')
    btn_delete.textContent = "Excluir";
    btn_delete.classList ="btn btn-danger";
    btn_delete.id = `Excluir ${data.id}`


    const btn_update = document.createElement('button')
    btn_update.setAttribute('data-bs-toggle', 'modal')
    btn_update.setAttribute
    ('data-bs-target', '#staticBackdrop')
    btn_update.classList = "btn btn-dark"
    btn_update.textContent = "Update"

    div_main.append(input_id, name_transaction, type, value_transaction,btn_update ,btn_delete)
    document.getElementById('transactions').append(div_main)
    
    const url = `http://localhost:3000/transaction/${data.id}`

    btn_delete.addEventListener('click',()=> delete_transaction(url) )
    btn_update.addEventListener('click',()=> form_uptade(url,data) )  

}


async function getTransactions(url) {
    const response = await fetch(url);
    data = await response.json();
    console.log(data)
    data.forEach(renderTransactions);
}

getTransactions('http://localhost:3000/transaction')


async function getTotal() {
    
    let total = 0
    const response = await fetch('http://localhost:3000/transaction')
    data = await response.json();
    try{
    total = data.reduce((value,element)=>{
        if(element.type_t == "Entry"){
            return value+=parseFloat(element.value)
        }else{
            return value-=parseFloat(element.value)
        }
    },0)
    }catch(Exeption){
        console.log('erro' +Exeption)
    }

    return total
}   
async function renderTotal() {
    const getTotalFunction = await getTotal()
    document.getElementById('total_value').textContent = `R$ ${getTotalFunction}`
   
}

renderTotal()

const form = document.getElementById('form')
  
    form.addEventListener('submit',  async(ev)=>{
        ev.preventDefault()

        const data = {
            name:document.getElementById('name').value,
            value:document.getElementById('value').value,
            type_t:document.getElementById('entry_exit_update').value
        }

        const response = await fetch('http://localhost:3000/transaction', {
            method:'POST',
            headers:{
                "Content-type": "application/json"
            },
            body:JSON.stringify(data)
        })

        const responseData = await response.json()
        form.reset()
        location.reload() 
        getTransactions('http://localhost:3000/transaction')
    
    })


async function update_transaction(url) {

    const info = {
        name:document.getElementById('name_update').value,
        value:document.getElementById('value_update').value,
        type_t:document.getElementById('entry_exit').value
    }

    const response = await fetch(url,{
        method:'PUT',
        headers:{
            "Content-type":'Application/json'
        },
        body:JSON.stringify(info)
    })



    const response_data = await response.json()
    console.log(response_data)
}

const form_uptade = (url, info) =>{
    let form = document.getElementById('form_update')
    form.action = url
   
    document.getElementById('name_update').value = info.name,
    document.getElementById('value_update').value = info.value,
    document.getElementById('entry_exit').value = info.value
    
    
    form.addEventListener('submit', (ev)=>{
        ev.preventDefault()
        update_transaction(url)
        location.reload()
    })
    
}

async function delete_transaction(url){
        const response = await fetch(url,{
            method:'DELETE',
            headers:{
                "Content-type": "Application/json"
            },
        });

        alert('DELETADO COM SUCESSO')
        location.reload()       
}


