// src/pages/Home.jsx
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { posts } from '../data/posts';
import PostCard from '../components/PostCard';

function Home() {
  const navigate = useNavigate();
  const latestPosts = posts.slice(0, 2);

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <Card className="text-center p-5 bg-primary text-white">
            <Card.Body>
              <h1>📝 React Blog</h1>
              <p className='lead'>
                Nơi chia sẻ kiến thức React, Hooks và Frontend
              </p>
              <Badge bg='light' text='dark' className='me-2'>
                {posts.length} bài viết
              </Badge>
              <Button as={Link} to='/posts' variant='light' className='mt-3'>
                Xem tất cả bài viết →
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h4 className='mb-3'>Bài viết mới nhất</h4>
      <Row>
        {latestPosts.map(post => (
          <Col md={6} key={post.id} className="mb-3">
            <PostCard
              post={post}
              onClick={() => navigate(`/posts/${post.id}`)}
              bodyLength={80}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
