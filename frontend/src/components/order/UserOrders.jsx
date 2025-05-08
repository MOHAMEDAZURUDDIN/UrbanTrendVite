import { useMemo, useEffect } from "react";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { userOrders as userOrdersAction } from "../../actions/orderActions";
import { Link } from "react-router-dom";
import { useTable } from "react-table";

export default function UserOrders() {
  const { userOrders = [] } = useSelector((state) => state.orderState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userOrdersAction);
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        Header: "Order ID",
        accessor: "id",
      },
      {
        Header: "No Of Items",
        accessor: "numOfItems",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Actions",
        accessor: "actions",
      },
    ],
    []
  );
  const data = useMemo(() => {
    return userOrders.map((userOrder) => ({
      id: <span className="text-black font-semibold">{userOrder._id}</span>,
      numOfItems: (
        <span className="text-black font-semibold">{userOrder.orderItems.length}</span>
      ),
      amount: <span className="text-red-500 font-semibold">{userOrder.totalPrice}</span>,
      status:
        userOrder.orderStatus && userOrder.orderStatus.includes("Delivered") ? (
          <p className="text-green-500 font-semibold">{userOrder.orderStatus}</p>
        ) : (
          <p className="text-black font-semibold">{userOrder.orderStatus}</p>
        ),
      actions: (
        <Link
          to={`/order/${userOrder._id}`}
          className="bg-white-400 text-black py-1 px-3 rounded hover:bg-red-500 "
        >
          <i className="fa fa-eye"></i>
        </Link>
      ),
    }));
  }, [userOrders]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <>
     <div className="bg-slate-900 clip-path h-[75vh] lg:h-[65vh] md:h-[55vh] sm:h-[35vh] w-auto absolute top-0 left-0 right-0 opacity-90 z-10"></div>

     <div className="min-h-screen relative opacity-100 z-20 grid items-center justify-items-center shoes-container">

  <div className="max-w-6xl mx-auto ">
    <MetaData title="My Orders" />
    <h1 className="text-3xl font-semibold text-center text-pale-blue ">
      My <span className="text-red-500">Orders</span>
    </h1>

    <div className="overflow-x-auto">
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
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className={`border-r-2 border-black p-2 text-center`}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
</div>
    </>
   
  );
}
