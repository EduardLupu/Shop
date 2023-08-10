import {useEffect, useRef} from "react";
import {nextImageInProductGallery, previousImageInProductGallery} from "../utils/photoGallery";
import {Link} from "react-router-dom";
import {fetchAddProductToCart} from "../middleware/api";
import {useDispatch, useSelector} from "react-redux";
import {setTotal, setTotalQuantity} from "../app/cartSlice";

export function Product({product}) {
    const productContainerRef = useRef(null);
    // eslint-disable-next-line no-unused-vars
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);
    const {total, totalQuantity} = useSelector(state => state.cart);
    const dispatch = useDispatch();


    useEffect(() => {
        const productContainer = productContainerRef.current;
        const button = productContainer.querySelector(".product-button");

        const handleButtonClick = () => {
            if (isLoggedIn) {
                fetchAddProductToCart(product.id)
                    .then(() => {
                        const popUpContainer = document.querySelector(".pop-up");
                        popUpContainer.style.display = 'flex';
                        button.style.pointerEvents = 'none';
                        const newTotal = total + product.price;
                        const newTotalQuantity = totalQuantity + 1;
                        dispatch(setTotal(newTotal));
                        dispatch(setTotalQuantity(newTotalQuantity));
                        localStorage.removeItem('cart')
                        button.innerText = 'Added to cart';
                        setTimeout(() => {
                            popUpContainer.style.display = 'none';
                            button.innerText = 'Add to cart';
                            button.style.pointerEvents = 'all';
                        }, 2000);
                    });
            }
            else {
                alert("You must be logged in to add products to cart!")
            }
        }
        const handleKeyDown = (event) => {
            if (productContainer.classList.contains("hovered")) {
                const currentImage = productContainer.querySelector('.product-image[style*="display: block"]');
                if (event.key === 'ArrowRight') {
                    nextImageInProductGallery(currentImage);
                }
                if (event.key === 'ArrowLeft') {
                    previousImageInProductGallery(currentImage);
                }
            }
        }
        const handleHover = (event) => {
            productContainer.classList.toggle("hovered");
            if (event.type === "mouseover") {
                document.addEventListener("keydown", handleKeyDown);
            }
            if (event.type === "mouseout") {
                document.removeEventListener("keydown", handleKeyDown);
            }
        }

        const handleArrowClick = (event) => {
            const currentImage = productContainer.querySelector(".product-image[style*='display: block']");
            if (event.target.classList.contains('arrow-right')) {
                nextImageInProductGallery(currentImage);
            }
            if (event.target.classList.contains('arrow-left')) {
                previousImageInProductGallery(currentImage);
            }
        }

        productContainer.addEventListener("mouseover", handleHover);
        productContainer.addEventListener("mouseout", handleHover);
        const arrowRight = productContainer.querySelector(".arrow-right");
        const arrowLeft = productContainer.querySelector(".arrow-left");
        arrowRight.addEventListener("click", handleArrowClick);
        arrowLeft.addEventListener("click", handleArrowClick);
        button.addEventListener("click", handleButtonClick);

        return () => {
            button.removeEventListener("click", handleButtonClick);
            productContainer.removeEventListener("mouseover", handleHover);
            productContainer.removeEventListener("mouseout", handleHover);
            arrowRight.removeEventListener("click", handleArrowClick);
            arrowLeft.removeEventListener("click", handleArrowClick);
        }
    }, []);

    const starRating = {
        "--rating": product.rating,
    };

    return (
        <div className="products-item" ref={productContainerRef}>
            <Link to={`/shop/${product.id}`}>
            <div className="product-images">
                {product.images.map((image, index) => <img style={{ display: index === 0 ? "block" : "none" }} className="product-image" key={image} src={image} alt={product.title} />)}
            </div>
            </Link>
            <div className="arrow-left"></div>
            <div className="arrow-right"></div>
            <h2 className="product-title">{product.title}</h2>
            <h3 className="product-brand">{product.brand}</h3>
            <h5 className="product-category">Category: {product.category}</h5>
            <p className="product-description">
                {product.description}
            </p>
            <h3 className="product-rating">
                <span className="star-rating" style={starRating}>
                </span>
                {product.rating}
            </h3>
            <h3 className="product-stock">
                Available: {product.stock}
            </h3>
            <p className="product-discount-percentage">
                ${Math.floor(product.price + product.price * product.discountPercentage / 100)}
            </p>
            <h3 className="product-price">
                ${product.price}
            </h3>
            <button className="product-button" data-id={product.id}>Add to cart</button>
        </div>
    )
}