import { useEffect, useState } from 'react'
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { useFeedback } from '../context/FeedbackContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AddFeedbackForm from '../components/AddFeedbackForm'
import FeedbackTable from '../components/FeedbackTable'
import EditFeedbackModal from '../components/EditFeedbackModal'

function HomePage() {
  const { user } = useAuth()
  const { items, loading, error, fetchFeedbacks } = useFeedback()

  const [editTarget, setEditTarget] = useState(null)

  useEffect(() => {
    if (user) {
      fetchFeedbacks(user.id)
    }
  }, [user])

  return (
    <>
      <Header />

      <Container className="dashboard-wrapper">
        {loading && (
          <div className="text-center my-5">
            <Spinner animation="border" />
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && (
          <Row className="g-3">
            <Col md={4}>
              <AddFeedbackForm />
            </Col>

            <Col md={8}>
              <FeedbackTable
                feedbacks={items}
                onEdit={setEditTarget}
              />
            </Col>
          </Row>
        )}
      </Container>

      <Footer />

      <EditFeedbackModal
        show={!!editTarget}
        feedback={editTarget}
        onHide={() => setEditTarget(null)}
      />
    </>
  )
}

export default HomePage
