import { Link } from "react-router-dom";

const SidebarItem = ({ to, icon, subItem = false }) => (
    <li className={`border-t ${subItem ? "ml-6" : ""}`}>
      <Link to={to} className="block py-2 px-6 text-white hover:bg-gray-700">
        {icon && <i className={icon}></i>}
        {subItem && <span className="ml-2">{to}</span>}
      </Link>
    </li>
  );
export default SidebarItem