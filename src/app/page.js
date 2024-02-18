import Advertise from "@/components/Advertise/Advertise";
import Navbar from "@/components/Navbar/Navbar";
import PostCard from "@/components/PostCard/PostCard";
import Sidebar from "@/components/Sidebar/Sidebar";

const getPosts = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/post", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading posts: ", error);
  }
};


export default async function Home() {
  const posts = await getPosts();

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
              {
                posts?.length > 0
                  ?
                  posts?.map(post =>
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
