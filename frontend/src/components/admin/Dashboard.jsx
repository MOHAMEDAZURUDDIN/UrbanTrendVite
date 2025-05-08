import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { getAdminProducts } from "../../actions/productActions";
import { getUsers } from "../../actions/userActions";
import { adminOrders as adminOrdersAction } from "../../actions/orderActions";
import Sidebar from "./Sidebar";
import DashboardItem from "./DashboardItem";

export default function Dashboard() {
  const { products = [] } = useSelector((state) => state.productsState);
  const { adminOrders = [] } = useSelector((state) => state.orderState);
  const { users = [] } = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  let outOfStock = 0;

  if (products.length > 0) {
    products.forEach((product) => {
      if (product.stock === 0) {
        outOfStock = outOfStock + 1;
      }
    });
  }

  let totalAmount = 0;
  if (adminOrders.length > 0) {
    adminOrders.forEach((order) => {
      totalAmount += order.totalPrice;
    });
  }

  totalAmount = totalAmount.toFixed(2);

  useEffect(() => {
    dispatch(getAdminProducts);
    dispatch(getUsers);
    dispatch(adminOrdersAction);
  }, [dispatch]);

  return (
    <div className="flex min-h-screen">
      <div className="mt-20">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden mt-20">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-semibold text-gray-700">Dashboard</h1>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                <DashboardItem
                  bgColor="bg-blue-500"
                  title="Total Amount"
                  value={`$${totalAmount}`}
                />

                <DashboardItem
                  bgColor="bg-green-600"
                  title="Products"
                  value={products.length}
                  link="/admin/products"
                />

                <DashboardItem
                  bgColor="bg-yellow-500"
                  title="Orders"
                  value={adminOrders.length}
                  link="/admin/orders"
                />

                <DashboardItem
                  bgColor="bg-indigo-600"
                  title="Users"
                  value={users.length}
                  link="/admin/users"
                />

                <DashboardItem
                  bgColor="bg-red-600"
                  title="Out of Stock"
                  value={outOfStock}
                />
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
