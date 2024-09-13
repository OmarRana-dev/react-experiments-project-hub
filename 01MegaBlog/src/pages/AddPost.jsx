import React from "react";
import { Container, PostForm } from "../components";

function AddPost() {
  return (
    <div className="py-8">
      <Container >
        <h2 className="text-lg font-medium text-gray-900">
          Add a Post
        </h2>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
