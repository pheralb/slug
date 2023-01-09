import { BiLinkExternal } from "react-icons/bi";
import { BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="fixed bottom-0 mt-6 mb-6 w-full text-gray-500">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <p>⚡ Made by Pablo using</p>
          <div className="flex items-center space-x-1">
            <a href="https://create.t3.gg/" rel="noreferrer">T3 Stack</a>
            <BiLinkExternal size={12} />
          </div>
        </div>
        <a href="https://twitter.com/pheralb_" target="_blank" rel="noreferrer">
          <BsTwitter
            size={18}
            className="transition-colors duration-100 hover:text-white"
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
