import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

function MyProfile({ profile }) {
    if (!profile) return null;

    return (
        <Container className="my-4">
            <Row className="justify-content-center">
                <Col xs={12} sm={10} md={8} lg={5}>
                    <Card className="shadow-sm text-center">
                        <Card.Img 
                            variant="top" 
                            src={profile.avatarSrc} 
                            style={{ height: '220px', objectFit: 'cover' }}
                            onError={(e) => e.target.src = 'https://via.placeholder.com/300x220?text=Avatar'}
                        />
                        <Card.Body>
                            <Card.Title>{profile.name}</Card.Title>
                            <Card.Text className="text-start">
                                <p><strong>ID:</strong> {profile.id}</p>
                                <p>
                                    <strong>Email:</strong>{' '}
                                    <a href={`mailto:${profile.email}`}>{profile.email}</a>
                                </p>
                                <a 
                                    href={profile.githubLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="btn btn-primary btn-sm w-100"
                                >
                                    🔗 Visit GitHub
                                </a>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default MyProfile;