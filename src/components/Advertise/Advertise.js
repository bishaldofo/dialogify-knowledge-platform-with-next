import Image from "next/image";

const Advertise = () => {
   return (
      <div className="sticky top-20 w-full md:w-[250px]">
         <div className="p-4 bg-white rounded-sm">
            <div className="mb-5">
               <Image width={600} height={600} className="w-full" src="https://i.ibb.co/qgbmvxm/images-1.jpg" alt="Ads"></Image>
            </div>

            <div className="">
               <Image width={600} height={600} className="w-full" src="https://i.ibb.co/G7mT1M1/download.jpg" alt="Ads"></Image>
            </div>
         </div>
      </div>
   );
};

export default Advertise;