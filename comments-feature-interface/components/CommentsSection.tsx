import { useState } from "react";
import { Comment } from "./Comment";
import { CommentForm } from "./CommentForm";
import { MessageSquare, Filter, SortDesc } from "lucide-react";
import { Button } from "./ui/button";

interface CommentData {
  id: string;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  isLiked?: boolean;
}

const initialComments: CommentData[] = [
  {
    id: "1",
    author: {
      name: "Sarah Chen",
      avatar: "/api/placeholder/32/32",
      username: "sarahc"
    },
    content: "This is exactly what I was looking for! The implementation looks clean and the user experience is intuitive. I especially like how the comment threading works.",
    timestamp: "2 hours ago",
    likes: 24,
    replies: 3,
    isLiked: true
  },
  {
    id: "2",
    author: {
      name: "Alex Rodriguez",
      avatar: "/api/placeholder/32/32",
      username: "alexr"
    },
    content: "Great work on this feature! One small suggestion - maybe we could add syntax highlighting for code snippets in comments? That would be really helpful for technical discussions.",
    timestamp: "4 hours ago",
    likes: 12,
    replies: 1
  },
  {
    id: "3",
    author: {
      name: "Emily Watson",
      avatar: "/api/placeholder/32/32",
      username: "emilyw"
    },
    content: "Love the dark theme! The contrast is perfect and it's easy on the eyes during long development sessions. The comment system feels very responsive too.",
    timestamp: "6 hours ago",
    likes: 8,
    replies: 0
  },
  {
    id: "4",
    author: {
      name: "Michael Kim",
      avatar: "/api/placeholder/32/32",
      username: "michaelk"
    },
    content: "This comment system has all the features I need. The ability to like, reply, and the clean formatting make it perfect for our team collaboration.",
    timestamp: "1 day ago",
    likes: 15,
    replies: 2
  }
];

export function CommentsSection() {
  const [comments, setComments] = useState<CommentData[]>(initialComments);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "popular">("newest");

  const handleAddComment = (content: string) => {
    const newComment: CommentData = {
      id: Date.now().toString(),
      author: {
        name: "You",
        avatar: "/api/placeholder/32/32",
        username: "you"
      },
      content,
      timestamp: "just now",
      likes: 0,
      replies: 0,
      isLiked: false
    };
    setComments([newComment, ...comments]);
  };

  const sortedComments = [...comments].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.likes - a.likes;
      case "oldest":
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      case "newest":
      default:
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-6 w-6 text-slate-300" />
          <h2 className="text-slate-200">Comments ({comments.length})</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-slate-400 hover:text-slate-300 hover:bg-slate-700/50"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-slate-400 hover:text-slate-300 hover:bg-slate-700/50"
          >
            <SortDesc className="h-4 w-4 mr-2" />
            Sort by {sortBy}
          </Button>
        </div>
      </div>

      {/* Add Comment Form */}
      <CommentForm onSubmit={handleAddComment} />

      {/* Comments List */}
      <div className="space-y-4">
        {sortedComments.map((comment) => (
          <Comment key={comment.id} {...comment} />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button 
          variant="ghost" 
          className="text-slate-400 hover:text-slate-300 hover:bg-slate-700/50"
        >
          Load more comments
        </Button>
      </div>
    </div>
  );
}