import React, { useState, useEffect } from 'react';
import PublicPostCard from './PublicPostCard';
import { mockPosts, PublicPost } from '@/lib/extendedMockData';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FeedGrid = () => {
  const [posts, setPosts] = useState<PublicPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Mock posts loaded, count:', mockPosts.length); 
        setPosts(mockPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  const scrollContainer = React.useRef<HTMLDivElement>(null);

  const scroll = (scrollOffset: number) => {
    if (scrollContainer.current) {
      const newPosition = scrollPosition + scrollOffset;
      scrollContainer.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
    }
  };

  return (
    <div className="relative">
      {/* Navigation arrows */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full bg-white shadow-lg border-gray-200"
          onClick={() => scroll(-300)}
          disabled={scrollPosition <= 0 || loading}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
        <Button 
          variant="outline" 
          size="icon"
          className="rounded-full bg-white shadow-lg border-gray-200"
          onClick={() => scroll(300)}
          disabled={loading}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Horizontal scrollable container */}
      <div 
        ref={scrollContainer}
        className="flex overflow-x-auto pb-4 pt-2 px-4 snap-x snap-mandatory gap-6 scroll-smooth hide-scrollbar"
      >
        {loading 
          ? Array.from({ length: 4 }).map((_, index) => (
              <div key={`skeleton-${index}`} className="flex-shrink-0 w-[300px] snap-start">
                <div className="flex flex-col gap-2">
                  <Skeleton className="w-[300px] h-[200px] rounded-md" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              </div>
            ))
          : posts.map((post) => (
              <div key={post.id} className="flex-shrink-0 w-[300px] snap-start">
                <PublicPostCard post={post} />
              </div>
            ))
        }
      </div>
      
      {/* Dots indicator */}
      {!loading && (
        <div className="flex justify-center gap-2 mt-4">
          {posts.map((post, index) => (
            <button 
              key={`dot-${post.id}`}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === Math.floor(scrollPosition / 300) 
                  ? 'bg-artmatch-purple' 
                  : 'bg-gray-300'
              }`}
              onClick={() => {
                if (scrollContainer.current) {
                  const newPosition = 300 * index;
                  scrollContainer.current.scrollTo({
                    left: newPosition,
                    behavior: 'smooth'
                  });
                  setScrollPosition(newPosition);
                }
              }}
              aria-label={`Go to post ${index + 1}`}
            />
          ))}
        </div>
      )}
      

    </div>
  );
};

export default FeedGrid;
