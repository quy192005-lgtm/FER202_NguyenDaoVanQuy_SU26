import { useEffect, useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { useFeedback } from '../context/FeedbackContext'
import { getTodayFormatted } from '../utils/format'

const INITIAL_FORM = {
  course: '',
  topic: '',
  rating: '',
  comment: '',
}

function AddFeedbackForm({ editTarget, onCancelEdit }) {
  const { user } = useAuth()
  const { addFeedback, editFeedback } = useFeedback()

  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})

  const isEditMode = !!editTarget

  useEffect(() => {
    if (editTarget) {
      setForm({
        course: editTarget.course || '',
        topic: editTarget.topic || '',
        rating: editTarget.rating || '',
        comment: editTarget.comment || '',
      })
      setErrors({})
    } else {
      setForm(INITIAL_FORM)
      setErrors({})
    }
  }, [editTarget])

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: null,
    }))
  }

  const validate = () => {
    const newErrors = {}

    if (!form.course.trim()) {
      newErrors.course = 'Course name is required'
    }

    const ratingNumber = Number(form.rating)
    if (!form.rating || isNaN(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
      newErrors.rating = 'Rating must be between 1 and 5'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const payload = {
      course: form.course.trim(),
      topic: form.topic.trim(),
      rating: Number(form.rating),
      comment: form.comment.trim(),
    }

    if (isEditMode) {
      await editFeedback(editTarget.id, {
        ...editTarget,
        ...payload,
      })

      onCancelEdit()
    } else {
      await addFeedback({
        ...payload,
        userId: user.id,
        date: getTodayFormatted(),
      })

      setForm(INITIAL_FORM)
    }

    setErrors({})
  }

  return (
    <Card>
      <Card.Body>
        <div className="card-title-custom">
          {isEditMode ? 'Edit Feedback' : 'Add Feedback'}
        </div>

        <Form className="feedback-form" onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3">
            <Form.Label>Course</Form.Label>
            <Form.Control
              type="text"
              name="course"
              value={form.course}
              onChange={handleChange}
              isInvalid={!!errors.course}
            />
            <Form.Control.Feedback type="invalid">
              {errors.course}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Topic</Form.Label>
            <Form.Control
              type="text"
              name="topic"
              value={form.topic}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Select
              name="rating"
              value={form.rating}
              onChange={handleChange}
              isInvalid={!!errors.rating}
            >
              <option value="">Select rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.rating}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="comment"
              value={form.comment}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="text-center">
            <Button type="submit" variant="primary">
              {isEditMode ? 'Save' : 'Add Feedback'}
            </Button>

            {isEditMode && (
              <Button
                type="button"
                variant="secondary"
                className="ms-2"
                onClick={onCancelEdit}
              >
                Cancel
              </Button>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default AddFeedbackForm