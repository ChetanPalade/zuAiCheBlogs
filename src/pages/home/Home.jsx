import Blogs from "../../components/blogs/Blogs";

function Home({ blogsData }) {
  return (
    <>
      <Blogs blogsData={blogsData} />
    </>
  )
}

export default Home;