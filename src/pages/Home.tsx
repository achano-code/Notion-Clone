import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';

export function Home() {
  return (
    <Card className="m-auto w-1/2 border-0 shadow-none">
      <CardHeader className="px-4 pb-3">
        <CardTitle className="text-lg font-medium">新しいノートを作成してみましょう</CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <div className="flex gap-2">
          <input
            className="block h-9 w-full flex-1 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-slate-500 sm:text-sm"
            placeholder="ノートのタイトルを入力"
            type="text"
          />
          <button className="flex justify-center rounded-md border border-transparent bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <Plus className="h-4 w-4" />
            <span className="ml-1">ノート作成</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
