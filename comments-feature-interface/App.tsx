import { CommentsSection } from "./components/CommentsSection";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-slate-100 mb-2">Discussion</h1>
          <p className="text-slate-400">Share your thoughts and engage with the community</p>
        </div>
        
        {/* Comments Section */}
        <CommentsSection />
      </div>
    </div>
  );
}