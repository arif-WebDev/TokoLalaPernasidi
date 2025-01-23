import {createSlider as VWSliderHeader, toRupiahStep1 as VWRupiahTitik, createProductCards, generateCartTotal as VWGenRP, generateCartItems as VWCartItems, cartBadge as VWCartBadge} from "./view.js";

let dataFetch = [];
let dataTerpakai = [];
const numbWA = "+6289516827810";
const beliButton = document.getElementById('beliButton');


// isi fungsi
// 1. JIKA MENGGUNAKAN FATCH
// 2. JIKA MENGGUNAKAN IMPORT
// 3. FUNGSI NAMBAH DATA
// 4. FUNGSI FILTER DATA JENIS
// 5. FUNGSI SEARCH DATA
// 6. FUNGSI CEK LOCAL STORAGE
// 7. FUNGSI SAVE LOCAL STORAGE
// 8. FUNGSI DELET LOCAL STORAGE


// 0. FUNGSI AWAL BUKA APP

// FUNGSI FETCH DATA
async function fetchData(url) {
    try {
        const response = await fetch(url); // Fetch the data
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        dataFetch = await response.json(); // Parse and store the JSON data
        console.log('Data fetched successfully:', dataFetch);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the function with the path to your JSON file
// 3a. FUNGSI RENAME KEY
function renameKeyIdToIdCard(data) {
    dataTerpakai = data.map(item => {
        const { Id, ...rest } = item; // Extract `Id` and the remaining keys
        return { IdCard: Id, ...rest }; // Return a new object with renamed key
    });
    console.log('dataTerpakai :',dataTerpakai);
    return dataTerpakai;
}

// renameKeyIdToIdCard(dataFetch);

// 3. FUNGSI NAMBAH DATA
function tambahData(data) {
    dataTerpakai = data.map(item => {
        return { ...item, 'keyTambah3' : 'valueTambah' }; // Add the new key-value pair
    });
    console.log('Setelah tambah Pcs :',dataTerpakai);
    return dataTerpakai;
}



// 4. FUNGSI FILTER DATA JENIS
let filteredData = [];
let dataSort = [];
function filterData (jenis) {
    const jenisLowerCase = jenis.toLowerCase();
    console.log('Processing data:', dataBuatCard);
    dataSort = dataBuatCard.filter(item => item.Jenis.toLowerCase().includes(jenisLowerCase)
    );
    console.log('Filtered data jenis :', dataSort);
    return dataSort;
};


// 5. FUNGSI SEARCH DATA
let debounceTimeout;
function searchProductsDebounced(event) {
    const searchValue = event.target.value.toLowerCase(); // Get the search input value

    // Clear the previous timeout
    clearTimeout(debounceTimeout);

    // Set a new timeout
    debounceTimeout = setTimeout(() => {
        dataSort = dataBuatCard.filter((product) =>
            product.NamaBarang.toLowerCase().includes(searchValue)
        );
        // createProductCards(filteredProducts);
        createProductCards(dataSort);
        console.log(dataSort);
    }, 700); // Delay of 300ms
}


const sortKategori = document.querySelector('.categories');
console.log(sortKategori);
sortKategori.addEventListener("click",sortItem);

const tombolSearch = document.getElementById('searchProduct');
console.log(tombolSearch);
tombolSearch.addEventListener("input", searchProductsDebounced);


function sortItem (event) {
    console.log(dataSort.length);
    if(event.target.innerText === 'Termurah') {
        if (dataSort.length == 0) {
            sortDataByPriceAscending(dataBuatCard);
            console.log('dataSort Kosong');
        }  else {
            sortDataByPriceAscending(dataSort);
            console.log('dataSort isi');
        };
        createProductCards(dataSort);
    } else if(event.target.innerText === 'Termahal') { 
        if (dataSort.length == 0) {
            sortDataByPriceDescending(dataBuatCard);
            console.log('dataSort Kosong');
        }  else {
            sortDataByPriceDescending(dataSort);
            console.log('dataSort isi');
        };
        createProductCards(dataSort);
    } else if(event.target.innerText === 'Sayur') { 
        filterData('BUMBU');
        createProductCards(dataSort);
        console.log('dataSort Kosong');
    } else if (event.target.innerText === 'All') {
        dataSort = dataBuatCard;
        createProductCards(dataSort);
    }
    
};


function sortDataByPriceAscending(data) {
dataSort = data.slice().sort((a, b) => a.HargaTerendah - b.HargaTerendah);
console.log("data Sort ascending :", dataSort);
return dataSort;
}

function sortDataByPriceDescending(data) {
dataSort = data.slice().sort((a, b) => b.HargaTerendah - a.HargaTerendah);
console.log("data Sort descending :", dataSort);
return dataSort;
}

// 6. FUNGSI CEK LOCAL STORAGE
// Function to check savedIDs in localStorage
function checkSavedIDs() {
    // Retrieve savedIDs from localStorage and parse it
    const savedIDs = JSON.parse(localStorage.getItem("savedIDs"));
    
    // Case 1: If savedIDs exists and is not an empty array
    if (savedIDs && savedIDs.length > 0) {
        console.log("✅ savedIDs found in localStorage:", savedIDs);
        // Handle valid savedIDs data
        handleSavedIDs(savedIDs);
    } 
    // Case 2: If savedIDs does not exist in localStorage
    else if (!savedIDs) {
        console.log("⚠️ No savedIDs found in localStorage.");
        handleNoSavedIDs();
    } 
    // Case 3: If savedIDs exists but is an empty array
    else if (Array.isArray(savedIDs) && savedIDs.length === 0) {
        console.log("🔍 savedIDs exists but is an empty array.");
        handleEmptySavedIDs();
    }
}

// Function to handle case when valid savedIDs exist
function handleSavedIDs(ids) {
    console.log("🎯 Using the saved IDs:", ids);
    // Perform an action with saved IDs, e.g., fetch or display data
    // Example: fetch and log the IDs
    ids.forEach(id => console.log(`Processing ID: ${id}`));
}

// Function to handle case when savedIDs doesn't exist
function handleNoSavedIDs() {
    console.log("📢 You can start fresh! No saved IDs were found.");
    // Example action: initialize default behavior
    localStorage.setItem("savedIDs", JSON.stringify([]));
    console.log("Initialized savedIDs in localStorage as an empty array.");
}

// Function to handle case when savedIDs is empty
function handleEmptySavedIDs() {
    console.log("🔄 No IDs to process. The array is empty.");
    // Example action: ask user to add data or do nothing
    console.log("You might want to add some data to savedIDs.");
}

// 7. FUNGSI SAVE LOCAL STORAGE
function nambahSavedIDs () {
    const tambahSaved = [1,2,4,5,100];
    localStorage.setItem('savedIDs', JSON.stringify(tambahSaved));
}

// 8. FUNGSI DELET LOCAL STORAGE
function removeSavedIDs (key) {
    if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
        console.log(`Data with key "${key}" has been deleted.`);
    } else {
        console.log(`No data found with key "${key}" to delete.`);
    }
}
// removeSavedIDs ('savedIDs');

// 9. FUNGSI BACA LOCAL STORAGE



// 10. FUNGSI UPDATE LOCAL STORAGE
const  ContohKeranjang = [
    {id: 1, namaBarang: 'Smartphone A', hargaBarang: 2700000, qty: 26},
    {id: 2, namaBarang: 'Laptop B', hargaBarang: 6750000, qty: 36},
    {id: 4, namaBarang: 'Headphone C', hargaBarang: 450000, qty: 16}
];
console.log('contoh Isi Keranjang', ContohKeranjang);


let dataLocalStorage = [];
function olahDataKeranjang (data) {
    dataLocalStorage= [];
    if (data.length > 0) {
        data.forEach((data)=> {
            // data dijadikan array [[id, qty], [id,qty]]
            let itemLocal = [data.id, data.qty];
            dataLocalStorage.push(itemLocal)
        });
    };
};
// olahDataKeranjang(ContohKeranjang);
console.log('data di local storage',dataLocalStorage);


function readDataLocal (dataLocal) {
    const loopingDataLocalStorage = dataLocal.length;
    const dataKeranjangDariLocal = [];

    let masukKranjangContoh = {};
    for (let i = 0; i < loopingDataLocalStorage; i++) {
        let dataIDLocal = dataLocal[i][0];
        let dataQTYLocal = dataLocal[i][1];

        dataBuatCard.forEach((data) =>{
            if (data.Id === dataIDLocal) {
                masukKranjangContoh = {
                    id : data.Id,
                    namaBarang : data.NamaBarang,
                    hargaBarang : data.HargaTerendah,
                    qty : dataQTYLocal
                };
                dataKeranjangDariLocal.push(masukKranjangContoh);
            };
        });
    };
    console.log('data di local storage',dataLocalStorage);
    console.log ('masuk Keranjang Contoh :', dataKeranjangDariLocal);
};


// 11. FUNGSI BUAT CART LINK, TOTAL, DISPLAY
let totalBayar;
let keranjang =[];
let linkWACart = '';

// Fungsi Link Cart WA
function linkWACartBeli () {
    olahDataKeranjang(keranjang);
    
    linkWACart = `https://wa.me/${numbWA}?text=Saya%20ingin%20membeli%20:%0A`;
    // looping link WA di Cart
    keranjang.forEach((data) => {
        linkWACart += data.namaBarang;
        linkWACart += `%20sebanyak%20${data.qty}`;
        linkWACart += "%0A";
    });

    // linkWACart += JSON.stringify(dataLocalStorage);
    
    
    linkWACart += `dengan TOTAL Rp ${VWRupiahTitik(totalBayar)}`;
    const urlWA = linkWACart.split(` `);
        linkWACart = "";
        urlWA.forEach(data => {
            linkWACart += data+"%20";
        });
    console.log('Link WA :',linkWACart);

    beliButton.href = linkWACart;
    console.log(beliButton);
}

// Fungsi generate card Badge
let JumlahCardBadge = 0;
function generateCardBadge () {
    let JumlahCardBadge = 0;
    keranjang.forEach((data)=>{
        JumlahCardBadge += data.qty;
    });
    VWCartBadge(JumlahCardBadge);
}


// Fungsi generate total Item Cart 
function generateTotalCartItem () {
    totalBayar = 0;
    keranjang.forEach((data) => {
        totalBayar += data.hargaBarang*data.qty;
    });
}


// Fungsi generate sub

function masukKranjang (event) {
    if(event.target.classList.contains('kranjang')) {
        const barangID = parseInt(event.target.closest("[id]").id);

        let masukKranjang={};
        dataBuatCard.forEach((data) =>{
            if(data.Id === barangID) {
                masukKranjang = {
                    id : data.Id,
                    namaBarang : data.NamaBarang,
                    hargaBarang : data.HargaTerendah,
                    qty : 1
                }
            }
        });
        console.log('Masuk Kranjang :',masukKranjang);
        
        let sudahAda = 0;
        keranjang.forEach((data) => {
            if(data.id === masukKranjang.id) {
                sudahAda = data.id;
            }
        });


        if (sudahAda) {
            keranjang.forEach ((data) => {
                if(data.id === masukKranjang.id) {
                    data.qty ++;
                }
            });
        } else {
            keranjang.push(masukKranjang);
        }
        
        // console.log('Total bayar :',totalBayar);
        console.log("Data Keranjang", keranjang);
        refreshWebPage ();
        return totalBayar;
    }
    // console.log("isi keranjang :",keranjang);
    console.log('Total bayar :',totalBayar);
};
const sectionCard = document.getElementById('productsGrid');
sectionCard.addEventListener("click", masukKranjang);


// BELUM FIXT
function removeItemCart (event) {
    if (event.target.classList.contains('remove-barang')) {
        const IDRemove = parseInt(event.target.closest("[id]").id);
        keranjang.forEach((data)=>{
            if (data.id === IDRemove) {
                if (data.qty === 1) {
                    keranjang.splice(keranjang.indexOf(data),1);
                } else {
                    data.qty -= 1;
                };
            }
        });
        refreshWebPage ();
        console.log('Setelah Di Remove :',keranjang);
    };
};


const CartIcon = document.querySelector('.cart-icon');
CartIcon.addEventListener("click",removeItemCart);


// 12. FUNGSI UPDATE DATA TERPAKAI
// dengan harga asli dan discount, linkWa
let dataFetchHargaTerendah = [];
function hargaTerendah(data) {
    dataFetchHargaTerendah = data.map(item => {
        let hargaTerendah = 0;
        if(item.IsDiscount) {
            hargaTerendah = item.HargaDiscount;
        } else {
            hargaTerendah = item.HargaAsli;
        }
        return { ...item, 'HargaTerendah' : hargaTerendah }; // Add the new key-value pair
    });
    console.log('Setelah Harga Terendah :',dataFetchHargaTerendah);
    return dataFetchHargaTerendah;
};

let dataBuatCard = [];
// 13. FUNGSI LINK BELI LANGSUNG 
function linkBeliWA (data) {
    dataBuatCard = data.map(item => {

        const linkBeliNamaSplit = item.NamaBarang.split(' ');
        let linkBeliNama = '';
        linkBeliNamaSplit.forEach(data => {
            linkBeliNama += data+'20%';
        })

        return { ...item, 'linkBeli' : `https://wa.me/${numbWA}?text=Hai%20admin%2C%0ASaya%20ingin%20membeli%20${linkBeliNama}dengan%20harga%20Rp%20${item.HargaTerendah}.%0AApakah%20barangnya%20masih%20ada%3F`}; // Add the new key-value pair
    });
    console.log('Setelah tambah link beli :',dataBuatCard);
    return dataBuatCard;
    
};
// Run this function when the web page loads
window.addEventListener("load", checkSavedIDs);

// 0. FUNGSI AWAL BUKA APP
function refreshWebPage () {
    VWCartItems(keranjang);
    generateCardBadge();
    generateTotalCartItem();
    VWGenRP(totalBayar);
    linkWACartBeli ();
}


// FUNGSI FETCH SLIDER
let promoViral = [];
async function fetchPromoViral(url) {
    try {
        const response = await fetch(url); // Fetch the data
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        promoViral = await response.json(); // Parse and store the JSON data
        console.log('Promo dan Viral:', promoViral);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


async function initializeApp () {
    await fetchData('data.json');
    hargaTerendah(dataFetch);
    linkBeliWA(dataFetchHargaTerendah);
    createProductCards(dataBuatCard);
    readDataLocal(dataLocalStorage);
    await fetchPromoViral("promo.json");
    VWSliderHeader("sliderImage", {
            width: "30vw",
            height: "30vw",
            reverse: true,
            images: promoViral
        });
}

initializeApp();
