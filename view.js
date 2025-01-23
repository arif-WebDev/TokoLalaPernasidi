// import { dataTerpakai as  exampleProduct, initializeApp } from "./control.js";
console.log('ini view.js');



// -------MEMBUAT RUPIAH -----------

function toRupiahStep1 (amount) {
    if (typeof amount !== 'number') {
        throw new Error('Input must be a number.');
    }

    const reversed = amount.toString().split('').reverse();
    const grouped = [];
    
    for (let i = 0; i < reversed.length; i++) {
        if (i > 0 && i % 3 === 0) {
            grouped.push('.');
        }
        grouped.push(reversed[i]);
    }

    const formatted = grouped.reverse().join('');

    return formatted;
};

function toRupiah (harga) {
    return 'Rp ' + harga;
};

// console.log(toRupiah(toRupiahStep1(12345)));
// ---------- SELESAI ----------

// hitung isi cart cartBadge
const isiCart = document.getElementById("cartBadge");
function cartBadge (banyaknya) {
    isiCart.textContent = "";
    isiCart.textContent = banyaknya;
};


// -------- MEMBUAT CARD DAN CARD DETAIL

function createProductCard(product) {
    
    // Create the main product card container
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    // Create and append the product image
    const productImage = document.createElement('img');
    productImage.id = `imgID-${product.Id}`;
    productImage.src = `view/sayur/${product.Foto}`;
    productImage.alt = product.Foto;
    productImage.classList.add('product-image');
    productCard.append(productImage);

    // Create and append the product info container
    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');
    productCard.append(productInfo);

    // Add product title
    const productTitle = document.createElement('h3');
    productTitle.classList.add('product-title');
    productTitle.textContent = product.NamaSingkat;
    productInfo.append(productTitle);

    // Add price details
    const productPrice = document.createElement('div');
    productPrice.classList.add('product-price');

    const discountedPrice = document.createElement('span');
    discountedPrice.classList.add('discounted-price');
    discountedPrice.textContent = toRupiah(toRupiahStep1(product.HargaTerendah));

    const originalPrice = document.createElement('span');
    originalPrice.classList.add('original-price');
    originalPrice.textContent = toRupiah(toRupiahStep1(product.HargaAsli));

    if(product.IsDiscount) {
        productPrice.append(discountedPrice, originalPrice);
    } else {
        productPrice.append(discountedPrice);
    };
    productInfo.append(productPrice);

    // Add product meta (rating and stock)
    const productMeta = document.createElement('div');
    productMeta.classList.add('product-meta');

    const rating = document.createElement('span');
    rating.textContent = `${product.Ratting} ★`;

    const stock = document.createElement('span');
    stock.textContent = `Stok : ${product.Stock}`;

    productMeta.append(rating, stock);
    productInfo.append(productMeta);

    // Add option buttons
    const options = document.createElement('div');
    options.classList.add('option');

    const addToCartButton = document.createElement('button');
    addToCartButton.classList.add('kranjang');
    addToCartButton.id = product.Id;
    addToCartButton.textContent = 'Tambah ke Kranjang';

    const detailsButton = document.createElement('button');
    detailsButton.setAttribute('popovertarget', `target-${product.Id}`);
    detailsButton.textContent = 'Details';

    options.append(addToCartButton, detailsButton);
    productInfo.append(options);

    // Add details popover
    const popover = document.createElement('div');
    popover.classList.add('popover-card');
    popover.id = `target-${product.Id}`;
    popover.setAttribute('popover', '');

    const container = document.createElement('div');
    container.classList.add('container');

    const headerDetails = document.createElement('div');
    headerDetails.classList.add('header-details');

    const headerTitle = document.createElement('h2');
    headerTitle.textContent = 'Deskripsi Produk';

    const closeButton = document.createElement('button');
    closeButton.setAttribute('popovertargetaction','hide');
    closeButton.setAttribute('popovertarget', `target-${product.Id}`);
    closeButton.textContent = 'X';

    headerDetails.append(headerTitle, closeButton);
    container.append(headerDetails);

    const cardDetail = document.createElement('div');
    cardDetail.classList.add('card-detail');

    const productImageDetail = document.createElement('img');
    productImageDetail.src = `view/sayur/${product.Foto}`;
    productImageDetail.alt = product.Foto;

    const productDetails = document.createElement('div');
    productDetails.classList.add('product-details');

    const fullProductTitle = document.createElement('h1');
    fullProductTitle.classList.add('product-title');
    fullProductTitle.textContent = product.NamaBarang;

    const brandContainer = document.createElement('div');
    brandContainer.classList.add('brand');
    brandContainer.textContent = `Brand : ${product.Jenis}`;
    
    const hargaAwal = document.createElement('span');
    hargaAwal.classList.add ('original-price');
    hargaAwal.textContent = toRupiah(toRupiahStep1(product.HargaAsli));

    const hargaPotongan = document.createElement('div');
    hargaPotongan.classList.add ('price');
    hargaPotongan.textContent = toRupiah(toRupiahStep1(product.HargaTerendah));

    const description = document.createElement('div');
    description.classList.add('description');
    description.innerHTML = `<h2>Deskripsi</h2><div>${product.Deskripsi}</div>`;

    const cartButtonContainer = document.createElement('div');
    cartButtonContainer.classList.add('cart-button');

    const buyLink = document.createElement('a');
    buyLink.href = product.linkBeli;
    buyLink.target = "blank";

    const buyButton = document.createElement('button');
    buyButton.textContent = 'BELI';
    buyLink.append(buyButton);


    cartButtonContainer.append(buyLink);
    
    if(product.IsDiscount) {
        productDetails.append(fullProductTitle, brandContainer,hargaAwal, hargaPotongan, description, cartButtonContainer);
    } else {
        productDetails.append(fullProductTitle, brandContainer, hargaPotongan, description, cartButtonContainer);
    };

    cardDetail.append(productImageDetail, productDetails);
    container.append(cardDetail);
    popover.append(container);
    options.append(popover);

    const containerCard = document.getElementById('productsGrid');
    containerCard.append(productCard);
    return containerCard;
}

