import React, { useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import { deleteProduct, getAdminProducts } from "../../actions/productActions";
import { clearError, clearProductDeleted } from "../../slices/productSlice";
import Loader from "../layouts/Loader";
import { useTable } from "react-table";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";

export default function ProductList() {
  const {
    products = [],
    loading = true,
    error,
  } = useSelector((state) => state.productsState);
  const { isProductDeleted, error: productError } = useSelector(
    (state) => state.productState
  );
  const dispatch = useDispatch();

  const deleteHandler = useCallback((e, id) => {
    e.target.disabled = true;
    dispatch(deleteProduct(id));
  }, [dispatch]);

  const data = useMemo(
    () =>
      products.map((product) => ({
        id: product._id,
        name: product.name,
        price: `$${product.price}`,
        stock: product.stock,
        actions: (
          <div className="flex items-center justify-center">
            <Link
              to={`/admin/product/${product._id}`}
              className="mr-2 text-white-400"
            >
              <BsPencilFill />
            </Link>
            <button
              onClick={(e) => deleteHandler(e, product._id)}
              className="text-red-500"
            >
              <BsFillTrash3Fill />
            </button>
          </div>
        ),
      })),
    [products, deleteHandler]
  );

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Stock",
        accessor: "stock",
      },
      {
        Header: "Actions",
        accessor: "actions",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  useEffect(() => {
    if (error || productError) {
      toast(error || productError, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }
    if (isProductDeleted) {
      toast("Product Deleted Succesfully!", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearProductDeleted()),
      });
      return;
    }

    dispatch(getAdminProducts());
  }, [dispatch, error, isProductDeleted, productError]);

  return (
    <>
      <div className="bg-black clip-path h-[65vh] lg:h-[75vh] md:h-[45vh] sm:h-[25vh] w-auto absolute top-0 left-0 right-0 opacity-90 z-10 "></div>

      <div className={`relative opacity-100 z-20 font-montserrat text-white-400 px-4 min-h-screen`}>
        <div className=" grid grid-cols-1 md:grid-cols-12 gap-4 mt-20 ">
          <div className="col-span-1 md:col-span-2">
            <Sidebar />
          </div>
          <div className="col-span-1 md:col-span-10 mb-4 ">
            <h1 className="px-4 py-2 text-4xl font-bold text-center font-palanquin ">
              <span className="text-coral-red ">Product</span> List
            </h1>
            {loading ? (
              <Loader />
            ) : (
              <div className=" bg-slate-700 overflow-x-auto text-pale-blue mt-10 sm:mt-40">
                <table
                  {...getTableProps()}
                  className={`min-w-full table-auto md:table-fixed border-2 border-t-2 border-black`}
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
          </div>
        </div>
      </div>
    </>
  );
}
