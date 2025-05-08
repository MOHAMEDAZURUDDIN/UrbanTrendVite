import React, { Fragment, useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillTrash3Fill } from "react-icons/bs";
import { deleteReview, getReviews } from "../../actions/productActions";
import { clearError, clearReviewDeleted } from "../../slices/productSlice";
import Loader from "../layouts/Loader";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import { useTable } from "react-table";

export default function ReviewList() {
  const {
    reviews = [],
    loading = true,
    error,
    isReviewDeleted,
  } = useSelector((state) => state.productState);
  const [productId, setProductId] = useState("");
  const dispatch = useDispatch();

  const deleteHandler = useCallback((e, id) => {
    e.target.disabled = true;
    dispatch(deleteReview(productId, id));
  }, [dispatch, productId]);

  const data = useMemo(() => {
    return reviews.map((review) => ({
      id: review._id,
      rating: review.rating,
      user: review.user.name,
      comment: review.comment,
      actions: (
        <div>
          <button
            onClick={(e) => deleteHandler(e, review._id)}
            className="text-red-500"
          >
            <BsFillTrash3Fill />
          </button>
        </div>
      ),
    }));
  }, [reviews, deleteHandler]);

  const columns = useMemo(() => {
    return [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Rating",
        accessor: "rating",
      },
      {
        Header: "User",
        accessor: "user",
      },
      {
        Header: "Comment",
        accessor: "comment",
      },
      {
        Header: "Actions",
        accessor: "actions",
      },
    ];
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getReviews(productId));
  };

  useEffect(() => {
    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }
    if (isReviewDeleted) {
      toast("Review Deleted Successfully!", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearReviewDeleted()),
      });
      dispatch(getReviews(productId));
    }
  }, [dispatch, error, isReviewDeleted, productId]);

  return (
    <>
      <div className="bg-black clip-path h-[65vh] lg:h-[75vh] md:h-[45vh] sm:h-[25vh] w-auto absolute top-0 left-0 right-0 opacity-90 z-10 "></div>

      <div className={`relative opacity-100 z-20 font-montserrat text-pale-blue px-4 min-h-screen`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="col-span-1 md:col-span-2 mt-24">
            <Sidebar />
          </div>
          <div className="col-span-1 md:col-span-10">
            <h1 className="text-4xl font-semibold my-4 text-center">
              <span className="text-coral-red">Review</span> List
            </h1>
            <div className=" flex justify-center mt-5">
              <div className="w-64">
                <form onSubmit={submitHandler}>
                  <div className="mb-4">
                    <label className="block text-rose-800 text-lg font-medium text-center">
                      Product ID
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setProductId(e.target.value)}
                      value={productId}
                      className="bg-slate-500 w-full mt-1 px-2 py-1 border-black rounded-md shadow-sm text-black"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full px-4 py-3 mb-4 font-semibold rounded-md bg-gradient-to-t from-yellow-500 to-slate-800 via-slate-900 hover:scale-105 duration-300`}
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>
            <Fragment>
              {loading ? (
                <Loader />
              ) : (
                <div className="bg-slate-700 overflow-x-auto max-w-full ">
                  <table
                    {...getTableProps()}
                    className={`min-w-full table-auto md:table-fixed border-2 border-t-2 border-slate-900`}
                  >
                    <thead>
                      {headerGroups.map((headerGroup) => (
                        <tr
                          {...headerGroup.getHeaderGroupProps()}
                          className={`border-b-2 border-black`}
                        >
                          {headerGroup.headers.map((column) => (
                            <th
                              {...column.getHeaderProps()}
                              className={`border-r-2 border-black p-2`}
                            >
                              {column.render("Header")}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                      {rows.map((row) => {
                        prepareRow(row);
                        return (
                          <tr
                            {...row.getRowProps()}
                            className={`border-b border-black p-2`}
                          >
                            {row.cells.map((cell) => {
                              return (
                                <td
                                  {...cell.getCellProps()}
                                  className={`border-r-2 border-black p-2 text-center`}
                                >
                                  {cell.render("Cell")}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </Fragment>
          </div>
        </div>
      </div>
    </>
  );
}
