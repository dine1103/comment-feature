import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Heart, MessageCircle, MoreHorizontal, Reply } from "lucide-react";

interface CommentProps {
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

export function Comment({ 
  author, 
  content, 
  timestamp, 
  likes, 
  replies, 
  isLiked = false 
}: CommentProps) {
  return (
    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8 mt-1">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback className="bg-slate-600 text-slate-200">
            {author.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-slate-200 text-sm">{author.name}</span>
            <span className="text-slate-400 text-xs">@{author.username}</span>
            <span className="text-slate-500 text-xs">•</span>
            <span className="text-slate-500 text-xs">{timestamp}</span>
          </div>
          
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            {content}
          </p>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`h-8 gap-2 text-xs ${
                isLiked 
                  ? 'text-red-400 hover:text-red-300' 
                  : 'text-slate-400 hover:text-slate-300'
              } hover:bg-slate-700/50`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              {likes}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 gap-2 text-xs text-slate-400 hover:text-slate-300 hover:bg-slate-700/50"
            >
              <MessageCircle className="h-4 w-4" />
              {replies}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 gap-2 text-xs text-slate-400 hover:text-slate-300 hover:bg-slate-700/50"
            >
              <Reply className="h-4 w-4" />
              Reply
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 ml-auto text-slate-400 hover:text-slate-300 hover:bg-slate-700/50"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}