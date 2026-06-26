import OrderItem from "../models/orderItemModel.js"
import Order from "../models/orderModel.js"

// Get all orders
export const getOrders = async (_, res) => {
  try {
    // Fetch orders and populate only selected user fields
    const orders = await Order.find().populate("user", "name email phone")

    // .find() always returns an array (empty if no results)
    if (!orders || orders.length === 0) {
      return res.status(404).json({
        message: "No orders found",
        success: false,
      })
    }

    res.status(200).json(orders)
  } catch (error) {
    console.log("Error in getOrders controller", error)
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    })
  }
}

// Get a single order by ID
export const getOrderById = async (req, res) => {
  try {
    // Populate user + nested populate for product inside each orderItem
    const order = await Order.findById(req.params.id)
      .populate("user", "name email phone")
      .populate({
        path: "orderItems",
        populate: { path: "product", populate: "category" },
      })

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        success: false,
      })
    }

    res.status(200).json(order)
  } catch (error) {
    console.log("Error in getOrderById controller", error)
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    })
  }
}

// Create a new order
export const createOrder = async (req, res) => {
  try {
    // First save all order items individually
    const orderItemsIds = await Promise.all(
      req.body.orderItems.map(async (orderItem) => {
        let newOrderItem = new OrderItem({
          quantity: orderItem.quantity,
          product: orderItem.product,
        })

        newOrderItem = await newOrderItem.save()
        return newOrderItem._id
      })
    )

    // Calculate total price for the order
    const perProductPrice = await Promise.all(
      orderItemsIds.map(async (orderItemId) => {
        const orderedItem = await OrderItem.findById(orderItemId).populate(
          "product",
          "price"
        )
        return orderedItem.quantity * orderedItem.product.price
      })
    )

    const totalPrice = perProductPrice.reduce((acc, curr) => acc + curr, 0)

    // Create new order
    const order = new Order({
      orderItems: orderItemsIds,
      shippingAddress1: req.body.shippingAddress1,
      shippingAddress2: req.body.shippingAddress2,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      status: req.body.status || "Pending",
      totalPrice: totalPrice,
      user: req.body.user,
    })

    const savedOrder = await order.save()

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: savedOrder,
    })
  } catch (error) {
    console.log("Error in createOrder controller", error)
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    })
  }
}

// Update order by ID (status update only)
export const updateOrderById = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true } // return updated document
    )

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Order not found",
        success: false,
      })
    }

    res.status(200).json({
      message: "Order updated successfully",
      success: true,
      order: updatedOrder,
    })
  } catch (error) {
    console.log("Error in updateOrderById controller", error)
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    })
  }
}

// Delete order by ID (also deletes related orderItems)
export const deleteOrderById = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id)

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        success: false,
      })
    }

    // Delete all orderItems linked to this order
    await Promise.all(
      order.orderItems.map(async (orderItemId) => {
        await OrderItem.findByIdAndDelete(orderItemId)
      })
    )

    return res.status(200).json({
      message: "Order and related order items deleted successfully",
      success: true,
    })
  } catch (error) {
    console.log("Error in deleteOrderById controller", error)
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    })
  }
}

// Get total sales across all orders
export const getTotalSales = async (_, res) => {
  try {
    const totalSales = await Order.aggregate([
      { $group: { _id: null, totalSales: { $sum: "$totalPrice" } } },
    ])

    if (!totalSales || totalSales.length === 0) {
      return res.status(404).json({
        message: "No sales found",
        success: false,
      })
    }

    // Wrap in object for consistency
    res.status(200).json({ totalSales: totalSales[0].totalSales })
  } catch (error) {
    console.log("Error in getTotalSales controller", error)
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    })
  }
}

// Get total number of orders
export const getOrdersCount = async (_, res) => {
  try {
    const orderCount = await Order.countDocuments()

    res.status(200).json({
      totalOrders: orderCount,
    })
  } catch (error) {
    console.log("Error in getOrdersCount controller", error)
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    })
  }
}

// Get order history for a specific user
export const userOrderHistory = async (req, res) => {
  try {
    const userOrderList = await Order.find({ user: req.params.userid })
      // populate orderItems → product → category
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
          populate: "category",
        },
      })
      // show latest orders first
      .sort({ dateOrdered: -1 })

    if (!userOrderList) {
      return res.status(404).json({
        message: "Order history not found",
        success: false,
      })
    }

    res.status(200).json(userOrderList)
  } catch (error) {
    console.log("Error in userOrderHistory controller", error)
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    })
  }
}
