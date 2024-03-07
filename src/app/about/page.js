import Navbar from '@/components/Navbar/Navbar';
import Footer from "@/components/Footer/Footer";
import Image from "next/image";

const aboutPage = () => {
    return (
        <div className="">
            <div className="bg-[#FF4500] flex flex-col md:flex-row gap-5 items-center justify-center py-20">
                <div className="max-w-3xl flex gap-6 items-center">
                    <div className="w-1/2">
                        <Image src="https://i.ibb.co/FnT729k/community.jpg" alt="community image"
                            height={600}
                            width={600}
                        />
                    </div>
                    <div className="w-1/2 space-y-4">
                        <h1 className="text-3xl text-white font-bold">Community Building</h1>
                        <p className="text-base text-white">Join us in building a community where your voice matters. Whether you are here to share your expertise, learn from others, or simply connect with like-minded individuals, Dilogify is your platform to engage and grow.</p>

                    </div>
                </div>
            </div>

            <div className="flex gap-5 flex-col md:flex-row items-center justify-center py-20">
                <div className="max-w-3xl flex gap-6 items-center">
                    <div className="w-1/2 space-y-4">
                        <h1 className="text-3xl text-right text-black font-bold">Our Mission</h1>
                        <p className="text-base text-right text-black">Our mission is to provide a space for open and respectful dialogue. We strive to create an inclusive environment
                        where users can express themselves, learn from others, and engage in conversations that matter.</p>

                    </div>
                    <div className="w-1/2">
                        <Image src="https://i.ibb.co/XFk3fXH/mission.png" alt="community image"
                            height={600}
                            width={600}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-[#FF4500] flex flex-col md:flex-row gap-5 items-center justify-center py-20">
                <div className="max-w-3xl flex gap-6 items-center">
                    <div className="w-1/2">
                        <Image src="https://i.ibb.co/R055qmB/security.jpg" alt="community image"
                            height={600}
                            width={600}
                        />
                    </div>
                    <div className="w-1/2 space-y-4">
                        <h1 className="text-3xl text-white font-bold">Privacy and Security</h1>
                        <p className="text-base text-white">Your privacy and security are our top priorities. We implement robust measures to safeguard your data, ensuring you can freely express yourself without concerns.</p>

                    </div>
                </div>
          </div>
          <Footer/>
        </div>
    );

};

export default aboutPage;