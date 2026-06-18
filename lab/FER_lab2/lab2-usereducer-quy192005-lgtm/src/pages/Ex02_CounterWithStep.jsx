
/**
 * Bài 2 – Counter với Step & History (useReducer)
 * =================================================
 */
import { useReducer } from 'react'
import { Card, Button, ButtonGroup, Form, ListGroup, Badge } from 'react-bootstrap'
// ─────────────────────────────────────────────
// TODO 1: Định nghĩa initialState
//   {
//     count:   0,
//     step:    1,
//     history: []   // mảng lưu các giá trị count trước đó
//   }
// ─────────────────────────────────────────────
const initialState = {
  count: 0,
  step: 1,
  history: []
}
// ─────────────────────────────────────────────
// TODO 2: Viết reducer(state, action)
//
//   Case 'INCREMENT':
//     - count mới = count + step
//     - history mới = [...history.slice(-9), count]  ← lưu count CŨ
//     - Trả state mới với count và history đã cập nhật
//
//   Case 'DECREMENT':
//     - Tương tự INCREMENT nhưng count - step
//
//   Case 'RESET':
//     - Trả về initialState
//
//   Case 'SET_STEP':
//     - action.payload là giá trị step mới (Number)
//     - Trả state mới với step = action.payload
// ─────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT': {
      const newCount = state.count + state.step
      const newHistory = [...state.history.slice(-9), state.count] // lưu giá trị cũ
      return {
        ...state,
        count: newCount,
        history: newHistory
      }
    }
    case 'DECREMENT': {
      const newCount = state.count - state.step
      const newHistory = [...state.history.slice(-9), state.count] // lưu giá trị cũ
      return {
        ...state,
        count: newCount,
        history: newHistory
      }
    }
    case 'RESET':
      return initialState

    case 'SET_STEP':
      return {
        ...state,
        step: Number(action.payload)
      }

    default:
      return state
  }
}

export default function Ex02_CounterWithStep() {
  // ─────────────────────────────────────────────
  // TODO 3: useReducer
  // ─────────────────────────────────────────────
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <Card className="mx-auto" style={{ maxWidth: 480 }}>
      <Card.Header><strong>Bài 2 – Counter với Step & History</strong></Card.Header>
      <Card.Body>

        {/* Hiển thị count */}
        <div className="text-center mb-3">
          {/* TODO 4 */}
          <h1 data-testid="count-display">{state.count}</h1>
        </div>

        {/* Điều chỉnh Step */}
        <Form.Group className="mb-3">
          <Form.Label>Step (bước nhảy)</Form.Label>
          {/* TODO 5 */}
          <Form.Control
            type="number"
            data-testid="step-input"
            min={1}
            value={state.step}
            onChange={(e) => dispatch({ 
              type: 'SET_STEP', 
              payload: e.target.value 
            })}
          />
        </Form.Group>

        {/* Các nút */}
        <ButtonGroup className="w-100 mb-3">
          {/* TODO 6: Decrement */}
          <Button 
            variant="danger" 
            data-testid="btn-decrement"
            onClick={() => dispatch({ type: 'DECREMENT' })}
          >
            −
          </Button>

          {/* TODO 7: Reset */}
          <Button 
            variant="secondary" 
            data-testid="btn-reset"
            onClick={() => dispatch({ type: 'RESET' })}
          >
            Reset
          </Button>

          {/* TODO 8: Increment */}
          <Button 
            variant="success" 
            data-testid="btn-increment"
            onClick={() => dispatch({ type: 'INCREMENT' })}
          >
            +
          </Button>
        </ButtonGroup>

        {/* Lịch sử */}
        <div>
          <small className="text-muted">Lịch sử (10 gần nhất):</small>
          <div data-testid="history-list" className="mt-1 d-flex flex-wrap gap-1">
            {/* TODO 9: Render history */}
            {state.history.map((value, index) => (
              <Badge 
                key={index} 
                bg="secondary" 
                data-testid="history-item"
              >
                {value}
              </Badge>
            ))}
          </div>
        </div>

      </Card.Body>
    </Card>
  )
}