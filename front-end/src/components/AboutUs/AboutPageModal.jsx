import { FaWandMagicSparkles } from "react-icons/fa6";
import CloseModalIcon from "./CloseModalIcon";

export default function AboutPageModal({ handleOnCloseModal, ...props }) {
  return (
    <dialog className="max-w-svw w-svw max-h-svh h-svh" {...props}>
      <section id="modal-header" className="relative">
        <img 
          src="../images/about-modal.jpg" 
          alt="Two blue chairs in front of a bookshelf full of books" 
          className="h-auto w-full"
        />
        <span className="absolute right-0 top-0 size-10">
          <CloseModalIcon onClose={handleOnCloseModal} tailwindFillColor="fill-[#1F1F1FD9]"/>
        </span>
      </section>

      <section id="modal-body">
        <img 
          src="../images/logo-placeholder.png" 
          alt="Resourcery logo" 
          className="h-auto w-1/2 mx-auto mt-3"
        />
        <h1 className="text-center font-bold">Welcome to Resourcery</h1>
        <p>In today's fast-paced tech world, finding the right resource can feel like looking for a needle in a haystack. That's why we built Resourcery, a tool created by and for developers in the Chingu community.</p>
        <p>Here, you can search through hand-picked technical resources shared in the #resource-treasures channel on Discord. Whether you're diving into JavaScript, exploring DevOps, or learning more about AI, Resourcery helps you find exactly what you need to level up.</p>
        <h2 className="text-center font-semibold">Features</h2>
        <ul>
          <li><FaWandMagicSparkles />Use powerful features to search by tags or keywords.</li>
          <li><FaWandMagicSparkles />Discover articles, videos, and tools curated by real devs.</li>
          <li><FaWandMagicSparkles />Ask our magical built-in AI assistant questions like: "What topics can I explore here?" or "How do I search by author?"</li>
        </ul>
        <p>All curated. All searchable. All in one place. Let Resourcery help you find your next great learning moment.</p>
      </section>

      <section id="modal-footer">
        <h3 className="text-center font-semibold">Credits</h3>
        <h4>Developers</h4>
        <ul>
          <li>Bryan Hoyem</li>
          <li>Kristin Dailey</li>
          <li>Matthew Neie</li>
          <li>Steven Rubio Perez</li>
        </ul>
        <h4>Product Owner</h4>
        <ul>
          <li>Xochitl Farias</li>
        </ul>
        <h4>Designer</h4>
        <ul>
          <li>Jessica Hackett</li>
        </ul>
        <h4>Scrum Masters</h4>
        <ul>
          <li>Mikala Franks</li>
          <li>Oghenerukevwe Egbaivwie</li>
        </ul>
      </section>
    </dialog>
  );
}