// // Example usage
// const exampleProduct = [
//     {
//     Foto: 'photo.jpg',
//     NamaSingkat: 'Produk A',
//     HargaDiscount: 'Rp 90.000',
//     HargaAsli: 'Rp 120.000',
//     Ratting: 4.5,
//     Stock: 12,
//     Id: 'prod1',
//     NamaBarang: 'Produk A Lengkap',
//     Jenis: 'Elektronik',
//     Deskripsi: 'Produk A adalah barang elektronik terbaik.',
//     numbWA : '089531427766'
//     },
//     {
//     Foto: 'photo.jpg',
//     NamaSingkat: 'Produk B',
//     HargaDiscount: 'Rp 90.000',
//     HargaAsli: 'Rp 120.000',
//     Ratting: 4.5,
//     Stock: 12,
//     Id: 'prod2',
//     NamaBarang: 'Produk B Lengkap',
//     Jenis: 'Elektronik',
//     Deskripsi: 'Produk A adalah barang elektronik terbaik.',
//     numbWA : '089531427766'
//     }
// ];

// const exampleProduct = 
//     {
//     Foto: 'photo.jpg',
//     NamaSingkat: 'Produk A',
//     HargaDiscount: 'Rp 90.000',
//     HargaAsli: 'Rp 120.000',
//     Ratting: 4.5,
//     Stock: 12,
//     Id: 'prod1',
//     NamaBarang: 'Produk A Lengkap',
//     Jenis: 'Elektronik',
//     Deskripsi: 'Produk A adalah barang elektronik terbaik.',
//     numbWA : '089531427766'
//     }



function createProductCards (arrays) {
    const containerCard = document.getElementById('productsGrid');
    containerCard.innerHTML = "";
    arrays.forEach((array) => {
        createProductCard(array);
    });
    generateAnimasiCart ();
};

