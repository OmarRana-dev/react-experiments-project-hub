import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/appwriteConfigService";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }

    appwriteService
      .getPost(slug)
      .then((post) => {
        setPost(post);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <h2 className="text-lg font-medium text-gray-900">
          Edit Post
        </h2>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
