import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = ({ handleOpenModal, className }) => {
  return (
    <>
      <div className={`w-full flex items-start text-center justify-between p-4 bg-[#998675] ${className}`}>
        <div className="flex items-center text-center ml-3 sm:ml-4 md:ml-6">
          <a
            href={"https://github.com/chingu-voyages/V55-tier2-team-26"}
            className="mr-2 md:mr-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub 
              className="text-[#2E4057] text-3xl sm:text-4xl md:text-4xl hover:text-[#222222] transition-colors"
              style={{
                filter: "drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.16))",
                opacity: 1
              }} 
            />
          </a>
        </div>
        <div className="hidden xl:grid xl:gap-6 xl:mx-auto text-left mt-5" style={{gridTemplateColumns: "auto 1fr 1fr 1fr 1.2fr"}}>
          <div>
            <h3 className="text-2xl font-syne font-medium ml-10 mr-4">Credits:</h3>
          </div>
          <div>
            <h3 className="mb-2 font-syne text-xl">
              Developers
            </h3>
            <div className="flex items-center mb-2 text-base">
              <p className="mr-2 font-inter">- Bryan Hoyem</p>
              <a
                href={"https://github.com/bhoyem"}
                className="mr-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href={"https://www.linkedin.com/in/bryanhoyem/"}
                className="mr-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
            <div className="flex items-center mb-2 text-base">
              <p className="mr-2 font-inter">- Kristin Dailey</p>
              <a
                href={"https://github.com/kristindailey"}
                className="mr-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href={"https://linkedin.com/in/kristin-dailey/"}
                className="mr-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
            <div className="flex items-center mb-2 text-base">
              <p className="mr-2 font-inter">- Matthew Neie</p>
              <a
                href={"https://github.com/MatthewNeie"}
                className="mr-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href={"https://www.linkedin.com/in/matthew-neie/"}
                className="mr-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
            <div className="flex items-center text-base">
              <p className="mr-2 font-inter">- Steven Rubio Perez</p>
              <a
                href={"https://github.com/Stevensauro?tab=repositories"}
                className="mr-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href={"https://www.linkedin.com/in/steverp/"}
                className="mr-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
          <div className="-ml-7">
            <h3 className="mb-2 font-syne text-xl">
              Designer
            </h3>
            <div className="flex items-center text-base">
              <p className="mr-2 font-inter">- Jessica Hackett</p>
              <a
                href={"https://github.com/mooglemoxie0018"}
                className="mr-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href={"https://www.linkedin.com/in/jessica-hackett-6725a4325/"}
                className="mr-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
          <div className="-ml-10">
            <h3 className="mb-2 font-syne text-xl">
              Product Owner
            </h3>
            <div className="flex items-center text-base">
              <p className="mr-2 font-inter">- Xochitl Farias</p>
              <a
                href={"https://github.com/xochfa"}
                className="mr-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href={"https://www.linkedin.com/in/xfarias-scrum-master/"}
                className="mr-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
          <div className="-ml-12">
            <h3 className="mb-2 font-syne text-xl">
              Scrum Masters
            </h3>
            <div className="flex items-center mb-2 text-base">
              <p className="mr-2 font-inter">- Mikala Franks</p>
              <a
                href={"https://github.com/mikalafranks"}
                className="mr-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href={"https://www.linkedin.com/in/mikala-franks-8b21b52a3/"}
                className="mr-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
            <div className="flex items-center text-base">
              <p className="mr-2 font-inter">- Oghenerukevwe Egbaivwie</p>
              <a
                href={"https://github.com/Ruky-Ericson"}
                className="mr-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href={"https://www.linkedin.com/in/oghenerukevwe-egbaivwie/"}
                className="mr-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center text-center">
          <button
            onClick={handleOpenModal}
            className="hover:cursor-pointer whitespace-pre-line font-inter font-semibold text-xs sm:text-sm md:text-sm xl:text-base hover:font-bold transition-all"
            style={{
                textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                opacity: 1
              }} 
          >
            About{"\n"}Resourcery
          </button>
        </div>
      </div>
    </>
  );
};

export default Footer;
