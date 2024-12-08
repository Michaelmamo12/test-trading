import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { AddTradeDialog } from './AddTradeDialog';
import { AddColumnDialog } from './AddColumnDialog';
import { Trade, Column } from '@/types/trade';

const TRADING_PAIRS = [
  'BTC/USD',
  'ETH/USD',
  'BNB/USD',
  'XRP/USD',
  'ADA/USD',
  'SOL/USD',
  'DOT/USD',
];

export function TradeTable() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [columns, setColumns] = useState<Column[]>([
    { id: 'date', name: 'Date', type: 'date' },
    { id: 'pair', name: 'Pair', type: 'select', options: TRADING_PAIRS },
  ]);
  const [isAddTradeOpen, setIsAddTradeOpen] = useState(false);
  const [isAddColumnOpen, setIsAddColumnOpen] = useState(false);

  const handleAddTrade = (trade: Trade) => {
    setTrades((prev) => [...prev, { ...trade, date: new Date().toISOString() }]);
    setIsAddTradeOpen(false);
  };

  const handleAddColumn = (column: Column) => {
    setColumns((prev) => [...prev, { ...column, id: column.name.toLowerCase() }]);
    setIsAddColumnOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-x-4">
          <Button
            onClick={() => setIsAddTradeOpen(true)}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover-gradient"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Trade
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsAddColumnOpen(true)}
          >
            Add Column
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id}>{column.name}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {trades.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center text-muted-foreground"
                >
                  No trades yet. Add your first trade!
                </TableCell>
              </TableRow>
            ) : (
              trades.map((trade, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      {column.id === 'date'
                        ? new Date(trade.date).toLocaleDateString()
                        : trade[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AddTradeDialog
        open={isAddTradeOpen}
        onOpenChange={setIsAddTradeOpen}
        onSubmit={handleAddTrade}
        columns={columns}
      />

      <AddColumnDialog
        open={isAddColumnOpen}
        onOpenChange={setIsAddColumnOpen}
        onSubmit={handleAddColumn}
      />
    </div>
  );
}