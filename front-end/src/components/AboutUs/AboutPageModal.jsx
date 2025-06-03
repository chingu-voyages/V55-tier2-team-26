import { FaWandMagicSparkles } from "react-icons/fa6";
import CloseModalIcon from "./CloseModalIcon";

export default function AboutPageModal({ handleOnCloseModal, ...props }) {
  return (
    <dialog className="max-w-svw w-svw max-h-svh h-svh" {...props}>
      <section className="relative">
        <img 
          src="../images/about-modal.jpg" 
          alt="Two blue chairs in front of a bookshelf full of books" 
          className="h-auto w-full"
        />
        <span className="absolute right-0 top-0 size-10">
          <CloseModalIcon onClose={handleOnCloseModal} tailwindFillColor="fill-[#1F1F1FD9]"/>
        </span>
      </section>

      <section className="px-4">
        <img 
          src="../images/logo-placeholder.png" 
          alt="Resourcery logo" 
          className="h-auto w-1/2 mx-auto mt-3"
        />
        <h1 className="text-center font-bold text-xl">Welcome to Resourcery</h1>
        <hr className="border-t-4 border-[#998675] my-4 rounded"/>
        <p className="mb-5">In today's fast-paced tech world, finding the right resource can feel like looking for a needle in a haystack. That's why we built Resourcery, a tool created by and for developers in the Chingu community.</p>
        <p className="mb-5">Here, you can search through hand-picked technical resources shared in the #resource-treasures channel on Discord. Whether you're diving into JavaScript, exploring DevOps, or learning more about AI, Resourcery helps you find exactly what you need to level up.</p>
        <h2 className="text-center font-semibold mt-10 mb-4 text-lg">Features</h2>
        <ul>
          <li className="flex items-start gap-3 mb-2">
            <FaWandMagicSparkles className="mt-1 flex-shrink-0"/> 
            Use powerful features to search by tags or keywords.
          </li>
          <li className="flex items-start gap-3 mb-2">
            <FaWandMagicSparkles className="mt-1 flex-shrink-0"/> 
            Discover articles, videos, and tools curated by real devs.
          </li>
          <li className="flex items-start gap-3">
            <FaWandMagicSparkles className="mt-1 flex-shrink-0"/> 
            <div>
              Ask our magical built-in AI assistant questions like: 
              <span className="font-bold">"What topics can I explore here?"</span> 
              or 
              <span className="font-bold">"How do I search by author?"</span>
            </div>
          </li>
        </ul>
        <p className="mt-5 ml-1 mr-1 text-center font-semibold">All curated. All searchable. All in one place. Let Resourcery help you find your next great learning moment.</p>
      </section>

      <section className="bg-[#EDE1D4]">
        <h3 className="text-center font-semibold pt-5 mt-10 text-lg">Credits</h3>
        <hr className="ml-4 mr-4 border-t-4 border-[#998675] my-4 mt-1 rounded"/>
        
        <div className="credits-grid grid grid-cols-2 gap-4 px-6 pb-5 [&_h4]:font-semibold [&_h4]:mb-2">
          <div className="credits-column">
            <h4>Developers</h4>
            <ul>
              <li>- Bryan Hoyem</li>
              <li>- Kristin Dailey</li>
              <li>- Matthew Neie</li>
              <li>- Steven Rubio Perez</li>
            </ul>
          </div>

          <div className="credits-column ml-4">
            <h4>Designer</h4>
            <ul>
              <li>- Jessica Hackett</li>
            </ul>
          </div>

          <div className="credits-column">
            <h4>Product Owner</h4>
            <ul>
              <li>- Xochitl Farias</li>
            </ul>
          </div>

          <div className="credits-column ml-4">
            <h4>Scrum Masters</h4>
            <ul>
              <li>- Mikala Franks</li>
              <li>- Oghenerukevwe Egbaivwie</li>
            </ul>
          </div>
        </div>
      </section>
    </dialog>
  );
}
