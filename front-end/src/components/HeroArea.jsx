import logoImg from "../../images/logo-placeholder.png"

export default function HeroArea() {
  return (
    <div className="flex flex-col items-center text-center bg-[#EDE0D4] text-black">
      <div className="flex justify-center max-w-[200px] pt-14 pb-8">
        <img src={logoImg} className="h-auto w-full max-w-[200px] rounded-full"/>
      </div>
      <h1 className="text-[30px] font-semibold">Resourcery</h1>
      <h3 className="text-[14px] italic">Collected knowledge for tech professionals</h3>
    </div>
  );
}
