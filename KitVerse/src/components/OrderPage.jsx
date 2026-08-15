import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Package,
  Clock,
  User,
  Phone,
  MapPin,
  CreditCard,
  Banknote,
  CheckCircle2,
  AlertCircle,
  Truck,
  XCircle,
  RefreshCw,
  Trash2,
  DollarSign,
  Boxes,
  Loader2,
  Calendar,
} from "lucide-react";
import { useSelector } from "react-redux";

const OrderPage = () => {
  const token = localStorage.getItem("token");
  const { user } = useSelector((state) => state.user);

  const isAdmin = user?.role === "admin";

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [updatingStatusId, setUpdatingStatusId] = useState(null);
  const [deletingOrderId, setDeletingOrderId] = useState(null);

  // =========================
  // FETCH ORDERS
  // =========================
  const fetchOrders = async () => {
    setLoading(true);
    setError("");

    try {
      if (!token) {
        setError("Authorization token missing. Please login again.");
        setLoading(false);
        return;
      }

      const endpoint = isAdmin
        ? `${import.meta.env.VITE_BACKEND_URL}/order/getAllOrders`
        : `${import.meta.env.VITE_BACKEND_URL}/order/getOrderById`;

      console.log("REQUEST URL:", endpoint);

      const res = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("ORDERS RESPONSE:", res.data);

      const fetchedList = res.data.orders || res.data.order || [];

      setOrders(
        Array.isArray(fetchedList) ? fetchedList : [fetchedList]
      );
    } catch (err) {
      console.error("Fetch Orders Error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load orders. Please make sure you are logged in."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [isAdmin]);

  // =========================
  // UPDATE ORDER STATUS
  // =========================
  const handleUpdateStatus = async (orderId, newStatus) => {
    setUpdatingStatusId(orderId);

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/order/updateOrderStatus/${orderId}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId
              ? {
                  ...order,
                  status: newStatus,
                }
              : order
          )
        );
      }
    } catch (err) {
      console.error("Update Status Error:", err);

      alert(
        err.response?.data?.message ||
          "Failed to update order status"
      );
    } finally {
      setUpdatingStatusId(null);
    }
  };

  // =========================
  // DELETE ORDER
  // =========================
  const handleDeleteOrder = async (orderId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order record?"
    );

    if (!confirmed) return;

    setDeletingOrderId(orderId);

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/order/deleteOrder/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setOrders((prev) =>
          prev.filter((order) => order._id !== orderId)
        );
      }
    } catch (err) {
      console.error("Delete Order Error:", err);

      alert(
        err.response?.data?.message ||
          "Failed to delete order"
      );
    } finally {
      setDeletingOrderId(null);
    }
  };

  // =========================
  // METRICS
  // =========================
  const totalRevenue = orders.reduce(
    (sum, order) =>
      sum + (parseFloat(order.totalPrice) || 0),
    0
  );

  const pendingCount = orders.filter(
    (order) =>
      (order.status || "Pending").toLowerCase() === "pending"
  ).length;

  const processingCount = orders.filter(
    (order) =>
      (order.status || "").toLowerCase() === "processing"
  ).length;

  const deliveredCount = orders.filter(
    (order) =>
      (order.status || "").toLowerCase() === "delivered"
  ).length;

  // =========================
  // STATUS BADGE
  // =========================
  const getStatusBadge = (status = "Pending") => {
    switch (status.toLowerCase()) {
      case "delivered":
        return {
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: <CheckCircle2 className="w-3.5 h-3.5" />,
        };

      case "shipped":
        return {
          bg: "bg-purple-50 text-purple-700 border-purple-200",
          icon: <Truck className="w-3.5 h-3.5" />,
        };

      case "processing":
        return {
          bg: "bg-blue-50 text-blue-700 border-blue-200",
          icon: (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ),
        };

      case "cancelled":
        return {
          bg: "bg-red-50 text-red-700 border-red-200",
          icon: <XCircle className="w-3.5 h-3.5" />,
        };

      default:
        return {
          bg: "bg-amber-50 text-amber-700 border-amber-200",
          icon: <Clock className="w-3.5 h-3.5" />,
        };
    }
  };

  // =========================
  // RENDER
  // =========================
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">

        {/* PAGE HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              <span>
                {isAdmin ? "Admin Dashboard" : "Customer Portal"}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <span>
                {isAdmin ? "Order Management" : "My Orders"}
              </span>

              <span className="bg-slate-200 text-slate-700 text-xs px-2.5 py-1 rounded-full font-semibold">
                {orders.length} Total
              </span>
            </h1>
          </div>

          <button
            onClick={fetchOrders}
            className="inline-flex items-center gap-2 text-sm font-semibold bg-white hover:bg-slate-100 text-slate-700 px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm transition self-start md:self-auto"
          >
            <RefreshCw
              className={`w-4 h-4 ${
                loading ? "animate-spin" : ""
              }`}
            />

            Refresh Orders
          </button>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          {/* Total Orders */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Boxes className="w-6 h-6" />
            </div>

            <div>
              <p className="text-xs text-slate-500 font-medium">
                Total Orders
              </p>

              <h3 className="text-2xl font-black text-slate-900">
                {orders.length}
              </h3>
            </div>
          </div>

          {/* Pending / Processing */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Clock className="w-6 h-6" />
            </div>

            <div>
              <p className="text-xs text-slate-500 font-medium">
                Pending / Processing
              </p>

              <h3 className="text-2xl font-black text-slate-900">
                {pendingCount + processingCount}
              </h3>
            </div>
          </div>

          {/* Delivered */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <p className="text-xs text-slate-500 font-medium">
                Delivered
              </p>

              <h3 className="text-2xl font-black text-slate-900">
                {deliveredCount}
              </h3>
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <DollarSign className="w-6 h-6" />
            </div>

            <div>
              <p className="text-xs text-slate-500 font-medium">
                {isAdmin ? "Total Revenue" : "Total Spent"}
              </p>

              <h3 className="text-2xl font-black text-slate-900">
                ${totalRevenue.toFixed(2)}
              </h3>
            </div>
          </div>
        </div>

        {/* ORDERS */}
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-3" />

            <p className="text-slate-500 text-sm font-medium">
              Loading orders...
            </p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl text-center max-w-lg mx-auto">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />

            <p className="font-semibold">{error}</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />

            <h3 className="text-lg font-bold text-slate-900 mb-1">
              No orders found
            </h3>

            <p className="text-slate-500 text-xs mb-4">
              No order records are available right now.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const statusObj = getStatusBadge(order.status);

              const orderIdShort = order._id
                ? `#ORD-${order._id
                    .substring(order._id.length - 6)
                    .toUpperCase()}`
                : "#ORDER";

              // Support both `items` and `products`
              const orderItems = order.items || order.products || [];

              return (
                <div
                  key={order._id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition hover:border-slate-300"
                >
                  {/* CARD HEADER */}
                  <div className="p-4 sm:p-6 bg-slate-50/50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">

                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl">
                        <Package className="w-5 h-5" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">

                          <span className="font-mono font-bold text-slate-900 text-base">
                            {orderIdShort}
                          </span>

                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-xs font-bold ${statusObj.bg}`}
                          >
                            {statusObj.icon}

                            {order.status || "Pending"}
                          </span>
                        </div>

                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3.5 h-3.5" />

                          {order.timeStamp
                            ? new Date(
                                order.timeStamp
                              ).toLocaleString()
                            : "Recent Order"}
                        </p>
                      </div>
                    </div>

                    <div className="text-right ml-auto sm:ml-0">
                      <span className="text-xs text-slate-400 block">
                        Total Amount
                      </span>

                      <span className="text-xl font-extrabold text-slate-900">
                        $
                        {parseFloat(
                          order.totalPrice || 0
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* BODY */}
                  <div className="p-4 sm:p-6 space-y-6">

                    {/* CUSTOMER INFO */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs">

                      <div className="space-y-1">
                        <span className="text-slate-400 font-medium flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-blue-500" />

                          Customer Name
                        </span>

                        <p className="font-bold text-slate-900 text-sm">
                          {order.userName ||
                            order.user?.name ||
                            "N/A"}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-slate-400 font-medium flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-blue-500" />

                          Contact Phone
                        </span>

                        <p className="font-semibold text-slate-900 text-sm">
                          {order.phone || "N/A"}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-slate-400 font-medium flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-blue-500" />

                          Delivery Address
                        </span>

                        <p
                          className="font-medium text-slate-800 truncate"
                          title={order.address}
                        >
                          {order.address || "N/A"}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-slate-400 font-medium flex items-center gap-1">
                          {order.paymentMethod === "Online" ? (
                            <CreditCard className="w-3.5 h-3.5 text-blue-500" />
                          ) : (
                            <Banknote className="w-3.5 h-3.5 text-emerald-500" />
                          )}

                          Payment Method
                        </span>

                        <p className="font-bold text-blue-600 text-sm">
                          {order.paymentMethod || "COD"}
                        </p>
                      </div>
                    </div>

                    {/* PRODUCTS */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                        Items Purchased ({orderItems.length})
                      </h4>

                      <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">

                        {orderItems.map((item, index) => {
                          const product =
                            item.product || {};

                          const productName =
                            item.title ||
                            item.productName ||
                            product.title ||
                            "Product";

                          const productImage =
                            item.image ||
                            product.image;

                          const productPrice =
                            item.price ||
                            product.price ||
                            0;

                          const quantity =
                            item.quantity || 1;

                          return (
                            <div
                              key={
                                item._id ||
                                product._id ||
                                index
                              }
                              className="p-3.5 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition"
                            >
                              <div className="flex items-center gap-3">

                                {/* IMAGE */}
                                <div className="w-12 h-12 bg-slate-100 rounded-lg border border-slate-200 overflow-hidden flex-shrink-0 p-1">
                                  {productImage ? (
                                    <img
                                      src={productImage}
                                      alt={productName}
                                      className="w-full h-full object-contain"
                                    />
                                  ) : (
                                    <Package className="w-6 h-6 text-slate-400 mx-auto my-2" />
                                  )}
                                </div>

                                {/* PRODUCT INFO */}
                                <div>
                                  <h5 className="text-sm font-bold text-slate-900 line-clamp-1">
                                    {productName}
                                  </h5>

                                  <span className="text-xs text-slate-400 font-medium">
                                    $
                                    {parseFloat(
                                      productPrice
                                    ).toFixed(2)}{" "}
                                    × {quantity}
                                  </span>
                                </div>
                              </div>

                              {/* ITEM TOTAL */}
                              <span className="font-extrabold text-slate-900 text-sm">
                                $
                                {(
                                  parseFloat(productPrice) *
                                  quantity
                                ).toFixed(2)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* FOOTER */}
                    <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">

                      {/* ADMIN STATUS */}
                      {isAdmin ? (
                        <div className="flex items-center gap-2 w-full sm:w-auto">

                          <span className="text-xs font-bold text-slate-600 whitespace-nowrap">
                            Update Status:
                          </span>

                          <select
                            value={
                              order.status || "Pending"
                            }
                            disabled={
                              updatingStatusId ===
                              order._id
                            }
                            onChange={(e) =>
                              handleUpdateStatus(
                                order._id,
                                e.target.value
                              )
                            }
                            className="text-xs font-semibold bg-slate-100 border border-slate-300 text-slate-800 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                          >
                            <option value="Pending">
                              Pending
                            </option>

                            <option value="Processing">
                              Processing
                            </option>

                            <option value="Shipped">
                              Shipped
                            </option>

                            <option value="Delivered">
                              Delivered
                            </option>

                            <option value="Cancelled">
                              Cancelled
                            </option>
                          </select>
                        </div>
                      ) : (
                        <div className="text-xs text-slate-400">
                          Order Status is managed by Shopify Admins.
                        </div>
                      )}

                      {/* DELETE */}
                      <button
                        onClick={() =>
                          handleDeleteOrder(order._id)
                        }
                        disabled={
                          deletingOrderId === order._id
                        }
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />

                        {deletingOrderId === order._id
                          ? "Deleting..."
                          : "Delete Order Record"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default OrderPage;