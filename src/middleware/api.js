


export async function getProducts(skipPagination, limitPagination) {
    const API_GET_PRODUCTS_URL = `https://dummyjson.com/products?limit=${limitPagination}&skip=${skipPagination}&select=id,title,brand,category,description,price,stock,rating,discountPercentage,images`
    const response = await fetch(API_GET_PRODUCTS_URL);
    const responseJSON = await response.json();
    return responseJSON.products;
}

/*
export async function getProduct(id) {
    const API_GET_PRODUCT_URL = `https://dummyjson.com/products/${id}?select=id,title,brand,category,description,price,stock,rating,discountPercentage,images`;
    const response = await fetch(API_GET_PRODUCT_URL);
    return await response.json();
}

const API_INTERNAL_CART_ID = '64d60feae5e4d';
const API_INTERNAL_CART_GET = `http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${API_INTERNAL_CART_ID}`;

const token =  localStorage.getItem('user-token');
export async function fetchAddProductToCart(productID, quantity = 1) {
    try {
        const response = await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${API_INTERNAL_CART_ID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Internship-Auth': `${token}`
            },
            body: JSON.stringify({
                userId: 1,
                products: [
                    {
                        id: productID,
                        quantity: quantity
                    }]
            })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }
    catch (error) {
        console.error('Error adding product to cart:', error);
    }
}

export async function fetchRemoveProductFromCart(productID, quantity = -1) {
    try {
        const response = await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${API_INTERNAL_CART_ID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Internship-Auth': `${token}`
            },
            body: JSON.stringify({
                userId: 1,
                products: [
                    {
                        id: productID,
                        quantity: quantity
                    }]
            })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }
    catch (error) {
        console.error('Error removing product from cart:', error);
    }

}

export async function fetchDeleteProductFromCart(productID) {
    try {
        const response = await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${API_INTERNAL_CART_ID}?products[]=${productID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Internship-Auth': `${token}`
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }
    catch (error) {
        console.error('Error deleting product from cart:', error);
    }
}

export async function initCartProducts() {
    let cartProducts;
    if (localStorage.getItem('cart') === null) {
        const response = await fetch(API_INTERNAL_CART_GET, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Internship-Auth': `${token}`,
            }
        });
        if (response.status !== 200) {
            return null;
        }
        cartProducts = await response.json();
        localStorage.setItem('cart', JSON.stringify(cartProducts));
    } else {
        cartProducts = JSON.parse(localStorage.getItem('cart'));
    }
    return cartProducts;
}


export async function login(email, password) {
    const response = await fetch('http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    return await response.json();
}

*/
