import { useState } from "react";
import Logout from "./Logout";

function Header() {
  // const [searchInput, setSearchInput] = useState("");

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   if (onSearch) {
  //     onSearch(searchInput);
  //   }
  // };





  return (
    <header className="w-full bg-blue-600 p-4 flex items-center justify-between flex-wrap shadow-md">
      {/* Logo */}
      <h1 className="text-white text-xl font-bold">IB Chat App🔥</h1>

      {/* Search Bar */}
      {/* <form
        onSubmit={handleSearch}
        className="flex items-center bg-white rounded-lg overflow-hidden shadow-sm"
      >
        <input
          type="text"
          placeholder="Search user..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="px-3 py-2 outline-none w-60"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form> */}

      {/* Logout Button */}
      <Logout />
      
    </header>
  );
}

export default Header;
