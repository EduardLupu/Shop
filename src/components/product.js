import {useEffect, useRef} from "react";
import {nextImageInProductGallery, previousImageInProductGallery} from "../utils/gallery";

export function Product({product}) {

    const productContainerRef = useRef(null);

    useEffect(() => {
        const productContainer = productContainerRef.current;
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


        return () => {
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
            <div className="product-images">
                {product.images.map((image, index) => <img style={{ display: index === 0 ? "block" : "none" }} className="product-image" key={image} src={image} alt={product.title} />)}
            </div>
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