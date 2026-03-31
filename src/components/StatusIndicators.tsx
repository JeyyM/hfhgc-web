import { Loader2, AlertTriangle } from 'lucide-react';

export function LoadingSpinner({ text = 'Loading…' }: { text?: string }) {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="animate-spin text-[var(--color-green-5)] mr-3" size={24} />
      <span className="text-gray-600">{text}</span>
    </div>
  );
}

export function ErrorBox({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg px-5 py-4 my-4">
      <AlertTriangle size={20} />
      <span className="text-sm">{message}</span>
    </div>
  );
}
