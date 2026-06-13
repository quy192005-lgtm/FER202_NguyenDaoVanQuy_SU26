import { Badge } from 'react-bootstrap';

function TagBadges({ tags }) {
  if (!tags || tags.length === 0) return null;

  return (
    <>
      {tags.map(tag => (
        <Badge key={tag} bg='secondary' className='fw-normal'>#{tag}</Badge>
      ))}
    </>
  );
}

export default TagBadges;
