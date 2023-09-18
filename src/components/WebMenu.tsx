import { Link } from "react-router-dom";

function WebMenu({ navLinks }) {
  return (
    <div className="hidden sm:block">
        <div className="bg-white text-forrest border border-forrest rounded-full px-5 py-3 gap-6 items-center flex shadow-md">
        { navLinks.map(({text, path }, index) => {
            return (
                <>
                    <Link className="hover:text-limeCream cursor-pointer" key={index} to={path}>{text}</Link>
                </>
            );
            })} 
        </div>
    </div>
  )
}

export default WebMenu