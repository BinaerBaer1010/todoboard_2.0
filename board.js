var request = fetch("https://shopping-lists-api.herokuapp.com/api/v1/lists", {
        headers: {
            "Authorization": "b5ba360e5154f4744c1dfbbec43ade8f"
        }
    })
    .then(res => res.json())
    .then(lists => console.log(lists));

// Neues List-Item beim Klicken auf den "+"-Button oder Enter
function newItem() {
    var li = document.createElement("li");
    var inputWert = document.getElementById("input_ToDo").value;
    var t = document.createTextNode(inputWert);

    if (inputWert !== '') {
        document.getElementById("meineListe").appendChild(li);

    } else {
        alert("Ungültige Eingabe! Bitte ToDo eingeben!");
    }
    //Nach der Eingabe wird das Input Feld wieder zurückgesetzt (eingebenes Wort bleibt nicht stehen)
    document.getElementById("input_ToDo").value = "";

    //Nach jedem neu erstellten List-Item wird automatisch ein Div dahinter erstellt (hier: Close-, Add-, Edit-Icon)

    var newDiv = document.createElement("div"); // Close-Icon
    var bttnBereich = document.createElement("div"); //Bereich für die Buttons/Icons
    bttnBereich.className = "bttnBereich";
    bttnBereich.innerHTML = '<img class="bttnBereichIcons" src="pictures/edit_icon.png">' +
        '<img class="bttnBereichIcons" src="pictures/add_icon.PNG">' +
        '<img class="bttnBereichIcons" src="pictures/edit_icon.png">';


    //u007D7 macht ein x hinter das Listenelement, um dieses zu löschen/ schließen
    var txt = document.createTextNode("\u00D7");
    newDiv.className = "close";
    newDiv.appendChild(txt);
    li.appendChild(newDiv);

    li.appendChild(bttnBereich);



    var Ausgabebereich = document.getElementById('content_area');
    Ausgabebereich.appendChild(div);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var newDiv = this.parentElement;
            newDiv.style.display = "none";
        }
    }


}

// Beim Klicken auf das Close-Icon wird das List-Item versteckt
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

//Fügt neue Liste hinzu
function newList() {
    //div ist die list_areaClass, die den weiße Box zeigt
    var div = document.createElement("div");
    div.className = "list_areaClass";

    //boxlist ist das div innerhalb des oberen div (für die Liste)
    var boxlist = document.createElement("div");
    boxlist.className = "box_list"

    //form ist das Formular innerhalb des div (boxlist)
    var form = document.createElement("form");

    //input ist das Input-Feld innerhalb des Formulars (form)
    var input = document.createElement("input");
    input.placeholder = "Was musst du erledigen?";

    //h fügt die H4 innerhalb der boxlist hinzu
    var h = document.createElement("H4");
    var inputWert = document.getElementById("input_titel").value;
    var t = document.createTextNode(inputWert);

    var divBttn = document.createElement("div");
    divBttn.className = "addButton";
    var textBttn = document.createTextNode("+");

    h.appendChild(t);
    form.appendChild(input);
    divBttn.appendChild(textBttn);
    form.appendChild(divBttn);
    boxlist.appendChild(h);
    boxlist.appendChild(form);
    div.appendChild(boxlist);

    var Ausgabebereich = document.getElementById('content_area');
    Ausgabebereich.appendChild(div);
}

function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle('active');
    document.getElementById("content").classList.toggle('active');
}

function changeImage() {
    var image = document.getElementById('toggle_icon');
    if (image.src.match("left")) {
        image.src = "pictures/right_icon.PNG";
    } else {
        image.src = "pictures/left_icon.PNG";
    }
}