import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { ImageIcon, Smile } from "lucide-react";

interface CommentFormProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
}

export function CommentForm({ onSubmit, placeholder = "Add your comment here..." }: CommentFormProps) {
  const [content, setContent] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent("");
      setIsExpanded(false);
    }
  };

  return (
    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8 mt-1">
          <AvatarImage src="/api/placeholder/32/32" alt="Your avatar" />
          <AvatarFallback className="bg-slate-600 text-slate-200">
            YU
          </AvatarFallback>
        </Avatar>
        
        <form onSubmit={handleSubmit} className="flex-1 min-w-0">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder={placeholder}
            className="min-h-[80px] bg-slate-900/50 border-slate-600 text-slate-200 placeholder:text-slate-500 resize-none focus:border-slate-500 focus:ring-slate-500"
            rows={isExpanded ? 4 : 3}
          />
          
          {isExpanded && (
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <Button 
                  type="button"
                  variant="ghost" 
                  size="sm" 
                  className="h-8 text-slate-400 hover:text-slate-300 hover:bg-slate-700/50"
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button 
                  type="button"
                  variant="ghost" 
                  size="sm" 
                  className="h-8 text-slate-400 hover:text-slate-300 hover:bg-slate-700/50"
                >
                  <Smile className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  type="button"
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setIsExpanded(false);
                    setContent("");
                  }}
                  className="h-8 text-slate-400 hover:text-slate-300"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={!content.trim()}
                  className="h-8 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Comment
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}