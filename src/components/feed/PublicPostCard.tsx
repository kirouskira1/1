import React, { useState } from 'react';
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Heart, MessageSquare, Share2, Image as ImageIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import { PublicPost } from '@/lib/extendedMockData';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PublicPostCardProps {
  post: PublicPost;
}

const PublicPostCard: React.FC<PublicPostCardProps> = ({ post }) => {
  const { ref, isVisible } = useScrollAnimation();
  const { user, setShowAuthModal, setInitialAuthMode } = useAuth();
  const [imageError, setImageError] = useState(false);
  
  const handleInteraction = () => {
    if (!user) {
      setInitialAuthMode('login');
      setShowAuthModal(true);
    }
  };

  console.log('Rendering post:', post.id, 'with image:', post.imageUrl, 'and avatar:', post.artist.avatarUrl);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-opacity duration-700 cursor-pointer ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleInteraction}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
        <div className="p-3 flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.artist.avatarUrl} alt={post.artist.name} />
            <AvatarFallback>{post.artist.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="font-medium text-sm truncate">{post.artist.name}</p>
            <Badge variant="outline" className="text-xs bg-artmatch-purple/10 text-artmatch-purple">
              {post.artist.region}
            </Badge>
          </div>
        </div>
        
        <div className="relative w-full h-[200px] overflow-hidden bg-muted">
          {imageError ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400">
              <ImageIcon className="w-8 h-8 mb-2" />
              <span className="text-sm">Arte Nordestina</span>
            </div>
          ) : (
            <img
              src={post.imageUrl}
              alt={post.caption}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          )}
        </div>
        
        <CardContent className="p-3 flex-grow">
          <h3 className="font-medium text-sm line-clamp-2">{post.caption}</h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            Edital aberto para artistas do {post.artist.region}
          </p>
        </CardContent>
        
        <CardFooter className="p-3 pt-0 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1 p-1 text-muted-foreground hover:text-artmatch-purple"
              onClick={handleInteraction}
            >
              <Heart className="h-4 w-4" />
              <span className="text-xs">{post.stats.likeCount}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1 p-1 text-muted-foreground hover:text-artmatch-purple"
              onClick={handleInteraction}
            >
              <MessageSquare className="h-4 w-4" />
              <span className="text-xs">{post.stats.commentCount}</span>
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            className="p-1 text-muted-foreground hover:text-artmatch-purple"
            onClick={handleInteraction}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PublicPostCard;
