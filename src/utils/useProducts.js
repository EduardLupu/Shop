/*
import {useState, useEffect, useRef} from 'react';
import {useGetProductsQuery} from "../app/apiSlice";

export function useProducts(limit) {
    const [products, setProducts] = useState([]);
    const [offset, setOffset] = useState(0);
    const isInitialMount = useRef(true);

    const { data: productsData, error: productsError, refetch } = useGetProductsQuery(limit, offset);

    useEffect(() => {
        if (isInitialMount.current) {
            const fetchProducts = async () => {
                try {

                    const data = await productsData();
                    setProducts((prevProducts) => [...prevProducts, ...data]);
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            };
            fetchProducts();
            isInitialMount.current = false;
        }

        const handleScroll = (e) => {
            const scrollHeight = e.target.documentElement.scrollHeight;
            const currentHeight =
                e.target.documentElement.scrollTop + window.innerHeight;
            if (currentHeight + 1 >= scrollHeight) {
                setOffset((prevOffset) => prevOffset + limit);
                isInitialMount.current = true;
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }

    }, [offset]);
    return products;
}

*/
