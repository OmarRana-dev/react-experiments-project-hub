import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/appwriteConfigService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    control,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      console.log(data);
      if (post) {
        const file = data.image[0]
          ? appwriteService.uploadFile(data.image[0])
          : null;
        if (file) {
          appwriteService.deleteFile(post.featuredImage);
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        const file = data.image[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        console.log(file);
        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;
          console.log(fileId);
          console.log((data.featuredImage = fileId));
        }
        // console.log(userData);
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
          featuredImage: file ? file.$id : undefined,
        });
        console.log(dbPost);

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    },
    [post, userData, navigate]
  );

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, "") // Remove all non-word characters (except spaces and hyphens)
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/--+/g, "-") // Replace multiple hyphens with a single hyphen
        .replace(/^-+|-+$/g, ""); // Trim hyphens from the start and end of the slug
    }

    return "";
  }, []);

  useEffect(() => {
    const subscriptions = watch((value, { name }) => {
      if (name === "title") {
        setValue(
          "slug",
          slugTransform(value.title, { shouldValidate: true })
        );
      }
    });

    return () => {
      subscriptions.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <div className="py-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap"
      >
        <div className="w-2/3 px-2">
          <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
          <RTE
            label="Content :"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
        <div className="w-1/3 px-2">
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="w-full mb-4">
              <img
                src={appwriteService.getFilePreview(
                  post.featuredImage
                )}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />
          <Button
            type="submit"
            bgColor={post ? "bg-green-500" : undefined}
            className="w-full"
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
