import { Card, Badge } from 'react-bootstrap';
import TagBadges from './TagBadges';

function PostCard({ post, onClick, bodyLength = 70 }) {
  return (
    <Card
      className='h-100 shadow-sm'
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
    >
      <Card.Body>
        <div className='d-flex justify-content-between mb-2'>
          <Badge bg='primary'>{post.category}</Badge>
          <small className='text-muted'>{post.date}</small>
        </div>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text className='text-muted small'>
          {post.body.substring(0, bodyLength)}...
        </Card.Text>
        <div className='d-flex flex-wrap gap-1 mt-2'>
          <TagBadges tags={post.tags} />
        </div>
      </Card.Body>
      {post.author && (
        <Card.Footer className='text-muted small'>
          ✍️ {post.author}
        </Card.Footer>
      )}
    </Card>
  );
}

export default PostCard;
