import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/appwriteConfigService";
import { Link } from "react-router-dom";

function PostCart({ $id, title, featuredImage }) {
  const [imageUrl, setImageUrl] = useState(null);

  console.log($id);
  console.log(title);
  console.log(featuredImage);

  useEffect(() => {
    appwriteService.getFilePreview(featuredImage).then((url) => {
      setImageUrl(url);
    });
  }, [featuredImage]);

  return (
    <>
      <Link to={`/post/${$id}`}>
        <div className="w-full bg-gray-100 rounded-xl p-4 ">
          <div className="flex justify-center mb-4">
            <img src={imageUrl} alt={title} className="rounded-xl" />
          </div>
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
      </Link>
    </>
  );
}

export default PostCart;
