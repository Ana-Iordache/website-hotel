//salvare date din forlumar de check-in in fisier txt
function saveFile() {
    //preluare date completate in formular
    const firstName = document.getElementById("first-name")
    const lastName = document.getElementById("last-name");
    const phoneNumber = document.getElementById("phone-number");
    const email = document.getElementById("email");
    const roomType = document.getElementById("room-type");
    const checkIn = document.getElementById("check-in-date");
    const checkOut = document.getElementById("check-out-date");
    const otherDetalis = document.getElementById("other-detalis");

    // preluare val din radio button bifat
    const radioButtons = document.querySelectorAll("input[name='payment-method']");
    let paymentMethod;
    for (const rb of radioButtons) {
        if (rb.checked) {
            paymentMethod = rb.value;
            break;
        }
    }

    //pun toate datele intr-o variabila, fiecare pe un rand nou
    let data =
        "First Name: " + firstName.value + "\r\n" +
        "Last Name: " + lastName.value + "\r\n" +
        "Phone number: " + phoneNumber.value + "\r\n" +
        "Email: " + email.value + "\r\n" +
        "Room type: " + roomType.value + "\r\n" +
        "Check-in date: " + checkIn.value + "\r\n" +
        "Check-out date: " + checkOut.value + "\r\n" +
        "Payment method: " + paymentMethod + "\r\n" +
        "Other details: " + otherDetalis.value;

    //convertirea textului la BLOB
    const toBlob = new Blob([data], { type: "text/plain" });
    const fileName = "booking.txt"; //fisierul pe care vr sa-l salvez

    //creez un elem de tip link, dar nu vizibil in pagina, prin care sa pot descarca fisierul
    let newLink = document.createElement("a");
    newLink.download = fileName;

    if (window.webkitURL != null) {
        newLink.href = window.webkitURL.createObjectURL(toBlob);
    } else {
        newLink.href = window.URL.createObjectURL(toBlob);
        newLink.style.display = "none";
        document.body.appendChild(newLink);
    }

    //apelez ev de click pt elem <a> creat, ca sa se descarce daca toate campurile sunt completate
    if (firstName.value != null && lastName.value != null && phoneNumber.value != null
        && email.value != null && checkIn.value != "" && checkOut.value != "" /*&& paymentMethod != undefined*/)
        newLink.click();
    // if(paymentMethod==undefined){
    //     alert("Choose payment method!");
    //     e.preventDefault();
    // }
}

//functie de incarcare widget vreme
function loadWidget(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://weatherwidget.io/js/widget.min.js';
        fjs.parentNode.insertBefore(js, fjs);
    }
};

//adugare date introduse in formularul de evenimente in tabel
function addEvent() {
    const form = document.getElementById("form-add-events");
    var formSubmitHandler = (e) => {
        e.preventDefault(); //ca sa nu se dea refresh la pagina, ca imi dispare ce adaug in tabel

        //preiau val introduse in formular
        const table = document.getElementById("events-table");
        const eventName = document.getElementById("event-name").value;
        const location = document.getElementById("location").value;
        const startDate = document.getElementById("start-date").value;
        const startTime = document.getElementById("start-time").value;

        //inserare linie noua
        var row = table.insertRow();
        //inserare celule
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        //inserare valori in celule
        cell1.innerHTML = eventName;
        cell2.innerHTML = location;
        cell3.innerHTML = startDate;
        cell4.innerHTML = startTime;

        form.reset(); //sa se goleasca inputurile formului
    }
    form.onsubmit = formSubmitHandler;
}

