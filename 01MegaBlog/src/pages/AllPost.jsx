import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/appwriteConfigService";
import { Container, PostCart } from "../components";

function AllPost() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService
      .getPosts([])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCart post={post} />
            </div>
          ))}
        </div>
      </Container>{" "}
      {/* end of container */}
    </div>
  );
}

export default AllPost;
