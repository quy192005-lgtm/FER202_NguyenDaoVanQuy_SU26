import { Card, Table, Button } from 'react-bootstrap'
import { useFeedback } from '../context/FeedbackContext'
import { formatDate } from '../utils/format'

function FeedbackTable({ feedbacks, onEdit }) {
  const { deleteFeedback } = useFeedback()

  const handleDelete = async (id) => {
    await deleteFeedback(id)
  }

  return (
    <Card className="feedback-card feedback-table-card">
      <Card.Body>
        <div className="card-title-custom">Feedback Management</div>

        <Table bordered hover responsive className="feedback-table mb-0">
          <thead>
            <tr>
              <th>Course</th>
              <th>Topic</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Date</th>
              <th className="actions-heading"></th>
            </tr>
          </thead>

          <tbody>
            {feedbacks.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-muted py-4">
                  No feedbacks yet.
                </td>
              </tr>
            ) : (
              feedbacks.map((fb) => (
                <tr key={fb.id}>
                  <td>{fb.course}</td>
                  <td>{fb.topic}</td>
                  <td>{fb.rating}</td>
                  <td>{fb.comment}</td>
                  <td>{formatDate(fb.date)}</td>
                  <td className="table-actions">
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => onEdit(fb)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(fb.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

export default FeedbackTable