// createProductCards(exampleProduct);

// export {viewGenerateCard};

// -------------- SELESAI

function generateCartList () {
    
};

// ------------ MEMBUAT LIST CART
function generateCartItem(item) {
    // Create the main list item
    const listItem = document.createElement('li');
    
    // Create the remove button
    const removeButton = document.createElement('button');
    removeButton.id = item.id; // Set the button ID
    removeButton.classList.add('remove-barang');
    removeButton.textContent = 'X'; // Set the button text
    listItem.appendChild(removeButton); // Add the button to the list item
    
    // Add the div.cart-nama 
    const cartNama = document.createElement('div');
    cartNama.classList.add('cart-nama');

    // Add the item name and quantity
    const itemDetails = document.createTextNode(`${item.namaBarang} (${item.qty}):`);
    cartNama.appendChild(itemDetails);

    // Add a line break
    cartNama.appendChild(document.createElement('br'));
    
    // Create the price display div
    const priceDiv = document.createElement('div');
    priceDiv.classList.add('display-harga');
    
    // Add "Rp" span
    const rpSpan = document.createElement('span');
    rpSpan.textContent = 'Rp ';
    priceDiv.appendChild(rpSpan);
    
    // Add the amount span
    const amountSpan = document.createElement('span');
    amountSpan.textContent = toRupiahStep1(item.hargaBarang*item.qty);
    priceDiv.appendChild(amountSpan);
    
    // Add the price div to the list item
    cartNama.appendChild(priceDiv);

    listItem.appendChild(cartNama);
    
    return listItem;
}

// Example usage
const cartItems = [
    { Id: 'item1', name: 'Produk A', quantity: 9, amount: 200000000 },
    { Id: 'item2', name: 'Produk B', quantity: 5, amount: 150000 }
];

// Get the <ol> element where items will be appended

// Generate and append items to the cart
function generateCartItems (item) {
    const cartContainer = document.querySelector('#cart-belanja ol');
    cartContainer.textContent= "";
    item.forEach(item => {
        const cartItem = generateCartItem(item);
        cartContainer.appendChild(cartItem);
    });
}



// GENERATE TOTAL DI LIST
// JIKA YANG MASUK ARRAY
// function generateCartTotal(totalAmount) {
//     let totalBayarUang = toRupiahStep1(totalAmount.reduce((total, amount) => total + amount, 0));
//     const container = document.createElement('div');
//     container.textContent = totalBayarUang;
    
//     const totalBayar = document.querySelector("#totalBayar");
//     totalBayar.appendChild(container);
// }

// Example usage
// const cartTotalAmount = [50000,20000,50000]; // Example total amount

// JIKA YANG MASUK ANGKA
// const cartTotalAmount = 500000; // Example total amount

function handleActiveMenu(event) {
    // Get all menu items
    const ascDesc = document.querySelectorAll(".ascdesc");
    const typeBarang = document.querySelectorAll(".type");
    // Get the current page URL
    const currentButton = event.target.innerText;
    // console.log('current page', currentButton);

    // Loop through menu items to find the one that matches the current page
    if (event.target.classList.contains('ascdesc')) {
        ascDesc.forEach((item) => {
            // Compare href with the current URL
            if (item.innerText === currentButton) {
                // Add active class
                item.classList.add("active");
            } else {
                // Remove active class for non-matching items
                item.classList.remove("active");
            }
        });
    } else if (event.target.classList.contains('type')) {
        typeBarang.forEach((item) => {
            // Compare href with the current URL
            if (item.innerText === currentButton) {
                // Add active class
                item.classList.add("active");
                ascDesc.forEach((item) => {
                    item.classList.remove("active");
                })
            } else {
                // Remove active class for non-matching items
                item.classList.remove("active");
            }
        });
    }
}

const controlActive = document.querySelector('.categories');
controlActive.addEventListener('click', handleActiveMenu);


