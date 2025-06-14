import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = ({ handleOpenModal, className }) => {
  return (
    <>
      <div className={`w-full flex items-center text-center justify-between p-4 border-solid border-2 border-gray-400 rounded-md bg-[#998675] text-[14px] sm:text-[14px] md:flex-row md:text-[12px] lg:text-[16px] xl:text-[18px] ${className}`}>
        <div className="flex items-center text-center ml-0 sm:ml-10 md:ml-2 md:w-40 lg:w-60 xl:ml-5 2xl:ml-10">
          <a
            href={"https://github.com/chingu-voyages/V55-tier2-team-26"}
            className="mr-2 md:mr-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-[50px] sm:text-[50px] md:text-4xl" />
          </a>
        </div>
        <div className="hidden xl:block items-top text-left justify-between xl:w-full xl:flex xl:flex-row xl:w-240 xl:mr-5 2xl:w-260 2xl:mr-10">
          <div>
            <h1 className="underline text-[9px] mb-2 sm:mb-4 sm:text-[10px] md:text-[9px] lg:text-[12px]">
              Scrum Masters
            </h1>
            <div className="flex items-center text-center">
              <p className="mb-2 mr-2 sm:mb-3">Mikala Franks</p>
              <a
                href={"https://github.com/mikalafranks"}
                className="mb-2 sm:mb-3 mr-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href={"https://www.linkedin.com/in/mikala-franks-8b21b52a3/"}
                className="mb-2 sm:mb-3 mr-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
            <div className="flex items-center text-center">
              <p className="mb-4 sm:mb-0 mr-2">Oghenerukevwe Egbaivwie</p>
              <a
                href={"https://github.com/Ruky-Ericson"}
                className="mb-4 sm:mb-0 mr-2"
              >
                <FaGithub />
              </a>
              <a
                href={"https://www.linkedin.com/in/oghenerukevwe-egbaivwie/"}
                className="mb-4 sm:mb-0 mr-2"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
          <div>
            <h1 className="underline text-[9px] mb-2 sm:mb-4 md:text-[9px] lg:text-[12px]">
              Product Owner
            </h1>
            <div className="flex items-center text-center">
              <p className="mb-4 sm:mb-0 mr-2">Xochitl Farias</p>
              <a
                href={"https://github.com/xochfa"}
                className="mb-4 sm:mb-0 mr-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href={"https://www.linkedin.com/in/xfarias-scrum-master/"}
                className="mb-4 sm:mb-0 mr-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
          <div>
            <h1 className="underline text-[9px] mb-2 sm:mb-4 md:text-[9px] lg:text-[12px]">
              UX/UI Designer
            </h1>
            <div className="flex items-center text-center">
              <p className="mb-4 sm:mb-0 mr-2">Jessica Hackett</p>
              <a
                href={"https://github.com/mooglemoxie0018"}
                className="mb-4 sm:mb-0 mr-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href={"https://www.linkedin.com/in/jessica-hackett-6725a4325/"}
                className="mb-4 sm:mb-0 mr-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
          <div>
            <h1 className="underline text-[9px] mb-2 sm:mb-4 md:text-[9px] lg:text-[12px]">
              Developers
            </h1>
            <div className="flex items-center text-center">
              <p className="mb-2 mr-2 sm:mb-3">Bryan Hoyem</p>
              <a
                href={"https://github.com/bhoyem"}
                className="mb-3 mr-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href={"https://www.linkedin.com/in/bryanhoyem/"}
                className="mb-3 mr-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
            <div className="flex items-center text-center">
              <p className="mb-2 mr-2 sm:mb-3">Kristin Dailey</p>
              <a
                href={"https://github.com/kristindailey"}
                className="mb-3 mr-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href={"https://linkedin.com/in/kristin-dailey/"}
                className="mb-3 mr-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
            <div className="flex items-center text-center">
              <p className="mb-2 mr-2 sm:mb-3">Matthew Neie</p>
              <a
                href={"https://github.com/MatthewNeie"}
                className="mb-3 mr-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href={"https://www.linkedin.com/in/matthew-neie/"}
                className="mb-3 mr-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
            <div className="flex items-center text-center">
              <p className="mb-4 sm:mb-0 mr-2">Steven Rubio Perez</p>
              <a
                href={"https://github.com/Stevensauro?tab=repositories"}
                className="mb-4 sm:mb-0 mr-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href={"https://www.linkedin.com/in/steverp/"}
                className="mb-4 sm:mb-0"
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
            className="hover:cursor-pointer whitespace-pre-line font-bold"
          >
            About{"\n"}Resourcery
          </button>
        </div>
      </div>
    </>
  );
};

export default Footer;
