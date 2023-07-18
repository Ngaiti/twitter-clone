import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { Button, Col, Image, Nav, Row } from "react-bootstrap";
import ProfilePostCard from "./ProfilePostCard";

export default function ProfileMidBody() {
    const [posts, setPosts] = useState([]);
    const url =
        "https://pbs.twimg.com/profile_banners/83072625/1602845571/1500x500";
    const pic =
        "https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg";

    // Fetch posts based on user id
    const fetchPosts = (userId) => {
        fetch(
            `https://twitter-api-ngaiti.sigma-school-full-stack.repl.co/posts/user/${userId}`
        )
            .then((response) => response.json())
            .then((data) => setPosts(data))
            .catch((error) => console.error("Error:", error));
    };

    useEffect(() => {
        const token = localStorage.getItem("authToken"); // Replace with your token name
        if (token) {
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.id; // Replace with the correct key from your token payload
            fetchPosts(userId);
        }
    }, []);

    return (
        <Col sm={6} className="bg-light" style={{ border: "1px solid lightgrey" }}>
            <Image src={url} fluid />
            <br />
            <Image
                src={pic}
                roundedCircle
                style={{
                    width: 150,
                    position: "absolute",
                    top: "140px",
                    border: "4px solid #F8F9FA",
                    marginLeft: 15,
                }}
            />

            <Row className="justify-content-end">
                <Col xs="auto">
                    <Button className="rounded-pill mt-2" variant="outline-secondary">
                        Edit Profile
                    </Button>
                </Col>
            </Row>

            <p
                className="mt-5"
                style={{ margin: 0, fontWeight: "bold", fontSize: "15px" }}
            >
                Kevin
            </p>
            <p style={{ marginBottom: "2px" }}>@nivek.pay</p>
            <p>
                I like eggs
            </p>
            <p>Definitely not an entrepreneur</p>
            <p>
                <strong>271</strong> Following <strong>610</strong> Followers
            </p>
            <Nav variant="underline" defaultActiveKey="/home" justify>
                <Nav.Item>
                    <Nav.Link eventKey="/home">Tweets</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Replies</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Highlights</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-3">Media</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-4">Likes</Nav.Link>
                </Nav.Item>
            </Nav>
            {posts.map((post) => (
                <ProfilePostCard
                    key={post.id}
                    content={post.content}
                    postId={post.id}
                />
            ))}
        </Col>
    );
}