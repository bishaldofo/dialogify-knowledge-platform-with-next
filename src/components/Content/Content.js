import Image from "next/image";
import Link from "next/link";

const Content = () => {
   return (
      <div className="space-y-5">
      <div className="card w-full bg-base-100 rounded-sm shadow-xl">
          <div className="card-body p-3">
            <div className="flex items-center gap-2">
              <div className="w-10 rounded-full">
                <Image
                  width={100}
                  height={100}
                  className="rounded-full"
                  alt="Tailwind CSS Navbar component"
                  src="https://i.ibb.co/MNJLHMM/defalut-img.webp"
                />
              </div>
              <div>
                <p className="text-sm font-bold"><Link href="/">Post name</Link></p>
              </div>
              <div>
                <small>
                  Post created time
                </small>
              </div>
            </div>
            <h2 className="card-title">Post Title</h2>
            <p className="text-sm">Description</p>
          </div>
          <figure>
            <Image width={600} className="w-full" height={600} src="https://i.ibb.co/j8ZwHKW/pexels-photo-4860479.jpg" alt="News" />
          </figure>
          <div className="flex items-center">
            <div className="flex items-center p-1 m-2 shadow-sm border-gray-100 bg-gray-100 rounded gap-2">
              <button className="btn py-0 flex items-center gap-2 bg-transparent">
                Likes 10
              </button>
              |
              <button className="btn py-0 bg-transparent border-0" title="Dislike">
                Dislikes 10
              </button>
            </div>
            <div>
              <button className="btn bg-transparent border-0">
                Button
              </button>
            </div>
          </div>
        </div>
    </div>
   );
};

export default Content;