import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { MOCK_LAWYERS, APP_CONFIG, STORAGE_KEYS } from '@/constants';
import { Lawyer, StoredCaseData } from '@/types';
import { getUserStorageKey, getGenericStorageKey } from '@/hooks/useStorage';
import {
  Scale,
  Star,
  MapPin,
  Clock,
  CheckCircle2,
  MessageSquare,
  Briefcase,
  Award,
  ArrowRight,
  Loader2,
  Languages,
  IndianRupee,
  Shield,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';

const LawyerMatches = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [selectedLawyer, setSelectedLawyer] = useState<string | null>(null);
  const [expandedLawyer, setExpandedLawyer] = useState<string | null>(null);
  const [caseData, setCaseData] = useState<StoredCaseData | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const userId = user?.id || user?.email;

  useEffect(() => {
    // Get case data from localStorage (check user-specific first, then generic)
    const userKey = getUserStorageKey(userId, STORAGE_KEYS.caseData);
    const genericKey = getGenericStorageKey(STORAGE_KEYS.caseData);
    const stored = localStorage.getItem(userKey) || localStorage.getItem(genericKey);
    if (stored) {
      setCaseData(JSON.parse(stored));
    }

    // Simulate finding lawyers
    const timer = setTimeout(() => {
      setLawyers(MOCK_LAWYERS);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [userId]);

  const handleSelectLawyer = (lawyerId: string) => {
    setSelectedLawyer(lawyerId);
  };

  const handleProceed = () => {
    if (!selectedLawyer) {
      toast({
        title: 'Select a lawyer',
        description: 'Please select a lawyer to proceed.',
        variant: 'destructive',
      });
      return;
    }

    const lawyer = lawyers.find(l => l.id === selectedLawyer);
    const userKey = getUserStorageKey(userId, STORAGE_KEYS.selectedLawyer);
    const genericKey = getGenericStorageKey(STORAGE_KEYS.selectedLawyer);
    // Save to user-specific key
    localStorage.setItem(userKey, JSON.stringify(lawyer));
    // Also save to generic for backwards compatibility
    localStorage.setItem(genericKey, JSON.stringify(lawyer));
    navigate('/dashboard');
  };

  const toggleExpand = (lawyerId: string) => {
    setExpandedLawyer(expandedLawyer === lawyerId ? null : lawyerId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-bg via-white to-primary/5 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4 sm:space-y-6 max-w-md"
        >
          <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <Scale className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
            </div>
            <div className="absolute -inset-3 sm:-inset-4 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Finding the best lawyers for you</h2>
            <p className="text-sm sm:text-base text-gray-600">Matching your case with our network of {APP_CONFIG.lawyerCount} legal experts...</p>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>This usually takes 15-30 seconds</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-bg via-white to-primary/5">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <span className="text-lg sm:text-xl font-bold">Find My Vakeel</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
            <Shield className="h-4 w-4 text-primary" />
            <span>All lawyers are verified</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-8 space-y-2 px-4"
        >
          <div className="flex items-center justify-center gap-2 text-primary">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base font-medium">AI Match Complete</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            We found {lawyers.length} lawyers for your case
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            These lawyers specialize in{' '}
            <span className="font-medium text-primary">
              {caseData?.aiAnalysis?.category?.replace('-', ' ') || 'your legal area'}
            </span>
            {' '}and are ready to help. Select one to proceed.
          </p>
        </motion.div>

        {/* Lawyer Cards */}
        <div className="space-y-3 sm:space-y-4">
          {lawyers.map((lawyer, index) => (
            <motion.div
              key={lawyer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl border-2 overflow-hidden transition-all ${
                selectedLawyer === lawyer.id
                  ? 'border-primary shadow-lg shadow-primary/20'
                  : 'border-transparent shadow hover:shadow-md'
              }`}
            >
              <div
                className="p-4 sm:p-6 cursor-pointer"
                onClick={() => handleSelectLawyer(lawyer.id)}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Avatar & Selection */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={lawyer.avatar}
                      alt={lawyer.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl bg-gray-100"
                    />
                    {selectedLawyer === lawyer.id && (
                      <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-1">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                    )}
                    {lawyer.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-0.5">
                        <Shield className="h-3 w-3" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 break-words">{lawyer.name}</h3>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1 text-xs sm:text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden xs:inline">{lawyer.experience} years</span>
                            <span className="xs:hidden">{lawyer.experience}y</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                            {lawyer.location.city}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-yellow-500" />
                            {lawyer.rating} ({lawyer.reviewCount})
                          </span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="bg-primary/10 text-primary font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm">
                          {lawyer.matchScore}%
                        </div>
                      </div>
                    </div>

                    {/* Specializations */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                      {lawyer.specializations.slice(0, 3).map(spec => (
                        <Badge key={spec} variant="secondary" className="text-[10px] sm:text-xs px-2 py-0.5">
                          {spec.replace('-', ' ')}
                        </Badge>
                      ))}
                      {lawyer.specializations.length > 3 && (
                        <Badge variant="secondary" className="text-[10px] sm:text-xs px-2 py-0.5">
                          +{lawyer.specializations.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Quick Stats */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-3 text-xs sm:text-sm">
                      <span className="flex items-center gap-1 text-gray-600">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                        {lawyer.responseTime}
                      </span>
                      <span className="flex items-center gap-1 text-gray-600">
                        <Award className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                        {lawyer.successRate}%
                      </span>
                      <span className="flex items-center gap-1 text-gray-600">
                        <IndianRupee className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                        ₹{lawyer.consultationFee}
                      </span>
                    </div>
                  </div>

                  {/* Expand Toggle */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(lawyer.id);
                    }}
                  >
                    {expandedLawyer === lawyer.id ? (
                      <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </Button>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedLawyer === lawyer.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1.5 sm:mb-2 text-sm sm:text-base">About</h4>
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{lawyer.bio}</p>
                        </div>
                        <div className="space-y-2 sm:space-y-3">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">Languages</h4>
                            <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                              <Languages className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                              <span className="line-clamp-2">{lawyer.languages.join(', ')}</span>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">Track Record</h4>
                            <p className="text-xs sm:text-sm text-gray-600">
                              {lawyer.casesHandled} cases · {lawyer.successRate}% success
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 sm:mt-8 bg-white rounded-xl border p-4 sm:p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4"
        >
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
              {selectedLawyer
                ? `Selected: ${lawyers.find(l => l.id === selectedLawyer)?.name}`
                : 'Select a lawyer to proceed'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              You can chat with your lawyer and manage everything in your dashboard
            </p>
          </div>
          <Button
            onClick={handleProceed}
            size="lg"
            className="bg-primary hover:bg-primary/90 w-full sm:w-auto flex-shrink-0"
            disabled={!selectedLawyer}
          >
            <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            <span className="hidden sm:inline">Start Consultation</span>
            <span className="sm:hidden">Start</span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default LawyerMatches;
