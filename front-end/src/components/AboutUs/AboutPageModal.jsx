import CloseModalIcon from "./CloseModalIcon";

export default function AboutPageModal({ handleOnCloseModal, ...props }) {
  return (
    <dialog className="max-w-svw w-svw max-h-svh h-svh" {...props}>
      <section id="modal-header" className="relative h-20">
        <img id="background-img">
        </img>
        <span className="absolute right-8 top-4 size-10">
          <CloseModalIcon onClose={handleOnCloseModal} tailwindFillColor="fill-black"/>
        </span>
      </section>
      <section id="modal-body">
        <img></img>
        <img></img>
        <h1 className="bg-amber-500 size-8">Welcome to Resourcery</h1>
        <p>In today's fast-paced tech world, finding the right resource can feel like looking for a needle in a haystack. That's why we built Resourcery, a tool created by and for developers in the Chingu community.</p>
        <p>Here, you can search through hand-picked technical resources shared in the #resource-treasures channel on Discord. Whether you're diving into JavaScript, exploring DevOps, or learning more about AI, Resourcery helps you find exactly what you need to level up.</p>
        <h2>Features</h2>
        <ul>
          <li>Use powerful features to search by tags or keywords.</li>
          <li>Discover articles, videos, and tools curated by real devs.</li>
          <li>Ask our magical built-in AI assistant questions like: "What topics can I explore here?" or "How do I search by author?"</li>
        </ul>
        <p>All curated. All searchable. All in one place. Let Resourcery help you find your next great learning moment.</p>
      </section>
      <section id="modal-footer">
        <h3>Credits</h3>
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
