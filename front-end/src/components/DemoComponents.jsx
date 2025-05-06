import "./DemoComponent.css";

export default function DemoComponent() {
  return (
    <div className="w-md m-auto mt-20 flex flex-col gap-y-20"> {/*tailwind classes here too as an example*/}
      <div className="DivTestClassDemo DivTestClassDemoStyleOne">
        <h1>
          This is a demo component to showcase workflow with custom CSS style sheets
        </h1>
      </div>
      <div className="DivTestClassDemo DivTestClassDemoStyleTwo">
        <h1>
          This is a demo component to showcase workflow with custome CSS style sheets
        </h1>
      </div>
    </div>
  );
}
