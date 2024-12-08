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
import { Plus, X } from 'lucide-react';
import { Column } from '@/types/trade';

interface AddColumnDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (column: Column) => void;
}

const COLUMN_TYPES = [
  { value: 'text', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'select', label: 'List' },
];

export function AddColumnDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddColumnDialogProps) {
  const [columnData, setColumnData] = useState<Partial<Column>>({});
  const [newOption, setNewOption] = useState('');
  const [listOptions, setListOptions] = useState<string[]>([]);

  const handleAddOption = () => {
    if (newOption.trim()) {
      setListOptions((prev) => [...prev, newOption.trim()]);
      setNewOption('');
    }
  };

  const handleRemoveOption = (index: number) => {
    setListOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (columnData.name && columnData.type) {
      const column: Column = {
        id: columnData.name.toLowerCase(),
        name: columnData.name,
        type: columnData.type,
        options: columnData.type === 'select' ? listOptions : undefined,
      };
      onSubmit(column);
      setColumnData({});
      setListOptions([]);
      setNewOption('');
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setColumnData({});
    setListOptions([]);
    setNewOption('');
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Column</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Column Name</Label>
            <Input
              id="name"
              value={columnData.name || ''}
              onChange={(e) =>
                setColumnData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Enter column name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Column Type</Label>
            <Select
              value={columnData.type}
              onValueChange={(value) =>
                setColumnData((prev) => ({ ...prev, type: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select column type" />
              </SelectTrigger>
              <SelectContent>
                {COLUMN_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {columnData.type === 'select' && (
            <div className="space-y-4">
              <Label>List Options</Label>
              <div className="flex gap-2">
                <Input
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  placeholder="Enter an option"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddOption();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddOption}
                  className="shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {listOptions.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-md bg-gray-50"
                  >
                    <span>{option}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveOption(index)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              {listOptions.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No options added yet. Add some options for your list.
                </p>
              )}
            </div>
          )}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover-gradient"
            disabled={columnData.type === 'select' && listOptions.length === 0}
          >
            Add Column
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}