import { Button, Col, Image, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

export default function ProfilePostCard({ content, postId }) {
    const [likes, setLikes] = useState([]);

    // Decoding to get the userId
    const token = localStorage.getItem("authToken");
    const decode = jwt_decode(token);
    const userId = decode.id;

    const pic =
        "https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg";

    const BASE_URL =
        "https://twitter-api-sigmaschooltech.sigma-school-full-stack.repl.co";

    useEffect(() => {
        fetch(`${BASE_URL}/likes/post/${postId}`)
            .then((response) => response.json())
            .then((data) => setLikes(data))
            .catch((error) => console.error("Error:", error));
    }, [postId]);

    const isLiked = likes.some((like) => like.user_id === userId);

    const handleLike = () => (isLiked ? removeFromLikes() : addToLikes());

    const addToLikes = () => {
        axios
            .post(`${BASE_URL}/likes`, {
                user_id: userId,
                post_id: postId,
            })
            .then((response) => {
                setLikes([...likes, { ...response.data, likes_id: response.data.id }]);
            })
            .catch((error) => console.error("Error:", error));
    };

    const removeFromLikes = () => {
        const like = likes.find((like) => like.user_id === userId);
        console.log(like);
        if (like) {
            axios
                .put(`${BASE_URL}/likes/${like.likes_id}`)
                .then(() => setLikes(likes.filter((like) => like.user_id !== userId)))
                .catch((error) => console.error("Error:", error));
        }
    };

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
                    <Button variant="light" onClick={handleLike}>
                        {isLiked ? (
                            <i className="bi bi-heart-fill text-danger"></i>
                        ) : (
                            <i className="bi bi-heart"></i>
                        )}
                        {likes.length}
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
