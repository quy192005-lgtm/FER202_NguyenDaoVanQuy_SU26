import React, { useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { PizzasData } from '../shared/ListOfPizzas'
import PizzaCard from './PizzaCard'
import PizzaDetailModal from './PizzaDetailModal'

export default function Pizzas() {
  const [show, setShow] = useState(false)
  const [selectedPizza, setSelectedPizza] = useState(null)

  const handleShow = (pizza) => {
    setSelectedPizza(pizza)
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
    setSelectedPizza(null)
  }

  return (
    <Container>
      <Row>
        {PizzasData.map((pizza) => (
          <Col md={3} key={pizza.pizzaName}>
            <PizzaCard
              pizza={pizza}
              onShowDetail={handleShow}
            />
          </Col>
        ))}
      </Row>

      <PizzaDetailModal
        show={show}
        pizza={selectedPizza}
        onClose={handleClose}
      />
    </Container>
  )
}