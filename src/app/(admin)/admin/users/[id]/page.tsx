'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft, Mail, Phone, MapPin, ShoppingBag,
  CreditCard, Calendar, CheckCircle, XCircle, Clock,
  Package, Truck, RotateCcw, Pencil, X,
} from 'lucide-react';

/* ─── Types ─────────────────────────────────────────── */
interface Address {
  id: string; type: string; fullName: string; phone: string;
  addressLine1: string; addressLine2?: string | null;
  city: string; state: string; pincode: string;
  landmark?: string | null; isDefault: boolean;
}

interface OrderItem {
  id: string; productName: string; variantName?: string | null;
  quantity: number; price: number; total: number;
}

interface Payment {
  method: string; status: string; amount: number;
  razorpayPaymentId?: string | null; paidAt?: string | null;
}

interface StatusHistory { status: string; notes?: string | null; createdAt: string; }

interface Order {
  id: string; orderNumber: string; status: string;
  paymentMethod: string; paymentStatus: string;
  subtotal: number; discount: number; shippingCharge: number;
  tax: number; total: number;
  couponCode?: string | null; couponDiscount?: number | null;
  trackingNumber?: string | null;
  estimatedDelivery?: string | null; deliveredAt?: string | null;
  createdAt: string;
  shippingAddress: Address | null;
  items: OrderItem[];
  payment: Payment | null;
  statusHistory: StatusHistory[];
}

interface UserDetail {
  id: string; firstName: string | null; lastName: string | null;
  email: string; phone: string | null; role: string; status: string;
  emailVerified: boolean; createdAt: string; updatedAt: string;
  addresses: Address[];
  orders: Order[];
}

/* ─── Helpers ────────────────────────────────────────── */
const fmt = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

const fmtDate = (s: string) =>
  new Date(s).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

const fmtDateTime = (s: string) =>
  new Date(s).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

const ORDER_STATUS_STYLE: Record<string, { color: string; icon: React.ElementType }> = {
  PENDING:    { color: 'bg-yellow-100 text-yellow-700',  icon: Clock },
  CONFIRMED:  { color: 'bg-blue-100 text-blue-700',      icon: CheckCircle },
  PROCESSING: { color: 'bg-indigo-100 text-indigo-700',  icon: Package },
  SHIPPED:    { color: 'bg-cyan-100 text-cyan-700',      icon: Truck },
  DELIVERED:  { color: 'bg-green-100 text-green-700',    icon: CheckCircle },
  CANCELLED:  { color: 'bg-red-100 text-red-700',        icon: XCircle },
  RETURNED:   { color: 'bg-gray-100 text-gray-600',      icon: RotateCcw },
};

const PAY_STATUS_STYLE: Record<string, string> = {
  PENDING:  'bg-yellow-100 text-yellow-700',
  PAID:     'bg-green-100 text-green-700',
  FAILED:   'bg-red-100 text-red-700',
  REFUNDED: 'bg-gray-100 text-gray-600',
};

/* ─── EditModal ──────────────────────────────────────── */
interface EditForm { firstName: string; lastName: string; email: string; phone: string; status: string; role: string; }

