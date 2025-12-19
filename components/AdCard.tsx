
import React, { useState } from 'react';

interface AdCardProps {
  title: string;
  content: string;
  icon: string;
  accentColor: string;
}

const AdCard: React.FC<AdCardProps> = ({ title, content, icon, accentColor }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full group hover:shadow-md transition-shadow">
      <div className={`${accentColor} p-4 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <i className={`${icon} text-white`}></i>
          <h3 className="text-white font-bold uppercase tracking-wider text-xs">{title}</h3>
        </div>
        <button 
          onClick={handleCopy}
          className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md"
        >
          {copied ? (
            <><i className="fa-solid fa-check text-green-300"></i> Copied</>
          ) : (
            <><i className="fa-solid fa-copy"></i> Copy</>
          )}
        </button>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="prose prose-slate max-w-none prose-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
          {content}
        </div>
      </div>
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 mt-auto">
        <div className="flex gap-2">
           <button className="flex-1 bg-white border border-slate-300 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50">
             <i className="fa-brands fa-facebook mr-1"></i> Preview
           </button>
           <button className="flex-1 bg-white border border-slate-300 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50">
             <i className="fa-brands fa-instagram mr-1"></i> Preview
           </button>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
