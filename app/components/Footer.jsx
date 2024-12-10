import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="overflow-clip bg-gradient-to-b from-white to-[#124371] min-h-96 h-auto">
      <div className="flex justify-center items-center justify-around py-4">
        <p className="md:font-extrabold font-semibold xl:text-4xl lg:text-2xl md:text-xl text-base text-[#124371] md:w-1/5 w-1/4 md:text-left text-justify">
          MAHA CSR SUMMIT 2025
        </p>
        <p className="bg-[#3c6d97] font-semibold xl:text-4xl lg:text-2xl text-white text-center w-1/2 py-4">
          tagline/CTA/Footer Notes
        </p>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-1 md:justify-items-center px-8 py-4 text-xl text-white">
        <div className="xl:w-[400px] lg:w-[300px] md:w-[350px] md:text-xl text-base">
          <p className="font-semibold tracking-wider border-b-4 md:mb-3 mb-2 lg:text-left md:text-center">
            Social Links
          </p>
          <div className="flex items-center  mb-3">
          <FaInstagram />
            <p className=" w-full flex justify-center items-center">@shivam</p>
          </div>
          <div className="flex items-center mb-3">
          <FaXTwitter />
            <p className="w-full flex justify-center items-center">@shivam</p>
          </div>
          <div className="flex items-center mb-3">
          <FaYoutube />
            <p className="w-full flex justify-center items-center">shivam</p>
          </div>
        </div>
        <div className="xl:w-[400px] lg:w-[300px] md:w-[350px] lg:pb-4 lg:my-0 md:my-3 md:text-xl text-base">
          <p className="font-semibold tracking-wider border-b-4 md:mb-3 mb-1 lg:text-left md:text-center">
            Office Address
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
            aliquam enim praesentium ad{" "}
          </p>
          <p>Mumbai, Maharashtra, India</p>
        </div>
        <div className="xl:w-[400px] lg:w-[300px] md:w-[350px] md:text-xl text-base">
          <p className="font-semibold tracking-wider border-b-4 md:mb-3 mb-1 lg:pt-0 pt-2 lg:text-left md:text-center">
            For further Queries
          </p>
          <p className="mb-1">Email: shivam@gmail.com</p>
          <p className="mb-1">Tel: 123456789</p>
          <p className="mb-1">Tel: 123456789</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;