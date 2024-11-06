import { assets } from "../assets/frontend_assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import Title from "../components/Title";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
   
   <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img  className="w-full md:max-w-[480px]" src={assets.contact_img} alt="" />
        <div className="flex flex-col justify-center items-start gap-6">
     <p className="font-semibold text-xl text-gray-600">Our Store</p>
     <p className="text-gray-600">Mayur Vihar  <br /> Delhi, India </p>
     <p className="text-gray-600">Tel:8076628*** <br />Email: abhaysingh80766@gmail.com</p>
     <p className="font-semibold text-xl text-gray-600">Carrers At UrbanAura</p>
     <p className="text-gray-600">Learn More About Our Teams And Job Openings </p>
  <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">Explore Jobs </button>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  );
};

export default Contact;