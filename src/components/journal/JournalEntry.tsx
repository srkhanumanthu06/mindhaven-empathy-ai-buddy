
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { BookOpen, Save, Plus, Calendar, Edit2, Trash2, Check, X } from 'lucide-react';

export interface JournalEntryType {
  id: number;
  title: string;
  content: string;
  date: Date;
}

interface JournalEntryListProps {
  entries: JournalEntryType[];
  onSaveEntry: (entry: JournalEntryType) => void;
  onDeleteEntry: (id: number) => void;
}

const JournalEntry = ({ entries, onSaveEntry, onDeleteEntry }: JournalEntryListProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  
  const handleStartNewEntry = () => {
    setIsCreating(true);
    setNewTitle('');
    setNewContent('');
  };
  
  const handleSaveNewEntry = () => {
    if (newTitle.trim() && newContent.trim()) {
      const newEntry: JournalEntryType = {
        id: Date.now(),
        title: newTitle,
        content: newContent,
        date: new Date()
      };
      onSaveEntry(newEntry);
      setIsCreating(false);
    }
  };
  
  const handleStartEdit = (entry: JournalEntryType) => {
    setEditingId(entry.id);
    setNewTitle(entry.title);
    setNewContent(entry.content);
  };
  
  const handleSaveEdit = () => {
    if (editingId && newTitle.trim() && newContent.trim()) {
      const updatedEntry: JournalEntryType = {
        id: editingId,
        title: newTitle,
        content: newContent,
        date: new Date()
      };
      onSaveEntry(updatedEntry);
      setEditingId(null);
    }
  };
  
  const handleCancelEdit = () => {
    setEditingId(null);
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="text-haven-purple h-5 w-5" />
          <h2 className="text-xl font-semibold">Your Journal</h2>
        </div>
        {!isCreating && (
          <Button onClick={handleStartNewEntry}>
            <Plus className="h-4 w-4 mr-2" />
            New Entry
          </Button>
        )}
      </div>

      {isCreating && (
        <Card className="border-2 border-haven-purple animate-fade-in">
          <CardHeader>
            <Input 
              placeholder="Entry Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="text-lg font-medium"
            />
            <CardDescription className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date().toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="What's on your mind today?"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="min-h-[200px]"
            />
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCancelEdit}>
              <X className="h-4 w-4 mr-1" /> Cancel
            </Button>
            <Button onClick={handleSaveNewEntry}>
              <Save className="h-4 w-4 mr-1" /> Save
            </Button>
          </CardFooter>
        </Card>
      )}

      <div className="space-y-4">
        {entries.length === 0 && !isCreating ? (
          <div className="text-center py-16">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-2 opacity-50" />
            <h3 className="text-lg font-medium">No Journal Entries Yet</h3>
            <p className="text-muted-foreground mb-4">Start writing to track your thoughts and feelings.</p>
            <Button onClick={handleStartNewEntry}>Create Your First Entry</Button>
          </div>
        ) : (
          entries.map((entry) => (
            <Card 
              key={entry.id} 
              className={`journal-entry ${editingId === entry.id ? 'border-2 border-haven-purple' : ''}`}
            >
              <CardHeader>
                {editingId === entry.id ? (
                  <Input 
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="text-lg font-medium"
                  />
                ) : (
                  <CardTitle>{entry.title}</CardTitle>
                )}
                <CardDescription className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {entry.date.toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {editingId === entry.id ? (
                  <Textarea 
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="min-h-[150px]"
                  />
                ) : (
                  <p className="whitespace-pre-line">{entry.content}</p>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-end gap-2">
                {editingId === entry.id ? (
                  <>
                    <Button variant="outline" onClick={handleCancelEdit}>
                      <X className="h-4 w-4 mr-1" /> Cancel
                    </Button>
                    <Button onClick={handleSaveEdit}>
                      <Check className="h-4 w-4 mr-1" /> Update
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={() => onDeleteEntry(entry.id)}
                      size="icon"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleStartEdit(entry)}
                      size="icon"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default JournalEntry;
