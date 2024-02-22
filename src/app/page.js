import Advertise from "@/components/Advertise/Advertise";
import Navbar from "@/components/Navbar/Navbar";
import PostCard from "@/components/PostCard/PostCard";
import PostCreate from "@/components/PostCreate/PostCreate";
import Sidebar from "@/components/Sidebar/Sidebar";

export async function getPosts() {
  const res = await fetch('http://localhost:3000/api/post', {cache:"no-store"})
  return res.json();
}

export default async function Home() {
  const posts = await getPosts();
  const sortedPosts = posts?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      <div>
        <div>
          <div className='shadow-md bg-white sticky top-0 z-50'>
            <Navbar />
          </div>
          <div className="flex flex-col md:flex-row mt-5 gap-5 max-w-6xl m-auto">
            <div className="w-full md:w-[250px]">
              <Sidebar />
            </div>
            <div className="max-w-6xl mx-auto flex-1 space-y-5">
              <PostCreate/>
              {
                sortedPosts?.length > 0
                  ?
                  sortedPosts?.map(post =>
                    <PostCard key={post._id} post={post}></PostCard>
                  )
                  :
                  <p className="text">No Post available!</p>
              }
            </div>
            <div className="w-full md:w-[250px]">
              <Advertise />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}