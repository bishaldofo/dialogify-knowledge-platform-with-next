import Navbar from '@/components/Navbar/Navbar';
import Contact from '@/components/Contacts/Contact';
import Footer from '@/components/Footer/Footer';


const contactpage = () => {
    return (
        <div>
            <div className='shadow-md bg-white sticky top-0 z-50'>
                <Navbar />
            </div>
            <div>
                <Contact/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
};

export default contactpage;
