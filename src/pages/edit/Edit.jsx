import { useForm } from "react-hook-form";
import styles from "./Edit.module.css";
import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


function Edit({ blogsData }) {
  const { id } = useParams();
  const blog = blogsData.find((item) => item._id === id);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: { ...blog },
  });

  const [blogImage, setBlogImage] = useState("");
  const [blogImage2, setBlogImage2] = useState(null);
  const [isformEdited, setIsFormEdited] = useState(false);
  const navigate = useNavigate();

  // Update a blog
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("description", data.description);
    formData.append("category", data.category);
    blogImage2 !== null && formData.append("image", blogImage2); 

    axios.patch(`https://mern-blog-app-server-production.up.railway.app/api/blogs/${id}`, formData);
    navigate("/");
  };

  // Delete a blog
  function handleDelete() {
    axios.delete(`https://mern-blog-app-server-production.up.railway.app/api/blogs/${id}`);
    navigate("/");
  }

  // upload or change image
  function handleImageUpload(e) {
    const file = e.target.files[0];
    setBlogImage2(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setBlogImage(reader.result);
    };
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <img
        src={
          blogImage === ""
            ? blog.image === "" || !blog.image
              ? "data:image/jpeg;base64,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"
              : `https://mern-blog-app-server-production.up.railway.app/${blog.filePath}`
            : blogImage
        }
        alt="blog-image"
      />

      {isformEdited && (
        <div style={{
          width: "100%",
          height: "40px",
          display: "flex",
          justifyContent: "center"
        }}>
          <input
            type="file"
            accept="image/*"
            id="fileinput"
            {...register("image")}
            aria-invalid={errors.image ? "true" : "false"}
            className={styles["image-upload-inp"]}
            onChange={(e) => handleImageUpload(e)}
          />

          <button
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("fileinput").click();
            }}
            className={styles["image-upload-button"]}
          >
            {blog.image === "" || !blog.image ? "Upload " : "Change "}Image
          </button>
        </div>
      )}
      <br />
      {isformEdited && errors.image && (
        <span role="alert" className={styles["error-message"]}>
          {errors.image?.message}
        </span>
      )}

      {isformEdited ? (
        <select
          {...register("category", { required: "This field is required!" })}
          aria-invalid={errors.category ? "true" : "false"}
          defaultValue=""
        >
          <option disabled value="">
            Select Category
          </option>
          <option value="business">Business/corporate</option>
          <option value="travel">Travel</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="food">Food</option>
          <option value="sport">Sport</option>
          <option value="other">Other</option>
        </select>
      ) : (
        <h3>#{blog?.category}</h3>
      )}
      {errors.category && (
        <span role="alert" className={styles["error-message"]}>
          {errors.category?.message}
        </span>
      )}

      {isformEdited ? (
        <input
          {...register("title", { required: "This field is required!" })}
          aria-invalid={errors.title ? "true" : "false"}
          placeholder="Title"
          className={styles["text-input"]}
        />
      ) : (
        <h2>{blog?.title}</h2>
      )}
      {errors.title && (
        <span role="alert" className={styles["error-message"]}>
          {errors.title?.message}
        </span>
      )}

      {isformEdited ? (
        <textarea
          {...register("description", { required: "This field is required!" })}
          aria-invalid={errors.description ? "true" : "false"}
          placeholder="Description"
        />
      ) : (
        <p>{blog?.description}</p>
      )}
      {errors.description && (
        <span role="alert" className={styles["error-message"]}>
          {errors.description?.message}
        </span>
      )}

      {isformEdited ? (
        <input
          {...register("author", { required: "This field is required!" })}
          aria-invalid={errors.author ? "true" : "false"}
          placeholder="Author"
          className={styles["text-input"]}
        />
      ) : (
        <h4>Author: {blog?.author}</h4>
      )}
      {errors.author && (
        <span role="alert" className={styles["error-message"]}>
          {errors.author?.message}
        </span>
      )}

      {isformEdited && (
        <button type="submit" className={styles["submit-btn"]}>
          Update
        </button>
      )}
      {!isformEdited && (
        <div className={styles["buttons-container"]}>
          <button
            className={styles["edit-btn"]}
            type="button"
            onClick={() => setIsFormEdited(true)}
          >
            Edit
          </button>
          <button
            className={styles["delete-btn"]}
            type="button"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </form>
  );
}

export default Edit;