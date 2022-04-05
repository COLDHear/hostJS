/* Popup Windows Close handler */
document.querySelector('#Add-Entry').addEventListener("click", function(){
    document.querySelector(".add-popup").classList.add("activate");
});
document.querySelector('.add-popup .close-btn').addEventListener("click", function(){
    document.querySelector(".add-popup").classList.remove("activate");
});



/* ---------------------------------------------------------------------------------------------------- */
// Function for Add-Entry Button
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addEntry-btn').addEventListener('click', addMarkData);
    document.querySelector('#popup #addEntry-btn').addEventListener("click", function(){
        document.querySelector("#popup").classList.remove("activate");
        buildTable(markData);
    });
});

// Function for Search Input
$('#search-input').on('keyup', function(){
    var value = $(this).val();
    var data = searchTable(value, markData);
    buildTable(data);
});
function searchTable(value, data){
    var filteredData = [];

    for (var i = 0; i < data.length; i++){
        value = value.toLowerCase();
        var name = data[i].Name.toLowerCase();

        if (name.includes(value)) {
            filteredData.push(data[i]);
        }
    }

    return filteredData;
}



/* ---------------------------------------------------------------------------------------------------- */
//Declare an Object Global Array
let markData = [
    {ID: 180103, Name: "Obedient Boas JR Putro", Tugas1: 60, Tugas2: 50, Tugas3: 70, Tugas4: 80, Tugas5: 90, UTS: 80, UAS: 90, Grade: 77.5 +" (B+)", Ket: "Lulus"},
    {ID: 051202, Name: "William Darren Beethoven Sahid", Tugas1: 60, Tugas2: 50, Tugas3: 70, Tugas4: 80, Tugas5: 90, UTS: 80, UAS: 90, Grade: 77.5 +" (B+)", Ket: "Lulus"},
    {ID: 250403, Name: "Aril Saraun", Tugas1: 60, Tugas2: 50, Tugas3: 70, Tugas4: 80, Tugas5: 90, UTS: 80, UAS: 90, Grade: 77.5 +" (B+)", Ket: "Lulus"},
    {ID: 160602, Name: "Livirji Viorela Wantalangi", Tugas1: 60, Tugas2: 50, Tugas3: 70, Tugas4: 80, Tugas5: 90, UTS: 80, UAS: 90, Grade: 77.5 +" (B+)", Ket: "Lulus"}
];
 
/* Call Fetich and Validation Function (Main Function) */
const addMarkData = (ev) => {
    ev.preventDefault();    //Menghindari Submit dari Input Button Form
    var getValidation = nameValidation();
    if (getValidation) {

        /* Fetching All Mark Grade, ID and Name Before Grading */
        var dataArray = [
            document.getElementById('Tugas1').value,
            document.getElementById('Tugas2').value,
            document.getElementById('Tugas3').value,
            document.getElementById('Tugas4').value,
            document.getElementById('Tugas5').value,
            document.getElementById('UTS').value,
            document.getElementById('UAS').value
        ];

        var getGrade = countGrade.apply(null, dataArray);
        var getMark = grading(getGrade * 1);
        var getGradeDeccission = gradeDecission(getGrade * 1);
        let data = {
            ID: Date.now(),
            Name: document.getElementById('Name').value,
            Tugas1: document.getElementById('Tugas1').value,
            Tugas2: document.getElementById('Tugas2').value,
            Tugas3: document.getElementById('Tugas3').value,
            Tugas4: document.getElementById('Tugas4').value,
            Tugas5: document.getElementById('Tugas5').value,
            UTS: document.getElementById('UTS').value,
            UAS: document.getElementById('UAS').value,
            Grade: getGrade + " (" + getMark + ")",
            Ket: getGradeDeccission
        };

        markData.push(data);
        document.forms[0].reset();

        //Display Output
        console.warn('added', {markData} );
        //let pre = document.querySelector('#msg pre');
        //pre.textContent = '\n' + JSON.stringify(markData, '\t', 2);

    } else {
        alert("Name entry must be filled out");

    }
}

/* Check if Name of Form is Empty */
function nameValidation() {
    var x = document.getElementById('Name').value;
    if (x == "") {
        return false;
    } else {
        return true;
    }
}

