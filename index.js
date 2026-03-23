const content = document.querySelector("#content");
const submit = document.querySelector('#add');
const update = document.querySelector("#update");

//POST API
submit.addEventListener('click', () => {
    let title = document.querySelector("#title").value;
    let seatNum = document.querySelector("#seatNum").value;
    let date = document.querySelector("#date").value;
    let name = document.querySelector("#name").value;
    let formData={title,seatNum,date,name};

    fetch('https://pcs112ticketreservation-back-1.onrender.com/api/add', {
        method: 'POST',
        body: JSON.stringify(formData), 
        headers: {
            "Content-Type": "application/json",
        },
    }).catch((error) => {
        console.log(error);
    })
    alert("User Added Successfully");
    location.reload();
});

window.addEventListener('load', () => {
    getUsers();
})

function getUsers(){
    let html = ""
    fetch('https://pcs112ticketreservation-back-1.onrender.com/api/view', {mode:'cors'})

    .then(response=>{
        console.log(response);
        return response.json();
    })

    .then(data=>{
        console.log(data);
        data.forEach(element=>{
            html+=`
            <tr>
                <td>${element.title} </td>
                <td>${element.seatNum}</td>
                <td>${element.date}</td>
                <td>${element.name}</td>
                <td>
                    <a href="javascript:void(0)" onclick="deleteMember(${element.id})" class="border-[0F2854] border rounded-lg px-2 w-auto hover:bg-[0F2854] hover:text-white mr-2"> Delete</a>
                    <a href="javascript:void(0)" onclick="updateMember(${element.id})" class="border-[0F2854] border rounded-lg px-2 w-auto hover:bg-[0F2854]hover:text-white"> Update</a>
                </td>
            </tr>`    
        })
        content.innerHTML=html;
    })
    .catch(error=>{
        console.log(error);
    })
}


//DELETE
function deleteMember(id){

    let text;

    if (confirm("Press a button!") == true) {
        
    
        fetch("https://pcs112ticketreservation-back-1.onrender.com/api/delete",{
            method:'DELETE',
            body: JSON.stringify({id}),
            headers:{
                "Content-Type":"application/json",
            },
        })
        .then(response=> {
            if (response.ok) {
                alert("User Deleted Successfully");
                location.reload();
            } else {
                alert ("Error Deleting User");
            }
        }).catch(error => console.log(error));
    }
}

    // search
    function updateMember(id){
        fetch (`https://pcs112ticketreservation-back-1.onrender.com/api/view/${id}` )
        .then( response => response.json())
        .then(data => {
            
            document.querySelector("#title").value=data[0].title;
            document.querySelector("#seatNum").value=data[0].seatNum;
            let dateValue = new Date(data[0].date).toISOString().split('T')[0];
            document.querySelector("#date").value = dateValue;
            document.querySelector("#name").value=data[0].name;

            document.querySelector("#ID").value=data[0].id;
        }).catch(error=> {
            console.log(error)
        })
    }

    // put
    update.addEventListener('click', () => {
    let title = document.querySelector('#title').value;
    let seatNum = document.querySelector('#seatNum').value;
    let date = document.querySelector('#date').value;
    let name = document.querySelector('#name').value;
    let id = document.querySelector("#ID").value
    
    let formData = {title, seatNum, date, name, id};

        fetch (`https://pcs112ticketreservation-back-1.onrender.com/api/update`, {
            method: 'PUT',
            body: JSON.stringify(formData),
            headers : {
                "Content-Type" : "application/json",
            },
        }).catch((error)=>{
            console.log(error);
        })
        alert("User Updated Successfully")
        location.reload();
})
