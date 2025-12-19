
import React from 'react';
import { AdInput } from '../types';

interface AdFormProps {
  input: AdInput;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

const AdForm: React.FC<AdFormProps> = ({ input, onChange, onSubmit, loading }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
      <div className="space-y-2">
        <label htmlFor="productName" className="block text-sm font-semibold text-slate-700">
          Product Name
        </label>
        <input
          required
          type="text"
          id="productName"
          name="productName"
          value={input.productName}
          onChange={onChange}
          placeholder="e.g. ZenFlow Meditation App"
          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="targetAudience" className="block text-sm font-semibold text-slate-700">
          Target Audience
        </label>
        <input
          required
          type="text"
          id="targetAudience"
          name="targetAudience"
          value={input.targetAudience}
          onChange={onChange}
          placeholder="e.g. Busy professionals aged 25-45"
          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="keyFeatures" className="block text-sm font-semibold text-slate-700">
          Key Features (One per line)
        </label>
        <textarea
          required
          id="keyFeatures"
          name="keyFeatures"
          rows={4}
          value={input.keyFeatures}
          onChange={onChange}
          placeholder="e.g. 5-minute guided sessions&#10;Sleep tracking&#10;Offline access"
          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
          loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]'
        }`}
      >
        {loading ? (
          <>
            <i className="fa-solid fa-circle-notch animate-spin"></i>
            Generating Ad Copy...
          </>
        ) : (
          <>
            <i className="fa-solid fa-magic"></i>
            Generate Ad Copy
          </>
        )}
      </button>
    </form>
  );
};

export default AdForm;
