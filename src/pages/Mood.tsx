
import Layout from '@/components/layout/Layout';
import MoodTracker from '@/components/mood/MoodTracker';

const Mood = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Mood Tracker</h1>
        <MoodTracker />
      </div>
    </Layout>
  );
};

export default Mood;
