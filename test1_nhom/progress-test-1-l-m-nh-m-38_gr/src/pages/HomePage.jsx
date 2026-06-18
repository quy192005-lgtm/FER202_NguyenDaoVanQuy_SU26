import { Container, Row, Col, Card, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const exercises = [
  {
    path: '/ex01',
    title: 'Bài 1 – Counter',
    badge: 'useContext + useState',
    desc: 'Chia sẻ state đếm qua Context cho nhiều component độc lập.',
    files: ['context/CounterContext.jsx', 'components/counter/*', 'pages/Ex01CounterPage.jsx'],
  },
  {
    path: '/ex02',
    title: 'Bài 2 – Login Form',
    badge: 'useContext + useState',
    desc: 'Quản lý trạng thái đăng nhập toàn app qua AuthContext.',
    files: ['context/AuthContext.jsx', 'components/auth/*', 'pages/Ex02LoginPage.jsx'],
  },
  {
    path: '/ex03',
    title: 'Bài 3 – Validation Form',
    badge: 'useContext + useReducer',
    desc: 'Form đăng ký với validation theo thời gian thực, dùng useReducer.',
    files: ['context/FormContext.jsx', 'reducers/formReducer.js', 'utils/validators.js', 'components/form/*', 'pages/Ex03ValidationPage.jsx'],
  },
  {
    path: '/ex04',
    title: 'Bài 4 – Theme Switcher',
    badge: 'useContext + useState',
    desc: 'Đổi giao diện Light / Dark / System, lưu vào localStorage.',
    files: ['context/ThemeContext.jsx', 'data/themeConfig.js', 'components/theme/*', 'pages/Ex04ThemePage.jsx'],
  },
]

export default function HomePage() {
  return (
    <Container className="py-5 page-container">
      <div className="text-center mb-5">
        <h1 className="fw-bold" style={{ color: 'var(--primary-color)' }}>useContext – Bài tập thực hành</h1>
        <p className="text-muted lead mt-3">
          Vận dụng <strong>useContext</strong>, <strong>useState</strong>,{' '}
          <strong>useReducer</strong> và <strong>React Router</strong>
        </p>
      </div>
      <Row xs={1} md={2} className="g-4">
        {exercises.map(ex => (
          <Col key={ex.path}>
            <Link to={ex.path} className="text-decoration-none d-block">
              <div className="card-custom h-100 p-0 overflow-hidden"
                style={{ transition: 'transform .2s ease, box-shadow .2s ease' }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                }}
              >
                <Card.Body className="p-4">
                  <Badge bg="primary" className="mb-3 px-3 py-2 rounded-pill shadow-sm" style={{ backgroundColor: 'var(--primary-color) !important' }}>{ex.badge}</Badge>
                  <Card.Title className="text-dark fw-bold fs-4 mb-3">{ex.title}</Card.Title>
                  <Card.Text className="text-muted" style={{ fontSize: '0.95rem' }}>{ex.desc}</Card.Text>
                  <hr className="my-4" style={{ borderColor: 'var(--border-color)' }} />
                  <p className="mb-2 small fw-semibold text-secondary text-uppercase tracking-wide">Files cần tạo:</p>
                  <ul className="mb-0 ps-3">
                    {ex.files.map(f => (
                      <li key={f} className="small text-muted font-monospace mb-1">{f}</li>
                    ))}
                  </ul>
                </Card.Body>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
