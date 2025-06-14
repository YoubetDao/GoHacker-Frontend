import Button from "./common/Button";

export default function Header() {
  return (
    <div className="border-b border-[#222222] py-2.5 px-10 fixed top-0 left-0 right-0 z-50 ">
      <div className="max-w-[1200px] h-10 flex justify-between mx-auto items-center text-white relative">
        <div className="text-xl font-bold">GoHacker</div>
        <div>
          <Button>Go to App</Button>
        </div>
      </div>
    </div>
  );
}
