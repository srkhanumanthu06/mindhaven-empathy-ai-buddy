
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import JournalEntry, { JournalEntryType } from '@/components/journal/JournalEntry';
import { useToast } from '@/components/ui/use-toast';

const Journal = () => {
  const { toast } = useToast();
  const [entries, setEntries] = useState<JournalEntryType[]>([
    {
      id: 1,
      title: "Finding Calm in Busy Days",
      content: "Today was hectic, but I managed to take 10 minutes for myself to breathe and meditate. I'm trying to incorporate these small moments of mindfulness into my daily routine. Even though work is stressful right now, these moments help me stay centered.",
      date: new Date(Date.now() - 86400000) // Yesterday
    }
  ]);

  const handleSaveEntry = (entry: JournalEntryType) => {
    const existingIndex = entries.findIndex(e => e.id === entry.id);
    
    if (existingIndex >= 0) {
      // Update existing entry
      const updatedEntries = [...entries];
      updatedEntries[existingIndex] = entry;
      setEntries(updatedEntries);
      
      toast({
        title: "Journal updated",
        description: "Your entry has been updated successfully."
      });
    } else {
      // Add new entry
      setEntries([entry, ...entries]);
      
      toast({
        title: "Journal entry saved",
        description: "Your thoughts have been recorded successfully."
      });
    }
  };

  const handleDeleteEntry = (id: number) => {
    setEntries(entries.filter(entry => entry.id !== id));
    
    toast({
      title: "Journal entry deleted",
      description: "Your entry has been removed."
    });
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Journal</h1>
        <JournalEntry 
          entries={entries} 
          onSaveEntry={handleSaveEntry}
          onDeleteEntry={handleDeleteEntry}
        />
      </div>
    </Layout>
  );
};

export default Journal;