/* Grading Mark Grade from Fetched Data */
function countGrade(a1, a2, a3, a4, a5, b1, b2) {
    var x, y, z, result;
    //Menghitung 50% Tugas 1 - 5
    x = Number(a1) + Number(a2) + Number(a3) + Number(a4) + Number(a5);
    x /= 5;
    x = (x * 50) / 100;
    console.log(x);

    //Menghitung 25% masing-masin UTS & UAS
    y = (b1 * 25) / 100;
    z = (b2 * 25) / 100;

    result = x + y + z;
    return result;
}

/* Grade Decission */
function grading(grade) {
    if(grade >= 80){
        return "A";
    }
    else if(grade >= 76.00 && grade <= 79.99){
        return "B+";
    }
    else if(grade >= 70.00 && grade <= 75.99){
        return "B";
    }
    else if(grade >= 65.00 && grade <=69.99){
        return "C+";
    }
    else if(grade >= 60.00 && grade <= 64.99){
        return "C";
    }
    else if(grade >= 50.00 && grade <= 59.99){
        return "D";
    } else {
        return "E";
    }

}
function gradeDecission(grade) {
    if(grade >= 60.00){
        return "Lulus";
    }
    else {
        return "Tidak Lulus";
    }
}




/* -------------------------------------------------------------------------------------------------- */
// Get Array for Table Content
window.onload = function() {
    buildTable(markData);
 };

function buildTable(data){
    var showTable = document.getElementById('contentTable');

    showTable.innerHTML = "";

    for (var i = 0; i < data.length; i++) {
        var row =   '<tr id="' + data[i].ID + '" name="' + data[i].Name + '">' +
                        '<td>' + data[i].Name + '</td>' +
                        '<td>' + data[i].Tugas1 + '</td>' + 
                        '<td>' + data[i].Tugas2 + '</td>' + 
                        '<td>' + data[i].Tugas3 + '</td>' + 
                        '<td>' + data[i].Tugas4 + '</td>' + 
                        '<td>' + data[i].Tugas5 + '</td>' + 
                        '<td>' + data[i].UTS + '</td>' + 
                        '<td>' + data[i].UAS + '</td>' + 
                        '<td>' + data[i].Grade + '</td>' + 
                        '<td>' + data[i].Ket + '</td>' +
                        '<td>' +
                            '<div class="editor-button">' +
                                '<button id="Remove-Entry" onclick="rmvOneRow(this)">Delete</button>' +
                            '</div>' +
                        '</td>' +
                    '</tr>';
        showTable.innerHTML += row;
    }
}



// Function for Delete-Entry Button / Delete a certain Column using ID
function rmvOneRow(sender){
    var tr = sender.parentNode.parentNode.parentNode;
    deleteName = tr.getAttribute('name');

    if (confirm("This action will delete\n" + deleteName + "\nAre you sure?") == true) {
        //Get Row Parent ID
        var tr = sender.parentNode.parentNode.parentNode;
        deleteID = tr.getAttribute('id');

        //Remove from Array Object
        removeById(markData, Number(deleteID));

        //Remove Table from HTML
        $("#" + deleteID).remove();
    } else {
        return false;
    }
}
// Function Search BY ID and Remove from Array
const removeById = (arr, id) => {
    const requiredIndex = arr.findIndex(el => {
        return el.ID === id;
    });
    if(requiredIndex === -1){
        return false;
    }
    return !!arr.splice(requiredIndex, 1);
 };



/* -------------------------------------------------------------------------------------------------- */
/* Show Hide Creator Information */
$(document).ready(function(){
    $("#creatorName").click(function(){
        var element = document.getElementById("hideContent");
        if (element.classList.contains('hidden')) {
            element.classList.remove("hidden");
            $("#teks").hide();
            $("#Obedient").hide();
            $("#William").hide();
            $("#Aril").hide();
            $("#Livirji").hide();
            $("#teks").fadeToggle();
            $("#Obedient").fadeToggle();
            $("#William").fadeToggle(500);
            $("#Aril").fadeToggle(1000);
            $("#Livirji").fadeToggle(1500);
            window.scrollTo(0, document.body.scrollHeight);
        } else {
            $("#teks").fadeToggle();
            $("#Obedient").fadeToggle();
            $("#William").fadeToggle(500);
            $("#Aril").fadeToggle(1000);
            $("#Livirji").fadeToggle(1500);
        }
    });
});
