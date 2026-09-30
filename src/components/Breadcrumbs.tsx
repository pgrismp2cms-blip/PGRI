import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  items: {
    label: string;
    targetId?: string;
    onClick?: () => void;
  }[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="bg-neutral-100/80 border-b border-neutral-200 py-2.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center space-x-2 text-xs text-neutral-600">
        <button
          onClick={() => {
            const el = document.getElementById('beranda');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex items-center hover:text-red-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 rounded px-1 py-0.5"
          title="Kembali ke Beranda"
        >
          <Home className="w-3.5 h-3.5 mr-1" />
          <span>Beranda</span>
        </button>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" aria-hidden="true" />
              {isLast ? (
                <span className="font-semibold text-neutral-900 truncate max-w-[200px] sm:max-w-none" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <button
                  onClick={() => {
                    if (item.onClick) {
                      item.onClick();
                    } else if (item.targetId) {
                      const el = document.getElementById(item.targetId);
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="hover:text-red-700 transition-colors truncate max-w-[140px] sm:max-w-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 rounded px-1 py-0.5"
                >
                  {item.label}
                </button>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
