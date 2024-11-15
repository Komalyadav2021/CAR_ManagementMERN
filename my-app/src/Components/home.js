import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        axios.get('http://localhost:8000/getproducts')
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError('Failed to fetch products');
                setLoading(false);
            });
    }, []);

    return (
        <div className="main-content" style={{ paddingTop: '80px' }}>
            <Container>
                {loading && <div>Loading products...</div>}
                {error && <div>{error}</div>}

                <Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4}>
                            <Card className="mb-4">
                                <Card.Img variant="top" src={product.images[0]} alt={product.title} />
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    {/* Passing entire product details in state */}
                                    <Link to={{
                                        pathname: `/productDetails/${product._id}`,
                                        state: { product }  // Passing product details via state
                                    }}>
                                        View Details
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default ProductList;