function generateCartTotal(totalAmount) {
    const container = document.createElement('div');
    container.textContent = toRupiahStep1(totalAmount);
    
    const totalBayar = document.querySelector("#totalBayar");
    totalBayar.textContent = "";
    totalBayar.appendChild(container);
}
// Generate and append the TOTAL section
// generateCartTotal(cartTotalAmount);

// ---------------------------------SELESAI---------------------

// FUNGSI GENERATE ANIMASI CART
function generateAnimasiCart () {
    // Add event listener to all "Add to Cart" buttons
    document.querySelectorAll(".kranjang").forEach((button) => {
    button.addEventListener("click", (event) => {
        const productImage = document.querySelector("#cartBadge");

      // Add the "fly-to-cart" class to the product image
        productImage.classList.add("fly-to-cart");

      // Remove the class after animation ends to allow reuse
        productImage.addEventListener("animationend", () => {
        productImage.classList.remove("fly-to-cart");
        });
    });
});
};



function createSlider(containerId, options) {
    const { width, height, images, reverse } = options;

    const quantityslider = images.length;

    // Get the container element
    const container = document.getElementById(containerId);
    if (!container) return;

    // Set container attributes and styles
    container.className = "slider";
    container.setAttribute("reverse", reverse ? "true" : "false");
    container.style.setProperty("--width", width);
    container.style.setProperty("--height", height);
    container.style.setProperty("--quantity", quantityslider);

    // Create the list wrapper
    const listDiv = document.createElement("div");
    listDiv.className = "list";

    // Generate each item
    images.forEach((image, index) => {
        const position = index + 1;

        // Create the item div
        const itemDiv = document.createElement("div");
        itemDiv.className = "item";
        itemDiv.style.setProperty("--position", position);

        // Create the link and image
        const link = document.createElement("a");
        link.href = `#imgID-${image.id}`;
        const img = document.createElement("img");
        img.src = image.src;
        img.alt = image.alt || "";

        link.appendChild(img);

        // Create the badge
        const badge = document.createElement("span");
        badge.className = "slider-badge";
        // badge.textContent = image.badge || "";
        badge.textContent = index || "Viral";

        // Append elements to the item div
        itemDiv.appendChild(link);
        itemDiv.appendChild(badge);

        // Append the item to the list
        listDiv.appendChild(itemDiv);
    });

    // Append the list to the container
    container.appendChild(listDiv);
}

  // Example usage
// createSlider("sliderImage", {
//     width: "200px",
//     height: "200px",
//     reverse: true,
//     images: [
//     { id: 100, src: "images/slider2_1.png", badge: "-20%" },
//     { id: 141, src: "images/slider2_2.png", badge: "-40%" },
//     { id: 90, src: "images/slider2_3.png", badge: "-30%" },
//     { id: 80, src: "images/slider2_4.png", badge: "-50%" },
//     { id: 70, src: "images/slider2_5.png", badge: "-40%" },
//     { id: 50, src: "images/slider2_6.png", badge: "-20%" },
//     { id: 40, src: "images/slider2_7.png", badge: "-50%" },
//     { id: 30, src: "images/slider2_8.png", badge: "-40%" },
//     { id: 30, src: "images/slider2_8.png", badge: "-40%" },
//     { id: 30, src: "images/slider2_8.png", badge: "-40%" },
//     { id: 30, src: "images/slider2_8.png", badge: "-40%" },
//     { id: 30, src: "images/slider2_8.png", badge: "-40%" },
//     { id: 30, src: "images/slider2_8.png", badge: "-40%" },
//     { id: 30, src: "images/slider2_8.png", badge: "-40%" },
//     { id: 120, src: "images/slider2_9.png", badge: "-20%" },
//     { id: 120, src: "images/slider2_9.png", badge: "-20%" },
//     { id: 120, src: "images/slider2_9.png", badge: "-20%" },
//     { id: 120, src: "images/slider2_9.png", badge: "-20%" }
//     ],
// });



export {createSlider, toRupiahStep1, createProductCards, generateCartTotal,generateCartItems, cartBadge};