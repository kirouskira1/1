import React from 'react';
import FeedGrid from './FeedGrid';
import { useAuth } from '@/hooks/useAuth';

const SocialFeed: React.FC = () => {
  const { user } = useAuth();

  return (
    <section className="relative py-12 px-4 md:px-6">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/recife-aerial.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.15, // Adjust this value to control opacity
        }}
      />
      
      {/* Content with glass effect */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold heading-gradient">Editais em destaque</h2>
            <p className="text-muted-foreground mt-2">
              Descubra oportunidades para artistas do Nordeste brasileiro
            </p>
          </div>
        </div>
        
        <div className="mt-8 relative">
          <FeedGrid />
        </div>
      </div>
    </section>
  );
};

export default SocialFeed;
