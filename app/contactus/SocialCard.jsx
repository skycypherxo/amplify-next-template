import { FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const SocialCard = (props) => {
  return (
    <div className="xl:w-[450px] lg:w-[350px]">
      <p className="font-semibold tracking-wider border-b-4 mb-3">
        {props.title}
      </p>
      <div className="flex items-center mb-3">
        <FaInstagram size={30} className="mr-2" />
        <p>@{props.insta}</p>
      </div>
      <div className="flex items-center mb-3">
        <FaXTwitter size={30} className="mr-2"/>
        <p>@{props.twitter}</p>
      </div>
      <div className="flex items-center mb-3">
      <FaYoutube size={30} className="mr-2"/>
        <p>{props.youtube}</p>
      </div>
    </div>
  );
};

export default SocialCard;
