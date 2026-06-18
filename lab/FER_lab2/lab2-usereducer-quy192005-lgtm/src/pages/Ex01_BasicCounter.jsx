/**
 * Bài 1 – Basic Counter (useReducer)
 * ====================================
 * Mục tiêu: Tạo counter với useReducer thay vì useState.
 */
import { useReducer } from 'react'
import { Card, Button, ButtonGroup } from 'react-bootstrap'

// ─────────────────────────────────────────────
// TODO 1: Initial State
// ─────────────────────────────────────────────
const initialState = { count: 0 }

// ─────────────────────────────────────────────
// TODO 2: Reducer
// ─────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 }
    case 'DECREMENT':
      return { ...state, count: state.count - 1 }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export default function Ex01_BasicCounter() {
  // ─────────────────────────────────────────────
  // TODO 3: useReducer
  // ─────────────────────────────────────────────
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <Card className="mx-auto" style={{ maxWidth: 400 }}>
      <Card.Header>
        <strong>Bài 1 – Basic Counter</strong>
      </Card.Header>
      <Card.Body className="text-center">

        {/* TODO 4: Hiển thị count */}
        <h1 data-testid="count-display">{state.count}</h1>

        <ButtonGroup className="mt-3">
          {/* TODO 5: Decrement */}
          <Button 
            variant="danger" 
            data-testid="btn-decrement"
            onClick={() => dispatch({ type: 'DECREMENT' })}
          >
            −
          </Button>

          {/* TODO 6: Reset */}
          <Button 
            variant="secondary" 
            data-testid="btn-reset"
            onClick={() => dispatch({ type: 'RESET' })}
          >
            Reset
          </Button>

          {/* TODO 7: Increment */}
          <Button 
            variant="success" 
            data-testid="btn-increment"
            onClick={() => dispatch({ type: 'INCREMENT' })}
          >
            +
          </Button>
        </ButtonGroup>

      </Card.Body>
    </Card>
  )
}