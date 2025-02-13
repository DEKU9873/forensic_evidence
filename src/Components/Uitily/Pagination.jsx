import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({pageCount, onPress}) => {
  const handlePageClick = (data) => {
    onPress(data.selected + 1);
  };
 
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="التالي"
      onPageChange={handlePageClick}
      marginPagesDisplayed={2}
      pageRangeDisplayed={2}
      pageCount={pageCount}
      previousLabel="السابق"
      containerClassName="flex justify-center items-center gap-2 p-6 font-arabic"
      pageClassName="rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
      pageLinkClassName="px-4 py-2.5 text-gray-600 font-medium block hover:bg-gradient-to-r from-blue-50 to-blue-100"
      previousClassName="rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
      nextClassName="rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
      previousLinkClassName="px-5 py-2.5 text-blue-600 font-bold block bg-blue-50 hover:bg-blue-100 transition-colors duration-300"
      nextLinkClassName="px-5 py-2.5 text-blue-600 font-bold block bg-blue-50 hover:bg-blue-100 transition-colors duration-300"
      breakClassName="rounded-lg overflow-hidden"
      breakLinkClassName="px-4 py-2.5 text-gray-400 font-medium block"
      activeClassName="bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-200"
      activeLinkClassName="text-white hover:bg-transparent"
      disabledClassName="opacity-50 cursor-not-allowed"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
