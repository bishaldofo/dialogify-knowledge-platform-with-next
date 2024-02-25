import Navbar from '@/components/Navbar/Navbar';

import Image from "next/image";
import Contact from '@/components/Contacts/Contact';


const contactpage = () => {
    return (
        <div>
            <div className='shadow-md bg-white sticky top-0 z-50'>
                <Navbar/>
            </div>
            
            <div className='  ' >
                <div>
                    <Contact></Contact>
                </div>
            </div>
        </div>
    );
};

export default contactpage;
