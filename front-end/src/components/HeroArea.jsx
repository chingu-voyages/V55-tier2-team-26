import logoImg from "../../images/resourcery_logo.png";

export default function HeroArea() {
  return (
    <div className="flex flex-col items-center text-center bg-[#EDE0D4] text-black">
      <div className="flex justify-center pt-14 pb-3">
        <img src={logoImg} className="h-auto w-auto rounded-full"/>
      </div>
      <h1 className="font-syne font-bold text-3xl md:text-4xl">Resourcery</h1>
      <h3 className="font-inter text-lg md:text-xl font-light italic mt-3 mb-3">Collected knowledge for tech <br/> professionals</h3>
    </div>
  );
}
