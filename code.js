// let count=0
// function get_expense_details()
// {
    

//     // Getting input values
//     const exp_date = document.getElementById("expense_date").value
//     const exp_type = document.getElementById("expense_type").value
//     const amount = Number(document.getElementById("expense_amount").value)
//     sessionStorage.setItem('entered_amount',amount)
   

//     count += amount

//     // console.log(exp_date,exp_type,amount)

//     let table = document.getElementById("table_data");
//     let row = table.insertRow(1)
//     let cell1 = row.insertCell()
//     let cell2 = row.insertCell()
//     let cell3 = row.insertCell()
//     let cell4 = row.insertCell()
//          let button1 = document.createElement('button')
//          let button2 = document.createElement('button')

//          button1.type = 'button'
//          button2.type = 'button'

//          button1.className = 'split_btn' 
//          button2.className ='delete_btn'

//          button1.innerHTML= 'Split'
//          button2.innerHTML='Delete'

//     cell1.innerHTML = exp_date;
//     cell2.innerHTML = exp_type;
//     cell3.innerHTML = amount;
//     cell4.appendChild(button1)
//     cell4.appendChild(button2)

//     let total_expenditure = document.getElementById("total_amount")
//     total_expenditure.innerHTML = count


//     let modal = document.getElementById("Modal");
//     var span = document.getElementsByClassName("close")[0];
    

//     button1.onclick = function()
//     {
//         modal.style.display='block'
//         existing_amount.innerHTML = sessionStorage.getItem('entered_amount')
//     }

//     span.onclick = function()
//     {
//         modal.style.display = 'none'
        
//     }

//     window.onclick = function(event) {
//         if (event.target == modal) {
//           modal.style.display = "none";
//         }
//     }


//     split_button.onclick = function()
//     {
//         let SP = Number(document.getElementById('Number_of_persons').value)
//         // console.log(SP)
//         let splitted_amount_per_person = (sessionStorage.getItem('entered_amount'))/SP
//         dispay_result.innerHTML =  "Shared Amount ="+ splitted_amount_per_person

//         save_button.onclick = function()
//         {
//             modal.style.display = 'none'
//             cell3.innerHTML = ("Spent Amount : " + amount + "&nbsp" + "Per Person : " + splitted_amount_per_person)
//         }
//     }



// }
let Data;
let count=0
window.onload =async () =>
{
    let StoredData =await localStorage.getItem('Local_Data');

    if (StoredData) {
        Data = JSON.parse(StoredData)
    }
    else{
        Data = []
    }
    display_data()
}

let stringtohtml = (htmlCode) => {
    let parser = new DOMParser()
    return parser.parseFromString(htmlCode,'text/html').body.querySelector('tr')
}

let  get_expense_details = async() =>
{
    
    let Entered_data = [document.getElementById("expense_date").value,document.getElementById("expense_type").value,Number(document.getElementById("expense_amount").value)]
    Data = await JSON.parse(localStorage.getItem('Local_Data')) ?? []
    Data.push(Entered_data)
    localStorage.setItem('Local_Data',JSON.stringify(Data))
    display_data()
}

let display_data = ()=>{
    let tbody = document.getElementById('row')
    tbody.innerHTML=''
    let Total=0
    Data.forEach( (element,i) => {
        Total+= element[2]
     tbody.append(stringtohtml(` <table><tr><td> ${element[0]} </td>
         <td> ${element[1]} </td>
         <td> ${element[2]} </td>
         <td><button id='split_btn${i}' onclick=split_function(${i})> Split </button> <button class='delete_btn' onclick=Delete_function(${i})> Delete </button> </td></tr></table>`))
    })
    let total_expenditure = document.getElementById("total_amount")
    total_expenditure.innerHTML = Total
}

let split_function=(index)=>{      

    let modal = document.getElementById("Modal");
       modal.style.display='block'
    
    let existing_amount = document.getElementById('existing_amount')
    existing_amount.value = Number(Data[index][2])

    document.getElementById('save_button').value = index
    document.getElementById('split_button').value = index

    
}

let Delete_function = (index) =>
{
    Data.splice(index,1)
    localStorage.setItem('Local_Data',JSON.stringify(Data))
    display_data()
}

function Calculation(value)
{

 
    let Entered_value = Number(document.getElementById('Number_of_persons').value)
    // console.log(Entered_value)
    let amount = Number(document.getElementById("existing_amount").value)
    // console.log(amount)
    Data[value][2] = (amount/Entered_value)

     Data[value][1] += ` split added with ${Entered_value} members`
     localStorage.setItem('Local_Data',JSON.stringify(Data))

    // localStorage.setItem('Local_Data',JSON.stringify(Data))

    let modal = document.getElementById("Modal");
    modal.style.display = 'none'
    display_data()

        let split = document.getElementById('split_btn'+value)
        console.log(split)
        split.style.display = 'none'
    // split_btn.style.display ='none'


}

// function Save_Data(value)
// {
//     // let val = display_result.innerHTML
//     let split = Number(document.getElementById('Number_of_persons').value)

    
//     // Data[value][2] = val
//     Data[value][1] += ` split added with ${split} members`

//     localStorage.setItem('Local_Data',JSON.stringify(Data))
//         let modal = document.getElementById("Modal");
//         modal.style.display = 'none'

//     display_data()

// }

function close_modal()
{
    let modal = document.getElementById("Modal");
        modal.style.display = 'none'
}
