const firebaseConfig = {
    apiKey: "AIzaSyCABEf7VlTHYWiJw9zwqp9rNOUeVP9Pfsw",
    authDomain: "perpusmasda-31161.firebaseapp.com",
    projectId: "perpusmasda-31161",
    storageBucket: "perpusmasda-31161.appspot.com",
    messagingSenderId: "910743863292",
    appId: "1:910743863292:web:982c68c5eafbdf666e3c79",
    measurementId: "G-S8JN8H4C67"
};

import {initializeApp} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import {getDatabase, ref, set, query, onValue} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js";
const app = initializeApp(firebaseConfig);
const db = getDatabase();

// Data Buku
let induk = document.querySelector("#noInduk");
let jenis = document.querySelector("#jenisBuku");
let pengarang = document.querySelector("#pengarang");
let judul = document.querySelector("#judul");
let kelas = document.querySelector("#kelas");
let lemari = document.querySelector("#noLemari");

// Mencari data buku berdasarkan no induk
let searchInput = document.querySelector("#searchInput");
let findButton = document.querySelector("#findButton");

// Tambah
let addButton = document.querySelector("#addButton");
let addform = document.querySelector("#addform");
let modal = document.querySelector("#myModal");

// Apabila tombol OK ditekan
let add = document.querySelector("#addConfirmed");
add.addEventListener('click', function(e){
    if(induk.value == "" || jenis.value == "" || pengarang.value == "" || judul.value == "" || kelas.value == "" || lemari.value == ""){
        Swal.fire({
            title: 'Data masih belum terisi semua',
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Oke'
        }).then((result) => {
            if (result.isConfirmed){
                Swal.close();   
            }
        })
        e.preventDefault();
    }else{
        set(ref(db, "Katalog/all/" + induk.value), {
            jenisBuku: jenis.value,
            pengarang: pengarang.value,
            judul: judul.value,
            kelas: kelas.value,
            noInduk: induk.value,
            lemari: lemari.value
        })
        .then(() => {
            Swal.fire({
                title: 'Data berhasil Ditambahkan',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Okay!',
            })
            .then(function(){
                window.location.reload(); 
            })
            addform.reset();
        })
    }
})


let tablearea = document.querySelector("#tablearea");
const getKatalog = new Promise((resolve, reject) => {
    const antri = query(ref(db, "Katalog/all/"))
        onValue(antri, (snapshot) => {
            const users = snapshot.val();
            resolve(users);
        });
    });
    
getKatalog.then(users => {
    for (let user in users) {
        const tr = `
            <tr data-id=${user}>
            <td><p>${users[user].noInduk}</p></td>
            <td><p>${users[user].jenisBuku}</p></td>
            <td><p>${users[user].pengarang}</p></td>
            <td><p>${users[user].judul}</p></td>
            <td><p>${users[user].kelas}</p></td>
            <td><p>${users[user].lemari}</p></td>
            <td>
                <button class="cek">Cek</button>
            </td>
            </tr>
            `;
            tablearea.innerHTML += tr;
        }

    findButton.addEventListener('click', function(e){
        tablearea.innerHTML = "";
        for(let user in users){
            let tempInduk = users[user].noInduk;
            let tempJenis = users[user].jenisBuku;
            let tempPengarang = users[user].pengarang;
            let tempJudul = users[user].judul;
            let tempKelas = users[user].kelas;
            let tempLemari = users[user].lemari;
            let tempSearch = searchInput.value;

            let lastInduk = tempInduk.toLowerCase();
            let lastJenis = tempJenis.toLowerCase();
            let lastPengarang = tempPengarang.toLowerCase();
            let lastJudul = tempJudul.toLowerCase();
            let lastKelas = tempKelas.toLowerCase();
            let lastLemari = tempLemari.toLowerCase();
            let lastSearch = tempSearch.toLowerCase();
            
            let result1 = lastInduk.match(lastSearch);
            let result2 = lastJenis.match(lastSearch);
            let result3 = lastPengarang.match(lastSearch);
            let result4 = lastJudul.match(lastSearch);
            let result5 = lastKelas.match(lastSearch);
            let result6 = lastLemari.match(lastSearch);

            if(result1 != null || result2 != null || result3 != null || result3 != null || result4 != null || result5 != null || result6 != null){
                const tr = `
                    <tr data-id=${user}>
                    <td><p>${users[user].noInduk}</p></td>
                    <td><p>${users[user].jenisBuku}</p></td>
                    <td><p>${users[user].pengarang}</p></td>
                    <td><p>${users[user].judul}</p></td>
                    <td><p>${users[user].kelas}</p></td>
                    <td><p>${users[user].lemari}</p></td>
                    <td>
                        <button class="cek">Cek</button>
                    </td>
                    </tr>
                `;
                tablearea.innerHTML += tr;
            }
            else{
                Swal.fire({
                    title: 'Tidak ada data buku yang dicari',
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Oke'
                }).then((result) => {
                    if (result.isConfirmed){
                        Swal.close();}
                    const tr = `
                        <tr data-id=${user}>
                        <td><p>${users[user].noInduk}</p></td>
                        <td><p>${users[user].jenisBuku}</p></td>
                        <td><p>${users[user].pengarang}</p></td>
                        <td><p>${users[user].judul}</p></td>
                        <td><p>${users[user].kelas}</p></td>
                        <td><p>${users[user].lemari}</p></td>
                        <td>
                            <button class="cek">Cek</button>
                        </td>
                        </tr>
                    `;
                    tablearea.innerHTML += tr;
                })
                e.preventDefault();
            }

        }
    })
});
    

let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
addButton.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}