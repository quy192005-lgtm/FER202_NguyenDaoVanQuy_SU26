import React from 'react';
import MyProfile from './MyProfile';
import { Container } from 'react-bootstrap';

function Footer() {
    const profile = {
        id: "DE190984",
        name: "QUY",
        email: "sangtq@fpt.edu.vn",
        githubLink: "https://github.com/fudn-traltb-su26/slot4-exercise1-props-quy192005-lgtm.git",
        avatarSrc: "/images/avatars/image.jpg"
    };

    return (
        <footer style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#f8f9fa',
            borderTop: '1px solid #dee2e6',
            boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            padding: '15px 0'
        }}>
            <Container>
                <MyProfile profile={profile} />

                <div className="text-center mt-3">
                    <p className="mb-0" style={{ 
                        fontSize: '0.85rem', 
                        color: '#666',
                        fontWeight: '500'
                    }}>
                        © 2026 Student Profile Footer - FER202
                    </p>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;