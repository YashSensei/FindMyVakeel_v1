import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { processLegalProblem } from '@/services/aiService';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import {
  EXAMPLE_PROMPTS,
  FILE_UPLOAD_CONFIG,
  LEGAL_CATEGORIES,
  URGENCY_LEVELS,
  APP_CONFIG,
  STORAGE_KEYS
} from '@/constants';
import { AIAnalysis, StoredCaseData } from '@/types';
import { getUserStorageKey, getGenericStorageKey } from '@/hooks/useStorage';
import {
  Sparkles,
  Upload,
  X,
  FileText,
  Image,
  File,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  Mic,
  MicOff,
  Brain,
  Scale,
  Shield,
  Clock,
} from 'lucide-react';

const SubmitProblem = () => {
  const [problem, setProblem] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResult, setAiResult] = useState<AIAnalysis | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [step, setStep] = useState<'input' | 'processing' | 'review'>('input');
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const userId = user?.id || user?.email;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const validFiles = newFiles.filter(file => {
        return (FILE_UPLOAD_CONFIG.validTypes as readonly string[]).includes(file.type) &&
               file.size <= FILE_UPLOAD_CONFIG.maxSizeBytes;
      });
      setFiles(prev => [...prev, ...validFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <Image className="h-4 w-4" />;
    if (file.type === 'application/pdf') return <FileText className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };

  const handleSubmit = async () => {
    if (!problem.trim()) {
      toast({
        title: 'Please describe your problem',
        description: 'Tell us what legal issue you need help with.',
        variant: 'destructive',
      });
      return;
    }

    setStep('processing');
    setIsProcessing(true);

    try {
      const result = await processLegalProblem(problem);
      setAiResult(result);
      setStep('review');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      toast({
        title: 'Processing failed',
        description: errorMessage || 'Could not process your request',
        variant: 'destructive',
      });
      setStep('input');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleProceed = () => {
    // Store the result and navigate to lawyer matching (user-specific)
    const caseData: StoredCaseData = {
      originalProblem: problem,
      aiAnalysis: aiResult,
      files: files.map(f => ({ name: f.name, type: f.type, size: f.size })),
    };
    const userKey = getUserStorageKey(userId, STORAGE_KEYS.caseData);
    const genericKey = getGenericStorageKey(STORAGE_KEYS.caseData);
    localStorage.setItem(userKey, JSON.stringify(caseData));
    // Also save to generic for backwards compatibility
    localStorage.setItem(genericKey, JSON.stringify(caseData));
    navigate('/matches');
  };

  const handleEdit = () => {
    setStep('input');
    setAiResult(null);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Voice recording would be implemented here
    toast({
      title: isRecording ? 'Recording stopped' : 'Recording started',
      description: isRecording ? 'Processing your voice input...' : 'Speak your legal problem clearly.',
    });
  };

  const getCategoryColor = (category: string) => {
    const categoryData = LEGAL_CATEGORIES[category as keyof typeof LEGAL_CATEGORIES];
    return categoryData?.color || LEGAL_CATEGORIES.other.color;
  };

  const getUrgencyColor = (urgency: string) => {
    const urgencyData = URGENCY_LEVELS[urgency as keyof typeof URGENCY_LEVELS];
    return urgencyData?.color || URGENCY_LEVELS.medium.color;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-bg via-white to-primary/5">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <span className="text-lg sm:text-xl font-bold">Find My Vakeel</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>100% Confidential</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>Response in {APP_CONFIG.responseTime}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-6 sm:mb-8 overflow-x-auto">
          <div className="flex items-center gap-2 sm:gap-4 px-4">
            {['Describe Problem', 'AI Analysis', 'Find Lawyers'].map((label, index) => (
              <div key={label} className="flex items-center">
                <div className={`flex items-center gap-1.5 sm:gap-2 ${
                  index === 0 && step === 'input' ? 'text-primary' :
                  index === 1 && (step === 'processing' || step === 'review') ? 'text-primary' :
                  index < (['input', 'processing', 'review'].indexOf(step)) ? 'text-primary' :
                  'text-gray-400'
                }`}>
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0 ${
                    index <= ['input', 'processing', 'review'].indexOf(step)
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index < ['input', 'processing', 'review'].indexOf(step) ? (
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium whitespace-nowrap">{label}</span>
                </div>
                {index < 2 && (
                  <div className={`w-8 sm:w-12 h-0.5 mx-1 sm:mx-2 flex-shrink-0 ${
                    index < ['input', 'processing', 'review'].indexOf(step)
                      ? 'bg-primary'
                      : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Input Problem */}
          {step === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 px-4">
                  Tell us your legal problem
                </h1>
                <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
                  Don't worry about legal jargon. Just describe your situation in plain language -
                  our AI will understand and find the right lawyers for you.
                </p>
              </div>

              {/* Main Input Area */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border p-4 sm:p-6 space-y-4">
                <div className="relative">
                  <Textarea
                    placeholder="Describe your legal issue here... For example: 'My business partner wants to exit the company but we never had a proper agreement. They're claiming 50% ownership but I've done most of the work...'"
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    className="min-h-[180px] sm:min-h-[200px] text-base sm:text-lg resize-none border-0 focus-visible:ring-0 p-0"
                  />
                  <div className="absolute bottom-2 right-2 flex items-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={toggleRecording}
                      className={isRecording ? 'text-red-500' : 'text-gray-400'}
                    >
                      {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    </Button>
                  </div>
                </div>

                {/* File Upload */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">
                      Attach relevant documents (optional)
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Files
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept={FILE_UPLOAD_CONFIG.acceptString}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>

                  {files.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 text-sm"
                        >
                          {getFileIcon(file)}
                          <span className="max-w-[150px] truncate">{file.name}</span>
                          <button
                            onClick={() => removeFile(index)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-2">
                  <Button
                    onClick={handleSubmit}
                    size="lg"
                    className="bg-primary hover:bg-primary/90"
                    disabled={!problem.trim()}
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    Analyze with AI
                  </Button>
                </div>
              </div>

              {/* Example Prompts */}
              <div className="space-y-3 px-2">
                <p className="text-xs sm:text-sm text-gray-500 text-center">
                  Not sure what to write? Try one of these:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {EXAMPLE_PROMPTS.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => setProblem(prompt)}
                      className="text-xs sm:text-sm bg-white border rounded-full px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-gray-50 hover:border-primary transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Processing */}
          {step === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-20 space-y-6"
            >
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <Brain className="h-12 w-12 text-primary animate-pulse" />
                </div>
                <div className="absolute -inset-4 rounded-full border-4 border-primary/20 animate-spin" style={{ animationDuration: '3s' }} />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  AI is analyzing your problem
                </h2>
                <p className="text-gray-600 max-w-md">
                  We're understanding your situation and preparing it for the right legal experts...
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>This usually takes 10-15 seconds</span>
              </div>
            </motion.div>
          )}

          {/* Step 3: Review AI Analysis */}
          {step === 'review' && aiResult && (
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2 px-4">
                <div className="flex items-center justify-center gap-2 text-primary">
                  <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="text-sm sm:text-base font-medium">Analysis Complete</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Here's what we understood
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                  Review the AI analysis below. Edit if needed, or proceed to find matching lawyers.
                </p>
              </div>

              {/* AI Analysis Card */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 sm:p-6 border-b">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(aiResult.category)}`}>
                          {aiResult.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                        <span className={`flex items-center gap-1 text-sm font-medium ${getUrgencyColor(aiResult.urgency)}`}>
                          <AlertCircle className="h-4 w-4" />
                          {aiResult.urgency.charAt(0).toUpperCase() + aiResult.urgency.slice(1)} Urgency
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Complexity: {aiResult.estimatedComplexity.charAt(0).toUpperCase() + aiResult.estimatedComplexity.slice(1)}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleEdit}>
                      Edit
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  {/* Processed Problem */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      Legal Summary
                    </h3>
                    <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                      {aiResult.processedProblem}
                    </p>
                  </div>

                  {/* Key Facts */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Key Facts Identified</h3>
                    <ul className="space-y-2">
                      {aiResult.keyFacts.map((fact, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Suggested Actions */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Suggested Next Steps</h3>
                    <ul className="space-y-2">
                      {aiResult.suggestedActions.map((action, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700">
                          <ArrowRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Original Input */}
                  <div className="border-t pt-4">
                    <details className="group">
                      <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                        View original input
                      </summary>
                      <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {problem}
                      </p>
                    </details>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-4 sm:px-6 py-4 border-t flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
                  <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                    This analysis will be sent to matching lawyers
                  </p>
                  <Button onClick={handleProceed} size="lg" className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                    Find Matching Lawyers
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default SubmitProblem;
