'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Tag, ToggleLeft, ToggleRight, RefreshCw } from 'lucide-react';

interface Coupon {
  id: string; code: string; description: string | null;
  type: 'PERCENTAGE' | 'FIXED'; value: number;
  minOrderValue: number | null; maxDiscount: number | null;
  usageLimit: number | null; usedCount: number;
  isActive: boolean; validFrom: string; validUntil: string;
}

const empty = (): Omit<Coupon, 'id' | 'usedCount'> => ({
  code: '', description: '', type: 'PERCENTAGE', value: 10,
  minOrderValue: null, maxDiscount: null, usageLimit: null,
  isActive: true,
  validFrom: new Date().toISOString().slice(0, 10),
  validUntil: new Date(Date.now() + 365 * 86400000).toISOString().slice(0, 10),
});

const fmt = (n: number) => n.toLocaleString('en-IN');
const fmtDate = (s: string) => new Date(s).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

export default function CouponsPage() {
  const [coupons, setCoupons]     = useState<Coupon[]>([]);
  const [loading, setLoading]     = useState(true);
  const [showForm, setShowForm]   = useState(false);
  const [editing, setEditing]     = useState<Coupon | null>(null);
  const [form, setForm]           = useState(empty());
  const [saving, setSaving]       = useState(false);
  const [error, setError]         = useState('');
  const [deleting, setDeleting]   = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetch('/api/admin/coupons')
      .then(r => r.json())
      .then(j => { if (j.success) setCoupons(j.data); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(empty()); setError(''); setShowForm(true); };
  const openEdit   = (c: Coupon) => {
    setEditing(c);
    setForm({
      code:          c.code,
      description:   c.description || '',
      type:          c.type,
      value:         Number(c.value),
      minOrderValue: c.minOrderValue ? Number(c.minOrderValue) : null,
      maxDiscount:   c.maxDiscount   ? Number(c.maxDiscount)   : null,
      usageLimit:    c.usageLimit,
      isActive:      c.isActive,
      validFrom:     c.validFrom.slice(0, 10),
      validUntil:    c.validUntil.slice(0, 10),
    });
    setError('');
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setError('');
    try {
      const url    = editing ? `/api/admin/coupons/${editing.id}` : '/api/admin/coupons';
      const method = editing ? 'PATCH' : 'POST';
      const res    = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const json   = await res.json();
      if (!json.success) throw new Error(json.message || 'Failed');
      load();
      setShowForm(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error saving coupon');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this coupon?')) return;
    setDeleting(id);
    await fetch(`/api/admin/coupons/${id}`, { method: 'DELETE' });
    setCoupons(c => c.filter(x => x.id !== id));
    setDeleting(null);
  };

  const toggleActive = async (c: Coupon) => {
    const res  = await fetch(`/api/admin/coupons/${c.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isActive: !c.isActive }) });
    const json = await res.json();
    if (json.success) setCoupons(prev => prev.map(x => x.id === c.id ? { ...x, isActive: !x.isActive } : x));
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const v = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm(f => ({ ...f, [k]: v }));
  };

  const isExpired = (c: Coupon) => new Date(c.validUntil) < new Date();

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Coupons</h1>
          <p className="text-sm text-gray-500 mt-0.5">{coupons.length} coupon{coupons.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition">
            <Plus className="w-4 h-4" /> Create Coupon
          </button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : coupons.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-16 text-center">
          <Tag className="w-10 h-10 text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 font-medium">No coupons yet</p>
          <button onClick={openCreate} className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition">Create your first coupon</button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Code', 'Discount', 'Min Order', 'Usage', 'Valid Until', 'Status', ''].map(h => (
                    <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {coupons.map(c => (
                  <tr key={c.id} className="hover:bg-gray-50 transition">
                    <td className="px-5 py-4">
                      <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-sm">{c.code}</span>
                      {c.description && <p className="text-xs text-gray-400 mt-0.5">{c.description}</p>}
                    </td>
                    <td className="px-5 py-4 font-semibold text-gray-800">
                      {c.type === 'PERCENTAGE' ? `${Number(c.value)}%` : `₹${fmt(Number(c.value))}`}
                      {c.maxDiscount && c.type === 'PERCENTAGE' && (
                        <span className="text-xs text-gray-400 block">max ₹{fmt(Number(c.maxDiscount))}</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-gray-600">
                      {c.minOrderValue ? `₹${fmt(Number(c.minOrderValue))}` : '—'}
                    </td>
                    <td className="px-5 py-4 text-gray-600">
                      {c.usedCount}{c.usageLimit ? ` / ${c.usageLimit}` : ''}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs ${isExpired(c) ? 'text-red-500 font-semibold' : 'text-gray-600'}`}>
                        {fmtDate(c.validUntil)}{isExpired(c) && ' (Expired)'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button onClick={() => toggleActive(c)} className="flex items-center gap-1.5 text-xs font-semibold transition">
                        {c.isActive
                          ? <><ToggleRight className="w-5 h-5 text-green-500" /><span className="text-green-600">Active</span></>
                          : <><ToggleLeft className="w-5 h-5 text-gray-400" /><span className="text-gray-400">Inactive</span></>}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(c)} className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(c.id)} disabled={deleting === c.id} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-40">
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
      )}

      {/* Create / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="text-base font-semibold text-gray-800">{editing ? 'Edit Coupon' : 'Create Coupon'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1">Coupon Code *</label>
                  <input value={form.code} onChange={set('code')} required placeholder="e.g. SLEEP10"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1">Type *</label>
                  <select value={form.type} onChange={set('type')} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
                    <option value="PERCENTAGE">Percentage (%)</option>
                    <option value="FIXED">Fixed Amount (₹)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">
                  {form.type === 'PERCENTAGE' ? 'Discount %  *' : 'Discount Amount (₹)  *'}
                </label>
                <input type="number" min={1} max={form.type === 'PERCENTAGE' ? 100 : undefined}
                  value={form.value} onChange={e => setForm(f => ({ ...f, value: Number(e.target.value) }))} required
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1">Min Order Value (₹)</label>
                  <input type="number" min={0} placeholder="No minimum"
                    value={form.minOrderValue ?? ''} onChange={e => setForm(f => ({ ...f, minOrderValue: e.target.value ? Number(e.target.value) : null }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                </div>
                {form.type === 'PERCENTAGE' && (
                  <div>
                    <label className="text-xs font-medium text-gray-500 block mb-1">Max Discount (₹)</label>
                    <input type="number" min={0} placeholder="No cap"
                      value={form.maxDiscount ?? ''} onChange={e => setForm(f => ({ ...f, maxDiscount: e.target.value ? Number(e.target.value) : null }))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Usage Limit</label>
                <input type="number" min={1} placeholder="Unlimited"
                  value={form.usageLimit ?? ''} onChange={e => setForm(f => ({ ...f, usageLimit: e.target.value ? Number(e.target.value) : null }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1">Valid From *</label>
                  <input type="date" value={form.validFrom} onChange={set('validFrom')} required
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1">Valid Until *</label>
                  <input type="date" value={form.validUntil} onChange={set('validUntil')} required
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Description</label>
                <input value={form.description ?? ''} onChange={set('description')} placeholder="e.g. 10% off on all orders"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} className="accent-indigo-600 w-4 h-4" />
                <span className="text-sm font-medium text-gray-700">Active</span>
              </label>

              {error && <p className="text-sm text-red-500">{error}</p>}
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-gray-200 text-gray-600 rounded-lg py-2 text-sm font-medium hover:bg-gray-50 transition">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 bg-indigo-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-60">
                  {saving ? 'Saving…' : editing ? 'Update Coupon' : 'Create Coupon'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
