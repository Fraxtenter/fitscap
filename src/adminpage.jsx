import React, { useState } from 'react';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  Plus, 
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Star,
  Calendar,
  DollarSign,
  AlertCircle,
  Check,
  X
} from 'lucide-react';

const FitScapeAdmin2 = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddProduct, setShowAddProduct] = useState(false);

  // Sample data
  const stats = {
    totalProducts: 1247,
    totalOrders: 3892,
    totalCustomers: 2156,
    revenue: 89420
  };

  const recentOrders = [
    { id: '#ORD-001', customer: 'Emma Johnson', items: 3, total: 249, status: 'shipped', date: '2024-08-12' },
    { id: '#ORD-002', customer: 'Sofia Rodriguez', items: 1, total: 89, status: 'processing', date: '2024-08-12' },
    { id: '#ORD-003', customer: 'Maya Patel', items: 2, total: 156, status: 'delivered', date: '2024-08-11' },
    { id: '#ORD-004', customer: 'Zoe Chen', items: 4, total: 312, status: 'pending', date: '2024-08-11' }
  ];

  const products = [
    { id: 1, name: 'Floral Summer Dress', category: 'Dresses', price: 79, stock: 23, status: 'active', image: '/api/placeholder/80/80' },
    { id: 2, name: 'High-Waist Yoga Leggings', category: 'Activewear', price: 45, stock: 67, status: 'active', image: '/api/placeholder/80/80' },
    { id: 3, name: 'Silk Blouse Collection', category: 'Tops', price: 120, stock: 12, status: 'low stock', image: '/api/placeholder/80/80' },
    { id: 4, name: 'Denim Jacket Vintage', category: 'Outerwear', price: 95, stock: 0, status: 'out of stock', image: '/api/placeholder/80/80' }
  ];

  const customers = [
    { id: 1, name: 'Emma Johnson', email: 'emma@email.com', orders: 12, spent: 1240, joined: '2023-05-15', status: 'vip' },
    { id: 2, name: 'Sofia Rodriguez', email: 'sofia@email.com', orders: 8, spent: 680, joined: '2023-08-22', status: 'regular' },
    { id: 3, name: 'Maya Patel', email: 'maya@email.com', orders: 15, spent: 1890, joined: '2023-03-10', status: 'vip' },
    { id: 4, name: 'Zoe Chen', email: 'zoe@email.com', orders: 5, spent: 420, joined: '2024-01-08', status: 'new' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'shipped': case 'active': case 'vip': return 'bg-green-100 text-green-800';
      case 'processing': case 'regular': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-purple-100 text-purple-800';
      case 'pending': case 'new': return 'bg-yellow-100 text-yellow-800';
      case 'low stock': return 'bg-orange-100 text-orange-800';
      case 'out of stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const StatCard = ({ title, value, icon: Icon, change }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className="text-sm text-green-600 mt-1 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +{change}% from last month
            </p>
          )}
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const AddProductModal = () => (
    showAddProduct && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Add New Product</h3>
            <button onClick={() => setShowAddProduct(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Enter product name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                <option>Dresses</option>
                <option>Tops</option>
                <option>Bottoms</option>
                <option>Activewear</option>
                <option>Outerwear</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="0" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent" rows="3" placeholder="Product description"></textarea>
            </div>
            <div className="flex gap-3 pt-4">
              <button type="button" onClick={() => setShowAddProduct(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
              <button type="button" className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800">Add Product</button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-purple-100">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg font-bold text-xl">
                FitScape
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-purple-600">
                <AlertCircle className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white font-semibold">A</div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm h-screen sticky top-0 border-r border-purple-100">
          <div className="p-6">
            <div className="space-y-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
                { id: 'products', label: 'Products', icon: Package },
                { id: 'orders', label: 'Orders', icon: ShoppingCart },
                { id: 'customers', label: 'Customers', icon: Users }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white'
                      : 'text-gray-700 hover:bg-purple-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Products" value={stats.totalProducts.toLocaleString()} icon={Package} change={12} />
                <StatCard title="Total Orders" value={stats.totalOrders.toLocaleString()} icon={ShoppingCart} change={8} />
                <StatCard title="Total Customers" value={stats.totalCustomers.toLocaleString()} icon={Users} change={15} />
                <StatCard title="Revenue" value={`$${stats.revenue.toLocaleString()}`} icon={DollarSign} change={23} />
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-xl shadow-sm border border-purple-100">
                <div className="p-6 border-b border-purple-100">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-purple-50">
                      <tr>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Order ID</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Customer</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Items</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Total</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Status</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentOrders.map(order => (
                        <tr key={order.id} className="hover:bg-purple-25">
                          <td className="px-6 py-4 text-sm font-medium text-purple-600">{order.id}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{order.customer}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{order.items} items</td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">${order.total}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Products</h2>
                <button 
                  onClick={() => setShowAddProduct(true)}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-purple-800 flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Product</span>
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-purple-100">
                <div className="p-6 border-b border-purple-100">
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input 
                        type="text" 
                        placeholder="Search products..." 
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Filter className="w-4 h-4" />
                      <span>Filter</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-purple-50">
                      <tr>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Product</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Category</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Price</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Stock</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Status</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {products.map(product => (
                        <tr key={product.id} className="hover:bg-purple-25">
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Package className="w-6 h-6 text-purple-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{product.name}</p>
                                <p className="text-sm text-gray-500">#{product.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">{product.category}</td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">${product.price}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{product.stock}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(product.status)}`}>
                              {product.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <button className="p-1 text-gray-400 hover:text-purple-600">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-purple-600">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-red-600">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
              <div className="bg-white rounded-xl shadow-sm border border-purple-100">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-purple-50">
                      <tr>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Order ID</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Customer</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Items</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Total</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Status</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Date</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentOrders.map(order => (
                        <tr key={order.id} className="hover:bg-purple-25">
                          <td className="px-6 py-4 text-sm font-medium text-purple-600">{order.id}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{order.customer}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{order.items} items</td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">${order.total}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">{order.date}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <button className="p-1 text-gray-400 hover:text-purple-600">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-purple-600">
                                <Edit className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Customers</h2>
              <div className="bg-white rounded-xl shadow-sm border border-purple-100">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-purple-50">
                      <tr>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Customer</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Email</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Orders</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Total Spent</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Status</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Joined</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {customers.map(customer => (
                        <tr key={customer.id} className="hover:bg-purple-25">
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white font-semibold">
                                {customer.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{customer.name}</p>
                                <p className="text-sm text-gray-500">ID: {customer.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">{customer.email}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{customer.orders}</td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">${customer.spent}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(customer.status)}`}>
                              {customer.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">{customer.joined}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <button className="p-1 text-gray-400 hover:text-purple-600">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-purple-600">
                                <Edit className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <AddProductModal />
    </div>
  );
};

export default FitScapeAdmin2;