import { useState } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MyModal from '../components/MyModal';   // ← Import Modal

function RegistrationForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) newErrors.username = 'Username là bắt buộc';
    else if (formData.username.length < 3) newErrors.username = 'Username phải có ít nhất 3 ký tự';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) newErrors.email = 'Email là bắt buộc';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Email không đúng định dạng';

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!formData.password) newErrors.password = 'Password là bắt buộc';
    else if (formData.password.length < 6) newErrors.password = 'Password phải có ít nhất 6 ký tự';
    else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt';
    }

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Vui lòng xác nhận password';
    else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Password xác nhận không khớp';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      setShowSuccessModal(true);   // Mở Modal
    }
    
    setIsSubmitting(false);
  };

  const handleCancel = () => {
    navigate('/posts'); // Quay về danh sách bài viết nếu hủy
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate('/posts');   // Chuyển hướng về trang chủ Blog sau khi đóng modal
  };

  return (
    <Container className="py-5" style={{ maxWidth: '500px' }}>
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white text-center">
          <h4 className="mb-0">📝 Đăng Ký Tài Khoản</h4>
        </Card.Header>
        
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            {/* Các trường form giữ nguyên như trước */}
            <Form.Group className="mb-3">
              <Form.Label>Username <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                isInvalid={!!errors.username}
                placeholder="Nhập username"
                disabled={isSubmitting}
              />
              <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
                placeholder="example@email.com"
                disabled={isSubmitting}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
                placeholder="Nhập password"
                disabled={isSubmitting}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              <small className="text-muted">
                Ít nhất 6 ký tự, chứa chữ hoa, thường, số và ký tự đặc biệt
              </small>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Xác nhận Password <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                isInvalid={!!errors.confirmPassword}
                placeholder="Nhập lại password"
                disabled={isSubmitting}
              />
              <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
            </Form.Group>

            <Row className="g-3">
              <Col>
                <Button variant="primary" type="submit" className="w-100" disabled={isSubmitting}>
                  {isSubmitting ? 'Đang xử lý...' : 'Đăng Ký'}
                </Button>
              </Col>
              <Col>
                <Button variant="secondary" type="button" className="w-100" onClick={handleCancel}>
                  Hủy
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* MyModal Success */}
      <MyModal
        show={showSuccessModal}
        onHide={handleModalClose}
        title="Đăng Ký Thành Công"
        body="Chúc mừng! Tài khoản của bạn đã được tạo thành công."
        variant="success"
      />
    </Container>
  );
}

export default RegistrationForm;