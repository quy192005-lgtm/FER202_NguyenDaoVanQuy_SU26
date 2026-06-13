// src/pages/PostList.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { posts } from '../data/posts';
import PostCard from '../components/PostCard';

function PostList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tất cả');

  const categories = ['Tất cả', ...new Set(posts.map(p => p.category))];

  const filtered = posts.filter(post => {
    const matchSearch = post.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'Tất cả' || post.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <Container className="py-4">
      <h2 className='mb-4'>📚 Danh sách bài viết</h2>

      <InputGroup className="mb-3">
        <InputGroup.Text>🔍</InputGroup.Text>
        <Form.Control
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='Tìm kiếm bài viết...'
        />
        {search && (
          <Button variant='outline-secondary' onClick={() => setSearch('')}>
            × Xóa
          </Button>
        )}
      </InputGroup>

      <div className='mb-4 d-flex gap-2 flex-wrap'>
        {categories.map(cat => (
          <Button
            key={cat}
            variant={activeCategory === cat ? 'primary' : 'outline-primary'}
            size="sm"
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className='text-muted text-center py-5'>
          Không tìm thấy bài viết nào.
        </p>
      ) : (
        <Row>
          {filtered.map(post => (
            <Col md={6} lg={4} key={post.id} className="mb-4">
              <PostCard
                post={post}
                onClick={() => navigate(`/posts/${post.id}`)}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default PostList;
