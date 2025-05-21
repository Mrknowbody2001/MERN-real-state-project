import React from "react";

const Search = () => {
  return (
    <div className="flex flex-col md:flex-row">
      {/* left side */}
      <div className="p-5 border-b-1 md:border-r-1 md:min-h-screen">
        <form className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Search Term:</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-5" />
              <span>Rent & Sale</span>
              
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-5" />
              <span>Rent</span> 
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-5" />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          {/* amenities  */}
          <div className="flex flex-wrap gap-2 mt-2">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking</span> 
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span> 
            </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <label className="font-semibold" >Sort:</label>
                <select id="sort_order" className="border-slate-500 rounded-lg p-3">
                  <option value="">Price high to low</option>
                  <option value="">Price low to high</option>
                  <option value="">Latest </option>
                  <option value="">Oldest</option>
                </select>
              </div>
            </div>
            <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">Search</button>
        </form>
      </div>
      {/* right side */}
      <div className="">
        <h1 className="font-semibold text-3xl  p-3 text-slate-700 mt-2">Listing Results</h1>
      </div>
    </div>
  );
};

export default Search;
