import logo from "/my_unsplash_logo.svg";
import { MdOutlineSearch } from "react-icons/md";

const Header = ({ setSearchTerm }) => {
  return (
    <header>
      <div className="header-left">
        <img src={logo} alt="logo" className="logo" />
        <div className="input-container">
          <MdOutlineSearch className="icon" />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search by name"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <button className="add">Add a photo</button>
    </header>
  );
};
export default Header;
