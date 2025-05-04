
import Layout from '@/components/layout/Layout';
import ChatInterface from '@/components/chat/ChatInterface';

const Chat = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">AI Chat Support</h1>
        <ChatInterface />
      </div>
    </Layout>
  );
};

export default Chat;
