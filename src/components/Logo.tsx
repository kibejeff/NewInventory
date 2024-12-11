import React from 'react';
import { Banknote } from 'lucide-react';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <Banknote className="h-8 w-8 text-primary-600" />
        <div className="absolute -top-1 -right-1 h-3 w-3 bg-secondary-500 rounded-full border-2 border-white" />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-gray-900 leading-none">PowerPay</span>
        <span className="text-sm text-primary-600 font-semibold leading-none">Africa</span>
      </div>
    </div>
  );
}