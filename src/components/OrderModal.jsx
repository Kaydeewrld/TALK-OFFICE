import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, CheckCircle2, Plus, Minus, CreditCard } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OrderModal({ isOpen, onClose, selectedProduct }) {
  const [items, setItems] = useState([
    { id: 'career-probing-cards', name: 'Career Probing Cards', price: 15000, qty: 1 },
    { id: 'ceos-probing-cards', name: 'CEOs Probing Cards', price: 15000, qty: 0 },
    { id: 'accelerate-workbook', name: 'Accelerate Workbook', price: 15000, qty: 0 }
  ]);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [successOrder, setSuccessOrder] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (selectedProduct) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === selectedProduct.id ? { ...item, qty: Math.max(1, item.qty) } : item
        )
      );
    }
  }, [selectedProduct]);

  if (!isOpen) return null;

  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, item.qty + delta);
          return { ...item, qty: newQty };
        }
        return item;
      })
    );
  };

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (totalAmount === 0) {
      setErrorMsg('Please select at least 1 item.');
      return;
    }
    setLoading(true);
    setErrorMsg('');

    try {
      const activeItems = items.filter((i) => i.qty > 0);
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items: activeItems
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessOrder(data.data);
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0C7C7B', '#2DD4BF', '#D99B26', '#141A19']
        });
      } else {
        setErrorMsg(data.error || 'Failed to place order.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content bg-white max-w-xl w-full rounded-3xl p-7 sm:p-10 border border-[#0C7C7B]/20 shadow-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#FAF8F5] text-[#141A19] hover:bg-[#0C7C7B] hover:text-white flex items-center justify-center transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-4 h-4" />
        </button>

        {successOrder ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#EAF6F6] text-[#0C7C7B] flex items-center justify-center mx-auto mb-4 border border-[#0C7C7B]/25">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="badge-pill mb-2 !bg-[#EAF6F6] !text-[#0C7C7B] !border-[#0C7C7B]/25">Order Confirmed</span>
            <h3 className="font-display text-2xl font-bold text-[#141A19] mb-1">
              Thank You, {successOrder.fullName}
            </h3>
            <p className="text-xs text-[#52605E] mb-6">
              Your executive toolkit order has been reserved.
            </p>

            <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#0C7C7B]/15 text-left space-y-3 mb-8">
              <div className="flex justify-between text-xs pb-2 border-b border-[#0C7C7B]/10">
                <span className="text-[#6A7875]">Order Number:</span>
                <span className="font-mono font-bold text-[#141A19]">{successOrder.orderId}</span>
              </div>
              <div className="flex justify-between text-xs pb-2 border-b border-[#0C7C7B]/10">
                <span className="text-[#6A7875]">Total Amount:</span>
                <span className="font-semibold text-[#0C7C7B]">{successOrder.formattedTotal}</span>
              </div>
              <div className="flex justify-between text-xs pb-2 border-b border-[#0C7C7B]/10">
                <span className="text-[#6A7875]">Delivery Destination:</span>
                <span className="text-[#141A19] truncate max-w-xs">{successOrder.address}</span>
              </div>
              <div className="text-xs text-[#6A7875] pt-1">
                Our logistics representative will contact <strong className="text-[#141A19]">{successOrder.phone || successOrder.email}</strong> to coordinate immediate dispatch.
              </div>
            </div>

            <button
              onClick={onClose}
              className="btn-accent !w-full !py-3.5 text-xs uppercase tracking-wider font-semibold"
            >
              Done & Return to Store
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#EAF6F6] border border-[#0C7C7B]/20 flex items-center justify-center p-1">
                  <img src="/talk-logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <span className="badge-pill !bg-[#EAF6F6] !text-[#0C7C7B] !border-[#0C7C7B]/25">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Executive Store Checkout
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-[#141A19]">
                Order Executive Toolkits
              </h3>
              <p className="text-xs text-[#52605E] mt-1">
                Select your toolkits and enter delivery details for immediate dispatch.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs mb-4">
                {errorMsg}
              </div>
            )}

            {/* Cart Items Selector */}
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#0C7C7B]/15 flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-medium text-xs sm:text-sm text-[#141A19]">{item.name}</h4>
                    <span className="text-xs text-[#0C7C7B] font-semibold">
                      ₦{item.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, -1)}
                      className="w-7 h-7 rounded-lg bg-white border border-[#0C7C7B]/20 flex items-center justify-center hover:bg-[#0C7C7B] hover:text-white transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center font-mono text-xs font-bold text-[#141A19]">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, 1)}
                      className="w-7 h-7 rounded-lg bg-white border border-[#0C7C7B]/20 flex items-center justify-center hover:bg-[#0C7C7B] hover:text-white transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Indicator */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#EAF6F6] border border-[#0C7C7B]/20 mb-6">
              <span className="text-xs uppercase font-semibold text-[#0C7C7B]">Estimated Total:</span>
              <span className="font-display text-xl font-bold text-[#141A19]">
                ₦{totalAmount.toLocaleString()}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#141A19] uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Bukola Alabi"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#0C7C7B]/20 bg-[#FAF8F5] text-sm text-[#141A19] focus:bg-white focus:outline-none focus:border-[#0C7C7B] focus:ring-2 focus:ring-[#0C7C7B]/15 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#141A19] uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="bukola@domain.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#0C7C7B]/20 bg-[#FAF8F5] text-sm text-[#141A19] focus:bg-white focus:outline-none focus:border-[#0C7C7B] focus:ring-2 focus:ring-[#0C7C7B]/15 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#141A19] uppercase tracking-wider mb-1">
                    Phone Number (for dispatch) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0803 123 4567"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#0C7C7B]/20 bg-[#FAF8F5] text-sm text-[#141A19] focus:bg-white focus:outline-none focus:border-[#0C7C7B] focus:ring-2 focus:ring-[#0C7C7B]/15 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#141A19] uppercase tracking-wider mb-1">
                    Delivery Address / City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g. Area 11 Garki, Abuja"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#0C7C7B]/20 bg-[#FAF8F5] text-sm text-[#141A19] focus:bg-white focus:outline-none focus:border-[#0C7C7B] focus:ring-2 focus:ring-[#0C7C7B]/15 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || totalAmount === 0}
                className="btn-accent !w-full !py-3.5 text-xs uppercase tracking-wider font-semibold mt-4"
              >
                {loading ? 'Processing Order...' : 'Confirm & Request Invoice/Dispatch'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