function EditModal({ user, onClose, onSave }: { user: UserDetail; onClose: () => void; onSave: (u: UserDetail) => void }) {
  const [form, setForm] = useState<EditForm>({
    firstName: user.firstName ?? '',
    lastName:  user.lastName  ?? '',
    email:     user.email,
    phone:     user.phone     ?? '',
    status:    user.status,
    role:      user.role,
  });
  const [saving, setSaving] = useState(false);
  const [error,  setError]  = useState('');

  const set = (k: keyof EditForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setError('');
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'Update failed');
      onSave({ ...user, ...json.data });
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-800">Edit User</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} autoComplete="off" className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">First Name</label>
              <input autoComplete="off" value={form.firstName} onChange={set('firstName')} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Last Name</label>
              <input autoComplete="off" value={form.lastName} onChange={set('lastName')} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">Email</label>
            <input type="email" autoComplete="off" value={form.email} onChange={set('email')} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">Phone</label>
            <input autoComplete="off" value={form.phone} onChange={set('phone')} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Status</label>
              <select value={form.status} onChange={set('status')} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
                <option value="SUSPENDED">SUSPENDED</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Role</label>
              <select value={form.role} onChange={set('role')} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
                <option value="CUSTOMER">CUSTOMER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 border border-gray-200 text-gray-600 rounded-lg py-2 text-sm font-medium hover:bg-gray-50 transition">Cancel</button>
            <button type="submit" disabled={saving} className="flex-1 bg-indigo-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-60">
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── Component ──────────────────────────────────────── */
export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/users/${id}`)
      .then(r => r.json())
      .then(j => { if (j.success) setUser(j.data); })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!user) return (
    <div className="text-center py-20 text-gray-500">User not found.</div>
  );

  const name = [user.firstName, user.lastName].filter(Boolean).join(' ') || '—';
  const initials = [user.firstName?.[0], user.lastName?.[0]].filter(Boolean).join('').toUpperCase() || user.email[0].toUpperCase();
  const totalSpent = user.orders
    .filter(o => o.status !== 'CANCELLED')
    .reduce((sum, o) => sum + Number(o.total), 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {showEdit && user && (
        <EditModal user={user} onClose={() => setShowEdit(false)} onSave={setUser} />
      )}

      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Users
      </button>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-2xl shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-gray-800">{name}</h1>
            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-1.5 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{user.email}</span>
              {user.phone && <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />{user.phone}</span>}
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />Joined {fmtDate(user.createdAt)}</span>
            </div>
          </div>
          <div className="flex gap-2 shrink-0 items-center">
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${user.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
              {user.status}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
              {user.role}
            </span>
            {user.emailVerified && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Verified
              </span>
            )}
            <button
              onClick={() => setShowEdit(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 text-xs font-semibold transition"
            >
              <Pencil className="w-3.5 h-3.5" /> Edit
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{user.orders.length}</p>
            <p className="text-xs text-gray-500 mt-0.5">Total Orders</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{fmt(totalSpent)}</p>
            <p className="text-xs text-gray-500 mt-0.5">Total Spent</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{user.addresses.length}</p>
            <p className="text-xs text-gray-500 mt-0.5">Saved Addresses</p>
          </div>
        </div>
      </div>

      {/* Addresses */}
      {user.addresses.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-500" /> Saved Addresses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.addresses.map(addr => (
              <div key={addr.id} className="border border-gray-100 rounded-lg p-4 text-sm text-gray-600">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded">{addr.type}</span>
                  {addr.isDefault && <span className="text-xs font-semibold bg-green-50 text-green-600 px-2 py-0.5 rounded">Default</span>}
                </div>
                <p className="font-medium text-gray-800">{addr.fullName}</p>
                <p>{addr.addressLine1}{addr.addressLine2 ? `, ${addr.addressLine2}` : ''}</p>
                <p>{addr.city}, {addr.state} – {addr.pincode}</p>
                {addr.landmark && <p className="text-gray-400">Near: {addr.landmark}</p>}
                <p className="mt-1 flex items-center gap-1"><Phone className="w-3 h-3" />{addr.phone}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-indigo-500" /> Orders ({user.orders.length})
        </h2>

        {user.orders.length === 0 ? (
          <p className="text-gray-400 text-sm">No orders placed yet.</p>
        ) : (
          <div className="space-y-4">
            {user.orders.map(order => {
              const st = ORDER_STATUS_STYLE[order.status] || { color: 'bg-gray-100 text-gray-600', icon: Clock };
              const StatusIcon = st.icon;
              const expanded = expandedOrder === order.id;
              return (
                <div key={order.id} className="border border-gray-100 rounded-xl overflow-hidden">
                  {/* Order Header */}
                  <button
                    className="w-full flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 hover:bg-gray-50 transition text-left"
                    onClick={() => setExpandedOrder(expanded ? null : order.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-gray-800">#{order.orderNumber}</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${st.color}`}>
                          <StatusIcon className="w-3 h-3" /> {order.status}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${PAY_STATUS_STYLE[order.paymentStatus] || 'bg-gray-100 text-gray-600'}`}>
                          {order.paymentStatus}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{fmtDateTime(order.createdAt)} · {order.items.length} item{order.items.length !== 1 ? 's' : ''} · {order.paymentMethod}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-gray-800">{fmt(Number(order.total))}</p>
                      <p className="text-xs text-indigo-500 mt-0.5">{expanded ? 'Hide details ▲' : 'View details ▼'}</p>
                    </div>
                  </button>

                  {/* Order Detail */}
                  {expanded && (
                    <div className="border-t border-gray-100 px-5 py-4 bg-gray-50 space-y-5">

                      {/* Items */}
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Items</p>
                        <div className="space-y-2">
                          {order.items.map(item => (
                            <div key={item.id} className="flex items-center justify-between text-sm">
                              <div>
                                <span className="font-medium text-gray-800">{item.productName}</span>
                                {item.variantName && <span className="text-gray-400 ml-1.5">({item.variantName})</span>}
                                <span className="text-gray-400 ml-2">× {item.quantity}</span>
                              </div>
                              <span className="font-semibold text-gray-700">{fmt(Number(item.total))}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pricing breakdown */}
                      <div className="border-t border-gray-200 pt-3 space-y-1.5 text-sm">
                        <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{fmt(Number(order.subtotal))}</span></div>
                        {Number(order.discount) > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>−{fmt(Number(order.discount))}</span></div>}
                        {order.couponCode && <div className="flex justify-between text-green-600"><span>Coupon ({order.couponCode})</span><span>−{fmt(Number(order.couponDiscount || 0))}</span></div>}
                        {Number(order.shippingCharge) > 0 && <div className="flex justify-between text-gray-600"><span>Shipping</span><span>{fmt(Number(order.shippingCharge))}</span></div>}
                        {Number(order.tax) > 0 && <div className="flex justify-between text-gray-600"><span>Tax</span><span>{fmt(Number(order.tax))}</span></div>}
                        <div className="flex justify-between font-bold text-gray-800 border-t border-gray-200 pt-2 text-base"><span>Total</span><span>{fmt(Number(order.total))}</span></div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Shipping Address */}
                        {order.shippingAddress && (
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Shipping Address</p>
                            <div className="text-sm text-gray-600 bg-white rounded-lg p-3 border border-gray-100">
                              <p className="font-medium text-gray-800">{order.shippingAddress.fullName}</p>
                              <p>{order.shippingAddress.addressLine1}{order.shippingAddress.addressLine2 ? `, ${order.shippingAddress.addressLine2}` : ''}</p>
                              <p>{order.shippingAddress.city}, {order.shippingAddress.state} – {order.shippingAddress.pincode}</p>
                              <p className="flex items-center gap-1 mt-1"><Phone className="w-3 h-3" />{order.shippingAddress.phone}</p>
                            </div>
                          </div>
                        )}

                        {/* Payment */}
                        {order.payment && (
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Payment</p>
                            <div className="text-sm text-gray-600 bg-white rounded-lg p-3 border border-gray-100 space-y-1">
                              <div className="flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5 text-gray-400" /><span className="font-medium">{order.payment.method}</span></div>
                              <div className="flex items-center gap-1.5">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${PAY_STATUS_STYLE[order.payment.status] || ''}`}>{order.payment.status}</span>
                              </div>
                              {order.payment.razorpayPaymentId && <p className="text-xs text-gray-400 font-mono">ID: {order.payment.razorpayPaymentId}</p>}
                              {order.payment.paidAt && <p className="text-xs text-gray-400">Paid: {fmtDateTime(order.payment.paidAt)}</p>}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Tracking & Delivery */}
                      {(order.trackingNumber || order.estimatedDelivery || order.deliveredAt) && (
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tracking</p>
                          <div className="text-sm text-gray-600 space-y-1">
                            {order.trackingNumber && <p><span className="text-gray-400">Tracking #:</span> <span className="font-mono">{order.trackingNumber}</span></p>}
                            {order.estimatedDelivery && <p><span className="text-gray-400">Est. Delivery:</span> {fmtDate(order.estimatedDelivery)}</p>}
                            {order.deliveredAt && <p><span className="text-gray-400">Delivered:</span> {fmtDateTime(order.deliveredAt)}</p>}
                          </div>
                        </div>
                      )}

                      {/* Status History */}
                      {order.statusHistory.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Status History</p>
                          <ol className="relative border-l border-gray-200 pl-4 space-y-2">
                            {order.statusHistory.map((h, i) => (
                              <li key={i} className="relative">
                                <span className="absolute -left-[18px] top-1 w-2.5 h-2.5 rounded-full bg-indigo-400 border-2 border-white" />
                                <p className="text-sm font-medium text-gray-700">{h.status}</p>
                                {h.notes && <p className="text-xs text-gray-400">{h.notes}</p>}
                                <p className="text-xs text-gray-400">{fmtDateTime(h.createdAt)}</p>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
