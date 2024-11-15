import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Container, Card, Image } from 'react-bootstrap';

function ProductDetails() {
    const { id: _id } = useParams(); // Get the product ID from the URL params
    const location = useLocation();
    const [product, setProduct] = useState(location.state?.product || null);  // Access the passed product data
    const [loading, setLoading] = useState(!product); // If product data isn't passed, set loading to true
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!product) { // If product data isn't passed in state, fetch from API
            setLoading(true);
            setError(null);

            axios.get(`http://localhost:8000/getproduct/${_id}`)
                .then((response) => {
                    setProduct(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError('Failed to fetch product details');
                    setLoading(false);
                });
        }
    }, [product, _id]);

    if (loading) return <div>Loading product details...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Container style={{ paddingTop: '80px' }}>
            {product && (
                <Card className="mb-4">
                    <Card.Body>
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Text>{product.description}</Card.Text>
                        
                        <div className="mb-3">
                            <h5>Tags</h5>
                            <p>{product.tags}</p>
                        </div>

                        <div className="mb-3">
                            <h5>Images</h5>
                            {product.images && product.images.map((img, index) => (
                                <Image key={index} src={img} alt={`${product.title} ${index + 1}`} thumbnail />
                            ))}
                        </div>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
}

export default ProductDetails;
