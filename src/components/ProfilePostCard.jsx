import { Button, Col, Image, Row } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function ProfilePostCard({ content, postId }) {
    const [likes, setLikes] = useState(0);

    const pic =
        "https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg";

    useEffect(() => {
        fetch(
            `https://twitter-api-ngaiti.sigma-school-full-stack.repl.co/likes/post/${postId}`
        )
            .then((response) => response.json())
            .then((data) => setLikes(data.length))
            .catch((error) => console.error("Error:", error));
    }, [postId]);

    return (
        <Row
            className="p-3"
            style={{
                borderTop: "1px solid #D3D3D3",
                borderBottom: "1px solid #D3D3D3",
            }}
        >
            <Col sm={1}>
                <Image src={pic} fluid roundedCircle />
            </Col>
            <Col>
                <strong>Kevin</strong>
                <span> @nivek.pay · Oct 1</span>
                <p>{content}</p>
                <div className="d-flex justify-content-between">
                    <Button variant="light">
                        <i className="bi bi-chat"></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-repeat"></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-heart"></i> {likes}
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-graph-up"></i> 61
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-upload"></i>
                    </Button>
                </div>
            </Col>
        </Row>
    );
}
