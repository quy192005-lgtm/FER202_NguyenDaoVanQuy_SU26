import React from 'react';
import { Card } from 'react-bootstrap';

function MyPizza({ pizza }) {
    return (
        <Card className="shadow-sm h-100">
            <Card.Img 
                variant="top" 
                src={pizza.imageSrc} 
                style={{ height: '200px', objectFit: 'cover' }}
                onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Pizza';
                }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{pizza.name}</Card.Title>
                {pizza.type && <Card.Subtitle className="text-muted mb-2">{pizza.type}</Card.Subtitle>}
                
                <Card.Text className="flex-grow-1">
                    {pizza.description}
                </Card.Text>

                <div className="mt-auto">
                    {pizza.oldPrice && (
                        <p className="mb-1 text-decoration-line-through text-muted">
                            ${pizza.oldPrice}
                        </p>
                    )}
                    <h5 className="text-danger mb-2">
                        ${pizza.newPrice}
                    </h5>

                    {pizza.tag && (
                        <span className="badge bg-warning text-dark">{pizza.tag}</span>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}

export default MyPizza;