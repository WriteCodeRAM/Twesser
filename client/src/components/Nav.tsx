import Link from "next/link";
const Nav = () => {
  return (
    <nav className="flex justify-center">
      <Link href={"/"}>
        <h1 className="text-dark-gray font-madimi font-bold text-3xl py-2 px-4">
          Twesser
        </h1>
      </Link>
    </nav>
  );
};

export default Nav;
