import favicon from "../assets/favicon.svg";
const links = [
  { name: "Home", href: "#" },
  { name: "App", href: "#" },
  { name: "Account", href: "#" },
  { name: "Export", href: "#" },
];
export default function NavBar() {
  const NavBarLinks = links.map((link) => {
    return <li key={link.name}>{link.name}</li>;
  });
  return (
    <>
      <nav>
        <div className="flex max-w-7xl items-center bg-[#F9FAFB] w-full justify-between py-1 mt-2 border px-4 rounded-md mx-auto">
          <div>
            <img src={favicon} className="h-14" />
          </div>

          <div className="hidden md:block">
            <ul className="flex gap-4 text-gray-500 font-medium">
              {NavBarLinks}
            </ul>
          </div>

          <div className="px-6 py-2 bg-teal-600 text-white w-fit rounded-md">
            Get App
          </div>
        </div>
      </nav>
    </>
  );
}
