import React, { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';

interface CheckoutPanelProps {
  balance?: number;
  productName?: string;
  productPrice?: number;
  onPaymentComplete?: (amount: number) => void;
}

export const CheckoutPanel: React.FC<CheckoutPanelProps> = ({
  balance = 500,
  productName = 'Premium Subscription',
  productPrice = 29.99,
  onPaymentComplete,
}) => {
  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string>('');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
      setError('');
    }
  };

  const validateAmount = (): boolean => {
    const numAmount = parseFloat(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      setError('Shuma duhet të jetë më e madhe se 0');
      return false;
    }
    if (numAmount > balance) {
      setError('Shuma tejkalon balancën tuaj');
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validateAmount()) return;

    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccess(true);
      const finalAmount = parseFloat(amount);
      onPaymentComplete?.(finalAmount);

      // Reset form after 3 seconds
      setTimeout(() => {
        setAmount('');
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError('Diçka shkoi keq. Ju lutemi provoni përsëri.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      handlePayment();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      {/* Main Card */}
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-8 border-b border-slate-100">
            <h1 className="text-2xl font-semibold text-slate-900 mb-1">
              Përfundoni Pagesën
            </h1>
            <p className="text-sm text-slate-500">
              Depozitoni në llogarinë tuaj
            </p>
          </div>

          {/* Content */}
          <div className="px-6 py-6 space-y-6">
            {/* Balance Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
              <p className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">
                Balanca juaj
              </p>
              <p className="text-2xl font-bold text-slate-900">
                ${balance.toFixed(2)}
              </p>
            </div>

            {/* Product Summary (if provided) */}
            {productName && productPrice && (
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {productName}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Produkti/Shërbimi
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    ${productPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            )}

            {/* Amount Input */}
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-slate-700 mb-2">
                Shuma për pagesë
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
                  $
                </span>
                <input
                  id="amount"
                  type="text"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={amount}
                  onChange={handleAmountChange}
                  onKeyPress={handleKeyPress}
                  disabled={loading || success}
                  className="w-full pl-7 pr-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-slate-50 disabled:cursor-not-allowed transition-colors"
                />
              </div>
              {error && (
                <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              disabled={loading || success || !amount}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                success
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : loading
                  ? 'bg-blue-500 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
              } ${!amount && !success && !loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {success && <Check className="w-5 h-5" />}
              {success ? 'U krye me sukses' : loading ? 'Po procesohej...' : 'Paguaj'}
            </button>

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm font-medium text-green-800">
                  ✓ Pagesa u krye me sukses
                </p>
                <p className="text-xs text-green-700 mt-1">
                  Faleminderit për pagesën tuaj
                </p>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
            <p className="text-xs text-slate-500 text-center">
              Pagesa juaj është e siguruar dhe e enkriptuar
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-4 text-center">
          <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
            <span>🔒</span> Pagesa e Sigurt
          </p>
        </div>
      </div>
    </div>
  );
};
