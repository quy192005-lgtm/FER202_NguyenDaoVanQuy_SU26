/**
 * Bài 3 – Todo List (useReducer)
 * ================================
 */
import { useReducer, useState } from 'react'
import { Card, Form, Button, ListGroup, Badge, ButtonGroup } from 'react-bootstrap'

// ─────────────────────────────────────────────
// TODO 1: Định nghĩa initialState
//   - Là mảng rỗng []
//   (mỗi todo: { id, text, done })
// ─────────────────────────────────────────────
const initialState = []

// ─────────────────────────────────────────────
// TODO 2: Viết reducer(state, action)
//
//   Case 'ADD_TODO':
//     - action.payload = { id: Date.now(), text: '...', done: false }
//     - Trả về [...state, action.payload]
//
//   Case 'TOGGLE_TODO':
//     - action.payload = id của todo cần toggle
//     - Dùng .map() để đảo done của todo có id khớp
//
//   Case 'DELETE_TODO':
//     - action.payload = id của todo cần xóa
//     - Dùng .filter() để loại bỏ
//
//   Case 'CLEAR_DONE':
//     - Xóa tất cả todo có done = true
//     - Dùng .filter(t => !t.done)
// ─────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload]

    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, done: !todo.done }
          : todo
      )

    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload)

    case 'CLEAR_DONE':
      return state.filter(todo => !todo.done)

    default:
      return state
  }
}

export default function Ex03_TodoList() {
  // ─────────────────────────────────────────────
  // TODO 3: useReducer
  // ─────────────────────────────────────────────
  const [state, dispatch] = useReducer(reducer, initialState)

  const [text, setText] = useState('')

  // ─────────────────────────────────────────────
  // TODO 4: Viết hàm handleAdd()
  //   - Nếu text.trim() rỗng thì return (không làm gì)
  //   - dispatch ADD_TODO với payload { id: Date.now(), text: text.trim(), done: false }
  //   - setText('') để xóa input
  // ─────────────────────────────────────────────
  function handleAdd() {
    if (text.trim() === '') return
    dispatch({
      type: 'ADD_TODO',
      payload: {
        id: Date.now(),
        text: text.trim(),
        done: false
      }
    })
    setText('')
  }

  // ─────────────────────────────────────────────
  // TODO 5: pendingCount
  // ─────────────────────────────────────────────
  const pendingCount = state.filter(t => !t.done).length

  return (
    <Card className="mx-auto" style={{ maxWidth: 500 }}>
      <Card.Header>
        <strong>Bài 3 – Todo List</strong>{' '}
        {/* TODO 6 */}
        <Badge bg="primary" data-testid="pending-count">
          {pendingCount}
        </Badge>
        {' '}việc chưa xong
      </Card.Header>
      <Card.Body>

        {/* Form thêm todo */}
        <div className="d-flex gap-2 mb-3">
          <Form.Control
            data-testid="todo-input"
            placeholder="Nhập công việc..."
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
          />
          {/* TODO 7 */}
          <Button data-testid="btn-add-todo" onClick={handleAdd}>
            Thêm
          </Button>
        </div>

        {/* Danh sách todo */}
        <ListGroup data-testid="todo-list" className="mb-3">
          {/* TODO 8: Render danh sách */}
          {state.map(todo => (
            <ListGroup.Item
              key={todo.id}
              data-testid={`todo-item-${todo.id}`}
              style={{
                textDecoration: todo.done ? 'line-through' : 'none',
                opacity: todo.done ? 0.7 : 1
              }}
              className="d-flex justify-content-between align-items-center"
            >
              <span>{todo.text}</span>
              <ButtonGroup size="sm">
                {/* Nút Toggle */}
                <Button
                  variant={todo.done ? "success" : "outline-success"}
                  data-testid={`btn-toggle-${todo.id}`}
                  onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
                >
                  {todo.done ? "✓" : "○"}
                </Button>

                {/* Nút Delete */}
                <Button
                  variant="outline-danger"
                  data-testid={`btn-delete-${todo.id}`}
                  onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
                >
                  ✕
                </Button>
              </ButtonGroup>
            </ListGroup.Item>
          ))}
        </ListGroup>

        {/* Nút xóa việc đã xong */}
        {/* TODO 9 */}
        <Button
          variant="outline-danger"
          size="sm"
          data-testid="btn-clear-done"
          onClick={() => dispatch({ type: 'CLEAR_DONE' })}
        >
          Xóa việc đã xong
        </Button>

      </Card.Body>
    </Card>
  )
}