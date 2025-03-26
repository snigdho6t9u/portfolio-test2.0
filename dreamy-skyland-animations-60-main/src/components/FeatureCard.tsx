
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: string;
}

const FeatureCard = ({ title, description, icon, delay = 'animate-fade-in-up' }: FeatureCardProps) => {
  return (
    <div className={cn(
      'glass rounded-xl p-6 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1',
      delay
    )}>
      <div className="rounded-full w-12 h-12 flex items-center justify-center bg-sky-dark text-white mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/80">{description}</p>
    </div>
  );
};

export default FeatureCard;
