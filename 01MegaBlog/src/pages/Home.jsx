import React, { useState, useEffect } from "react";
import { Container, PostCart } from "../components";
import appwriteService from "../appwrite/appwriteConfigService";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    {
      authStatus
        ? appwriteService
            .getPosts([])
            .then((posts) => {
              setPosts(posts.documents);
            })
            .catch((error) => {
              console.error(error);
            })
        : null;
    }
  }, []);

  if (!authStatus) {
    return (
      <div className="py-8 w-full mt-4 text-center">
        <Container>
          <p className="mt-2 text-center text-base text-black/60">
            Login to Read Posts&nbsp;{" "}
            <Link
              to="/login"
              className="font-medium text-primary transition-all duration-200 text-blue-500 hover:text-blue-400 underline"
            >
              Log In
            </Link>
          </p>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-8">
      <Container>
        <h2 className="text-lg font-medium text-gray-900">
          Latest Posts
        </h2>
        <div className="flex flex-wrap">
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCart {...post} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
