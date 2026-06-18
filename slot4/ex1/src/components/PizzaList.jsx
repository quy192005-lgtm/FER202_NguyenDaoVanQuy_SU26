import React from 'react';
import MyPizza from "./MyPizza";
import { pizzaData } from '../data/pizzaData';
import { Container, Row, Col } from 'react-bootstrap';

function PizzaList() {
    return (
        <Container className="my-5">
            <h2 className="text-center mb-5 fw-bold text-primary">
                🍕 Our Delicious Pizza Menu
            </h2>
            
            <Row>
                {pizzaData.map((pizza) => (
                    <Col 
                        key={pizza.id} 
                        xs={12} 
                        sm={6} 
                        md={6} 
                        lg={4} 
                        xl={3}
                        className="mb-4"
                    >
                        <MyPizza pizza={pizza} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default PizzaList;