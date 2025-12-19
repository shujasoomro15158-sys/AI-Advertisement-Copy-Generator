
import React, { useState } from 'react';
import Layout from './components/Layout';
import AdForm from './components/AdForm';
import AdCard from './components/AdCard';
import { AdInput, AdCopy, GenerationStatus } from './types';
import { generateAdCopy } from './services/geminiService';

const App: React.FC = () => {
  const [input, setInput] = useState<AdInput>({
    productName: '',
    targetAudience: '',
    keyFeatures: ''
  });
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [results, setResults] = useState<AdCopy | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInput(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.productName || !input.targetAudience || !input.keyFeatures) return;

    setStatus(GenerationStatus.LOADING);
    setError(null);

    try {
      const copy = await generateAdCopy(input);
      setResults(copy);
      setStatus(GenerationStatus.SUCCESS);
      // Smooth scroll to results
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      setStatus(GenerationStatus.ERROR);
    }
  };

  return (
    <Layout>
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-4">
            AI Ad Copywriter
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Stop Staring at a <span className="text-indigo-600">Blank Page</span>.
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Generate high-converting ad copy in seconds. Just tell us what you're selling and who you're selling it to.
          </p>

          <div className="max-w-2xl mx-auto text-left">
            <AdForm 
              input={input} 
              onChange={handleInputChange} 
              onSubmit={handleGenerate} 
              loading={status === GenerationStatus.LOADING}
            />
          </div>
        </div>
      </section>

      {status === GenerationStatus.ERROR && (
        <div className="max-w-4xl mx-auto px-4 mb-10">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 text-red-700">
            <i className="fa-solid fa-circle-exclamation text-xl"></i>
            <p className="font-medium">{error}</p>
          </div>
        </div>
      )}

      {results && (
        <section id="results-section" className="py-12 bg-white scroll-mt-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Your Generated Copy</h3>
                <p className="text-slate-500 text-sm">Review, tweak, and use across your marketing channels.</p>
              </div>
              <button 
                onClick={() => setResults(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
                title="Clear Results"
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AdCard 
                title="Professional"
                content={results.professional}
                icon="fa-solid fa-briefcase"
                accentColor="bg-slate-800"
              />
              <AdCard 
                title="Fun & Casual"
                content={results.casual}
                icon="fa-solid fa-face-smile"
                accentColor="bg-indigo-600"
              />
              <AdCard 
                title="Urgent & Sales"
                content={results.urgent}
                icon="fa-solid fa-bolt-lightning"
                accentColor="bg-orange-600"
              />
            </div>
          </div>
        </section>
      )}

      {status === GenerationStatus.IDLE && !results && (
        <section className="py-12 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-50 grayscale pointer-events-none">
               <div className="bg-white p-8 rounded-2xl border border-dashed border-slate-300 flex flex-col items-center text-center">
                 <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                   <i className="fa-solid fa-pencil text-slate-400"></i>
                 </div>
                 <h4 className="font-bold text-slate-800 mb-2">Step 1</h4>
                 <p className="text-xs text-slate-500">Fill out the product form above with your specific details.</p>
               </div>
               <div className="bg-white p-8 rounded-2xl border border-dashed border-slate-300 flex flex-col items-center text-center">
                 <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                   <i className="fa-solid fa-gears text-slate-400"></i>
                 </div>
                 <h4 className="font-bold text-slate-800 mb-2">Step 2</h4>
                 <p className="text-xs text-slate-500">Our AI analyzes your features and audience to craft perfect copy.</p>
               </div>
               <div className="bg-white p-8 rounded-2xl border border-dashed border-slate-300 flex flex-col items-center text-center">
                 <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                   <i className="fa-solid fa-rocket text-slate-400"></i>
                 </div>
                 <h4 className="font-bold text-slate-800 mb-2">Step 3</h4>
                 <p className="text-xs text-slate-500">Copy your favorite style and launch your marketing campaign.</p>
               </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default App;
