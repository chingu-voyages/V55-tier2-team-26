import CloseModalIcon from "./CloseModalIcon";

export default function AboutPageModal({ handleOnCloseModal, ...props  }) {
  return (
    <dialog className="max-w-svw w-svw max-h-svh h-svh" {...props}>
      <section id="modal-header" className="relative h-20">
        <img id="background-img">
        </img>
        <span className="absolute right-8 top-4 size-10">
          <CloseModalIcon onClose={handleOnCloseModal}/>
        </span>
      </section>
      <section id="modal-body">
        <h1 className="bg-amber-500 size-8">TEST ABOUT US</h1>
      </section>
      <section id="modal-footer"></section>
    </dialog>
  );
}
