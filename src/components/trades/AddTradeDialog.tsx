import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Trade, Column } from '@/types/trade';

interface AddTradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (trade: Trade) => void;
  columns: Column[];
}

export function AddTradeDialog({
  open,
  onOpenChange,
  onSubmit,
  columns,
}: AddTradeDialogProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Trade);
    setFormData({});
  };

  const renderField = (column: Column) => {
    switch (column.type) {
      case 'select':
        return (
          <Select
            value={formData[column.id] || ''}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, [column.id]: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder={`Select ${column.name}`} />
            </SelectTrigger>
            <SelectContent>
              {column.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'number':
        return (
          <Input
            type="number"
            value={formData[column.id] || ''}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [column.id]: parseFloat(e.target.value),
              }))
            }
          />
        );
      default:
        return (
          <Input
            type="text"
            value={formData[column.id] || ''}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, [column.id]: e.target.value }))
            }
          />
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Trade</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {columns
            .filter((column) => column.id !== 'date')
            .map((column) => (
              <div key={column.id} className="space-y-2">
                <Label htmlFor={column.id}>{column.name}</Label>
                {renderField(column)}
              </div>
            ))}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover-gradient"
          >
            Add Trade
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}