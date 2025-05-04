
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  SmilePlus, Smile, Meh, Frown, FrownOpen, 
  Sun, CloudRain, Cloud, Zap, Calendar 
} from 'lucide-react';

type Mood = 'great' | 'good' | 'okay' | 'bad' | 'awful';
type Factor = 'weather' | 'sleep' | 'stress' | 'activity' | 'social';

interface MoodEntry {
  date: Date;
  mood: Mood;
  factors: Factor[];
  note?: string;
}

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [selectedFactors, setSelectedFactors] = useState<Factor[]>([]);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([
    { 
      date: new Date(Date.now() - 86400000), // Yesterday
      mood: 'good',
      factors: ['sleep', 'activity']
    },
    { 
      date: new Date(Date.now() - 172800000), // 2 days ago
      mood: 'okay',
      factors: ['stress', 'weather']
    }
  ]);

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
  };

  const handleFactorToggle = (factor: Factor) => {
    if (selectedFactors.includes(factor)) {
      setSelectedFactors(selectedFactors.filter(f => f !== factor));
    } else {
      setSelectedFactors([...selectedFactors, factor]);
    }
  };

  const handleSaveMood = () => {
    if (!selectedMood) return;
    
    const newEntry: MoodEntry = {
      date: new Date(),
      mood: selectedMood,
      factors: selectedFactors
    };
    
    setMoodHistory([newEntry, ...moodHistory]);
    setSelectedMood(null);
    setSelectedFactors([]);
  };

  const getMoodIcon = (mood: Mood) => {
    switch (mood) {
      case 'great': return <SmilePlus className="w-6 h-6" />;
      case 'good': return <Smile className="w-6 h-6" />;
      case 'okay': return <Meh className="w-6 h-6" />;
      case 'bad': return <Frown className="w-6 h-6" />;
      case 'awful': return <FrownOpen className="w-6 h-6" />;
    }
  };

  const getMoodColor = (mood: Mood) => {
    switch (mood) {
      case 'great': return 'text-green-500';
      case 'good': return 'text-emerald-400';
      case 'okay': return 'text-yellow-400';
      case 'bad': return 'text-orange-400';
      case 'awful': return 'text-red-400';
    }
  };

  const getFactorIcon = (factor: Factor) => {
    switch (factor) {
      case 'weather': return <Cloud className="w-4 h-4" />;
      case 'sleep': return <Calendar className="w-4 h-4" />;
      case 'stress': return <Zap className="w-4 h-4" />;
      case 'activity': return <Sun className="w-4 h-4" />;
      case 'social': return <CloudRain className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>How are you feeling today?</CardTitle>
          <CardDescription>Track your mood and what might be affecting it</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Select your mood:</h3>
              <div className="flex justify-between">
                {(['great', 'good', 'okay', 'bad', 'awful'] as Mood[]).map(mood => (
                  <div 
                    key={mood} 
                    onClick={() => handleMoodSelect(mood)}
                    className={`cursor-pointer flex flex-col items-center p-3 rounded-lg mood-indicator ${
                      selectedMood === mood ? 'bg-secondary' : ''
                    }`}
                  >
                    <span className={getMoodColor(mood)}>{getMoodIcon(mood)}</span>
                    <span className="text-xs mt-1 capitalize">{mood}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">What factors are affecting your mood?</h3>
              <div className="grid grid-cols-5 gap-2">
                {(['weather', 'sleep', 'stress', 'activity', 'social'] as Factor[]).map(factor => (
                  <Button
                    key={factor}
                    variant={selectedFactors.includes(factor) ? "default" : "outline"}
                    onClick={() => handleFactorToggle(factor)}
                    className="flex flex-col h-auto py-2 gap-1"
                  >
                    {getFactorIcon(factor)}
                    <span className="text-xs capitalize">{factor}</span>
                  </Button>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleSaveMood} 
              disabled={!selectedMood}
              className="w-full"
            >
              Save Today's Mood
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Recent Moods</CardTitle>
          <CardDescription>See how you've been feeling lately</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {moodHistory.length === 0 ? (
              <p className="text-center text-muted-foreground py-6">No mood entries yet. Start tracking your mood above!</p>
            ) : (
              moodHistory.map((entry, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`${getMoodColor(entry.mood)}`}>
                      {getMoodIcon(entry.mood)}
                    </div>
                    <div>
                      <p className="font-medium capitalize">{entry.mood}</p>
                      <p className="text-xs text-muted-foreground">
                        {entry.date.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {entry.factors.map(factor => (
                      <span key={factor} className="text-muted-foreground">
                        {getFactorIcon(factor)}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodTracker;
