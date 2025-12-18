import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { generateChatResponse } from '@/services/aiService';
import { useToast } from '@/hooks/use-toast';
import { Lawyer, StoredCaseData, DashboardDocument } from '@/types';
import { SIMULATED_RESPONSES, STORAGE_KEYS, FILE_UPLOAD_CONFIG } from '@/constants';
import { getUserStorageKey, getGenericStorageKey } from '@/hooks/useStorage';
import {
  Scale,
  MessageSquare,
  FileText,
  CreditCard,
  LogOut,
  Send,
  Upload,
  Download,
  Trash2,
  CheckCircle2,
  Clock,
  Paperclip,
  Star,
  User,
  Bot,
  X,
  File,
  Image,
  Bell,
  Search,
  Menu,
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'lawyer' | 'ai';
  content: string;
  timestamp: Date;
  attachments?: { name: string; url: string; type: string }[];
}

interface ChatConversation {
  id: string;
  type: 'ai' | 'lawyer';
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
  isOnline: boolean;
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [documents, setDocuments] = useState<DashboardDocument[]>([]);
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [caseData, setCaseData] = useState<StoredCaseData | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<'ai' | 'lawyer'>('ai');
  const [lawyerOnline, setLawyerOnline] = useState(false);
  const [aiMessages, setAiMessages] = useState<Message[]>([]);
  const [lawyerMessages, setLawyerMessages] = useState<Message[]>([]);

  const userId = user?.id || user?.email;

  // Get user-specific storage key (memoized to fix dependency warning)
  const getUserKey = useCallback((key: string) => {
    return getUserStorageKey(userId, key);
  }, [userId]);

  useEffect(() => {
    // Load case and lawyer data (user-specific) with error handling
    try {
      const storedLawyer = localStorage.getItem(getUserKey(STORAGE_KEYS.selectedLawyer)) ||
                          localStorage.getItem(getGenericStorageKey(STORAGE_KEYS.selectedLawyer));
      const storedCase = localStorage.getItem(getUserKey(STORAGE_KEYS.caseData)) ||
                        localStorage.getItem(getGenericStorageKey(STORAGE_KEYS.caseData));

      let lawyerData: Lawyer | null = null;
      let caseDataParsed: StoredCaseData | null = null;

      if (storedLawyer) {
        lawyerData = JSON.parse(storedLawyer);
        setLawyer(lawyerData);
      }
      if (storedCase) {
        caseDataParsed = JSON.parse(storedCase);
        setCaseData(caseDataParsed);
      }

      // Load AI messages or initialize with welcome
      const storedAiMessages = localStorage.getItem(getUserKey('fmv_ai_messages'));
      if (storedAiMessages) {
        const parsed = JSON.parse(storedAiMessages);
        setAiMessages(parsed.map((m: Message & { timestamp: string }) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        })));
      } else {
        const welcomeAiMessage: Message = {
          id: 'ai-welcome',
          sender: 'ai',
          content: `Hello! I'm your AI Legal Assistant. I've analyzed your case about "${caseDataParsed?.aiAnalysis?.category?.replace('-', ' ') || 'your legal matter'}". While you wait for ${lawyerData?.name || 'your lawyer'} to come online, feel free to ask me any questions about your case or legal matters in general. I'm here to help!`,
          timestamp: new Date(),
        };
        setAiMessages([welcomeAiMessage]);
      }

      // Load lawyer messages or initialize empty (lawyer hasn't responded yet)
      const storedLawyerMessages = localStorage.getItem(getUserKey('fmv_lawyer_messages'));
      if (storedLawyerMessages) {
        const parsed = JSON.parse(storedLawyerMessages);
        setLawyerMessages(parsed.map((m: Message & { timestamp: string }) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        })));
        // If there are lawyer messages, lawyer has responded
        if (parsed.length > 0) {
          setLawyerOnline(true);
        }
      }

      // Keep old messages for backwards compatibility
      const storedMessages = localStorage.getItem(getUserKey(STORAGE_KEYS.messages));
      if (storedMessages) {
        const parsed = JSON.parse(storedMessages);
        setMessages(parsed.map((m: Message & { timestamp: string }) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        })));
      }

      // Load user-specific documents or set mock data
      const storedDocs = localStorage.getItem(getUserKey(STORAGE_KEYS.documents));
      if (storedDocs) {
        const parsed = JSON.parse(storedDocs);
        setDocuments(parsed.map((d: DashboardDocument & { uploadedAt: string }) => ({
          ...d,
          uploadedAt: new Date(d.uploadedAt)
        })));
      } else {
        // Mock documents for demo
        setDocuments([
          {
            id: '1',
            name: 'Company Agreement Draft.pdf',
            type: 'application/pdf',
            size: '2.4 MB',
            uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
            status: 'reviewed',
          },
          {
            id: '2',
            name: 'Email Correspondence.pdf',
            type: 'application/pdf',
            size: '1.1 MB',
            uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
            status: 'pending',
          },
        ]);
      }
    } catch (error) {
      console.error('Failed to load dashboard data from localStorage:', error);
    }
  }, [getUserKey]);

  // Save messages when they change
  useEffect(() => {
    if (messages.length > 0 && user) {
      localStorage.setItem(getUserKey(STORAGE_KEYS.messages), JSON.stringify(messages));
    }
  }, [messages, user, getUserKey]);

  // Save AI messages
  useEffect(() => {
    if (aiMessages.length > 0 && user) {
      localStorage.setItem(getUserKey('fmv_ai_messages'), JSON.stringify(aiMessages));
    }
  }, [aiMessages, user, getUserKey]);

  // Save lawyer messages
  useEffect(() => {
    if (lawyerMessages.length > 0 && user) {
      localStorage.setItem(getUserKey('fmv_lawyer_messages'), JSON.stringify(lawyerMessages));
    }
  }, [lawyerMessages, user, getUserKey]);

  // Save documents when they change
  useEffect(() => {
    if (documents.length > 0 && user) {
      localStorage.setItem(getUserKey(STORAGE_KEYS.documents), JSON.stringify(documents));
    }
  }, [documents, user, getUserKey]);

  // Get current messages based on active chat
  const currentMessages = activeChat === 'ai' ? aiMessages : lawyerMessages;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: newMessage,
      timestamp: new Date(),
    };

    if (activeChat === 'ai') {
      // AI chat - get AI response
      setAiMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      setIsTyping(true);

      try {
        const response = await generateChatResponse(
          [{ role: 'user', content: newMessage }],
          {
            problem: caseData?.aiAnalysis?.processedProblem,
            category: caseData?.aiAnalysis?.category,
          }
        );

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          content: response,
          timestamp: new Date(),
        };
        setAiMessages(prev => [...prev, aiMessage]);
      } catch {
        toast({
          title: 'AI Error',
          description: 'Could not get AI response. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsTyping(false);
      }
    } else {
      // Lawyer chat
      setLawyerMessages(prev => [...prev, userMessage]);
      setNewMessage('');

      // If lawyer is not online, show waiting message
      if (!lawyerOnline) {
        toast({
          title: 'Message sent',
          description: `Waiting for ${lawyer?.name || 'your lawyer'} to come online...`,
        });
      } else {
        // Simulate lawyer response for demo
        setIsTyping(true);
        setTimeout(() => {
          const lawyerMessage: Message = {
            id: (Date.now() + 1).toString(),
            sender: 'lawyer',
            content: getSimulatedResponse(),
            timestamp: new Date(),
          };
          setLawyerMessages(prev => [...prev, lawyerMessage]);
          setIsTyping(false);
        }, 2000);
      }
    }
  };

  const getSimulatedResponse = (): string => {
    return SIMULATED_RESPONSES[Math.floor(Math.random() * SIMULATED_RESPONSES.length)];
  };

  // Simulate lawyer coming online after some time (for demo)
  useEffect(() => {
    if (!lawyerOnline && lawyerMessages.length === 0) {
      const timer = setTimeout(() => {
        setLawyerOnline(true);
        const lawyerWelcome: Message = {
          id: 'lawyer-welcome',
          sender: 'lawyer',
          content: `Hello! I'm ${lawyer?.name || 'your lawyer'}. I've reviewed your case and I'm now online to help you. Feel free to ask any questions or share additional documents.`,
          timestamp: new Date(),
        };
        setLawyerMessages([lawyerWelcome]);
        toast({
          title: `${lawyer?.name || 'Your lawyer'} is now online!`,
          description: 'You can now chat directly with your lawyer.',
        });
      }, 30000); // Lawyer comes online after 30 seconds for demo
      return () => clearTimeout(timer);
    }
  }, [lawyerOnline, lawyerMessages.length, lawyer?.name]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const newDoc: DashboardDocument = {
          id: Date.now().toString(),
          name: file.name,
          type: file.type,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          uploadedAt: new Date(),
          status: 'pending',
        };
        setDocuments(prev => [...prev, newDoc]);
      });
      toast({
        title: 'Files uploaded',
        description: `${files.length} file(s) uploaded successfully`,
      });
    }
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
    toast({
      title: 'Document deleted',
      description: 'The document has been removed',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="h-5 w-5 text-purple-500" />;
    if (type === 'application/pdf') return <FileText className="h-5 w-5 text-red-500" />;
    return <File className="h-5 w-5 text-gray-500" />;
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col lg:flex-row overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b px-4 py-3 flex items-center justify-between z-40 flex-shrink-0">
        <Link to="/" className="flex items-center gap-2">
          <Scale className="h-5 w-5 text-primary" />
          <span className="text-lg font-bold">Find My Vakeel</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setActiveTab('chat');
              setActiveChat('ai');
            }}
            className={activeChat === 'ai' && activeTab === 'chat' ? 'text-purple-600' : ''}
          >
            <Bot className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.2 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-white z-50 flex flex-col lg:hidden overflow-y-auto"
            >
              <div className="p-4 border-b flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                  <Scale className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold">Find My Vakeel</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Case Summary */}
              <div className="p-4 border-b">
                <div className="bg-primary/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-primary/20 text-primary text-xs">
                      {caseData?.aiAnalysis?.category?.replace('-', ' ') || 'Legal Case'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {caseData?.aiAnalysis?.processedProblem?.substring(0, 80) || 'Your active case'}...
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="p-4">
                <ul className="space-y-1">
                  {[
                    { id: 'chat', icon: MessageSquare, label: 'Chat' },
                    { id: 'documents', icon: FileText, label: 'Documents' },
                    { id: 'payments', icon: CreditCard, label: 'Payments' },
                  ].map(item => (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          setActiveTab(item.id);
                          setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                          activeTab === item.id
                            ? 'bg-primary text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Chat List */}
              {activeTab === 'chat' && (
                <div className="flex-1 p-4 border-t overflow-y-auto">
                  <p className="text-xs font-medium text-gray-500 mb-3">CONVERSATIONS</p>
                  <div className="space-y-2">
                    {/* AI Chat */}
                    <button
                      onClick={() => {
                        setActiveChat('ai');
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                        activeChat === 'ai' ? 'bg-purple-50 border border-purple-200' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <Bot className="h-5 w-5 text-purple-600" />
                        </div>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm">AI Assistant</p>
                        <p className="text-xs text-gray-500 truncate">
                          {aiMessages[aiMessages.length - 1]?.content.substring(0, 30) || 'Start chatting'}...
                        </p>
                      </div>
                    </button>

                    {/* Lawyer Chat */}
                    <button
                      onClick={() => {
                        setActiveChat('lawyer');
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                        activeChat === 'lawyer' ? 'bg-primary/5 border border-primary/20' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={lawyer?.avatar}
                          alt={lawyer?.name}
                          className="w-10 h-10 rounded-full bg-gray-100"
                        />
                        <span className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${
                          lawyerOnline ? 'bg-green-500' : 'bg-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900 text-sm">{lawyer?.name || 'Your Lawyer'}</p>
                          {!lawyerOnline && (
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Offline</Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 truncate">
                          {lawyerMessages.length > 0
                            ? lawyerMessages[lawyerMessages.length - 1]?.content.substring(0, 30) + '...'
                            : 'Waiting for response...'}
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* User Section */}
              <div className="p-4 border-t">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{user?.name || 'Guest User'}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email || 'demo@example.com'}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white border-r flex-col flex-shrink-0 h-screen overflow-hidden">
        <div className="p-4 border-b">
          <Link to="/" className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Find My Vakeel</span>
          </Link>
        </div>

        {/* Case Summary */}
        <div className="p-4 border-b">
          <div className="bg-primary/5 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-primary/20 text-primary">
                {caseData?.aiAnalysis?.category?.replace('-', ' ') || 'Legal Case'}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">
              {caseData?.aiAnalysis?.processedProblem?.substring(0, 100) || 'Your active case'}...
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-1">
            {[
              { id: 'chat', icon: MessageSquare, label: 'Chat' },
              { id: 'documents', icon: FileText, label: 'Documents' },
              { id: 'payments', icon: CreditCard, label: 'Payments' },
            ].map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Chat List */}
        {activeTab === 'chat' && (
          <div className="flex-1 p-4 border-t overflow-y-auto">
            <p className="text-xs font-medium text-gray-500 mb-3">CONVERSATIONS</p>
            <div className="space-y-2">
              {/* AI Chat */}
              <button
                onClick={() => setActiveChat('ai')}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                  activeChat === 'ai' ? 'bg-purple-50 border border-purple-200' : 'hover:bg-gray-50'
                }`}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm">AI Assistant</p>
                  <p className="text-xs text-gray-500 truncate">
                    {aiMessages[aiMessages.length - 1]?.content.substring(0, 30) || 'Start chatting'}...
                  </p>
                </div>
              </button>

              {/* Lawyer Chat */}
              <button
                onClick={() => setActiveChat('lawyer')}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                  activeChat === 'lawyer' ? 'bg-primary/5 border border-primary/20' : 'hover:bg-gray-50'
                }`}
              >
                <div className="relative">
                  <img
                    src={lawyer?.avatar}
                    alt={lawyer?.name}
                    className="w-10 h-10 rounded-full bg-gray-100"
                  />
                  <span className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${
                    lawyerOnline ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900 text-sm">{lawyer?.name || 'Your Lawyer'}</p>
                    {!lawyerOnline && (
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Offline</Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">
                    {lawyerMessages.length > 0
                      ? lawyerMessages[lawyerMessages.length - 1]?.content.substring(0, 30) + '...'
                      : 'Waiting for response...'}
                  </p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* User Section */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{user?.name || 'Guest User'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email || 'demo@example.com'}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => {
              logout();
              navigate('/');
            }}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Header - Desktop only */}
        <header className="hidden lg:flex bg-white border-b px-4 sm:px-6 py-4 items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
              {activeTab === 'chat' && activeChat === 'ai' && 'AI Legal Assistant'}
              {activeTab === 'chat' && activeChat === 'lawyer' && `Chat with ${lawyer?.name || 'Your Lawyer'}`}
              {activeTab === 'documents' && 'Documents'}
              {activeTab === 'payments' && 'Payments & Billing'}
            </h1>
            <p className="text-sm text-gray-500">
              {activeTab === 'chat' && activeChat === 'ai' && 'Get instant AI-powered legal guidance'}
              {activeTab === 'chat' && activeChat === 'lawyer' && (lawyerOnline ? 'Online - Secure communication channel' : 'Offline - Messages will be delivered when online')}
              {activeTab === 'documents' && 'Manage your case documents'}
              {activeTab === 'payments' && 'View and manage payments'}
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            {activeChat === 'lawyer' && (
              <Button
                variant="outline"
                onClick={() => setActiveChat('ai')}
                className="gap-2"
              >
                <Bot className="h-4 w-4" />
                <span className="hidden sm:inline">Switch to AI</span>
              </Button>
            )}
          </div>
        </header>

        {/* Mobile Tab Bar */}
        <div className="lg:hidden bg-white border-b px-2 py-2 flex gap-1 overflow-x-auto flex-shrink-0">
          {[
            { id: 'chat', icon: MessageSquare, label: 'Chat' },
            { id: 'documents', icon: FileText, label: 'Documents' },
            { id: 'payments', icon: CreditCard, label: 'Payments' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span className="hidden xs:inline">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {/* Chat Tab */}
          {activeTab === 'chat' && (
            <div className="h-full flex flex-col min-h-0">
              {/* Waiting for Lawyer Banner */}
              {activeChat === 'lawyer' && !lawyerOnline && (
                <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3 flex items-center gap-3">
                  <Clock className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-yellow-800">Waiting for {lawyer?.name || 'your lawyer'} to come online</p>
                    <p className="text-xs text-yellow-600">Your messages will be delivered when they're available. Meanwhile, chat with our AI assistant.</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => setActiveChat('ai')} className="text-xs">
                    Chat with AI
                  </Button>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4 min-h-0">
                {currentMessages.map(message => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] sm:max-w-[70%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                      {message.sender !== 'user' && (
                        <div className="flex items-center gap-2 mb-1">
                          {message.sender === 'ai' ? (
                            <Bot className="h-4 w-4 text-purple-500" />
                          ) : (
                            <img src={lawyer?.avatar} alt="" className="w-5 h-5 rounded-full" />
                          )}
                          <span className="text-xs text-gray-500">
                            {message.sender === 'ai' ? 'AI Assistant' : lawyer?.name}
                          </span>
                        </div>
                      )}
                      <div
                        className={`rounded-2xl px-3 sm:px-4 py-2 sm:py-3 ${
                          message.sender === 'user'
                            ? 'bg-primary text-white rounded-br-md'
                            : message.sender === 'ai'
                            ? 'bg-purple-100 text-purple-900 rounded-bl-md'
                            : 'bg-gray-100 text-gray-900 rounded-bl-md'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                      <p className={`text-xs text-gray-400 mt-1 ${message.sender === 'user' ? 'text-right' : ''}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-gray-500"
                  >
                    {activeChat === 'ai' ? (
                      <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                        <Bot className="h-3 w-3 text-purple-600" />
                      </div>
                    ) : (
                      <img src={lawyer?.avatar} alt="" className="w-6 h-6 rounded-full" />
                    )}
                    <div className={`rounded-full px-4 py-2 ${activeChat === 'ai' ? 'bg-purple-100' : 'bg-gray-100'}`}>
                      <span className="flex gap-1">
                        <span className={`w-2 h-2 rounded-full animate-bounce ${activeChat === 'ai' ? 'bg-purple-400' : 'bg-gray-400'}`} />
                        <span className={`w-2 h-2 rounded-full animate-bounce ${activeChat === 'ai' ? 'bg-purple-400' : 'bg-gray-400'}`} style={{ animationDelay: '0.1s' }} />
                        <span className={`w-2 h-2 rounded-full animate-bounce ${activeChat === 'ai' ? 'bg-purple-400' : 'bg-gray-400'}`} style={{ animationDelay: '0.2s' }} />
                      </span>
                    </div>
                  </motion.div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Message Input */}
              <div className={`border-t px-3 sm:px-6 py-3 sm:py-4 flex-shrink-0 ${activeChat === 'ai' ? 'bg-purple-50' : 'bg-white'}`}>
                <div className="flex items-center gap-2 sm:gap-3">
                  {activeChat === 'lawyer' && (
                    <Button variant="outline" size="icon" className="h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0" onClick={() => fileInputRef.current?.click()}>
                      <Paperclip className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  )}
                  <Input
                    placeholder={activeChat === 'ai' ? 'Ask the AI assistant...' : `Message ${lawyer?.name || 'your lawyer'}...`}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 text-sm"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isTyping || !newMessage.trim()}
                    className={`h-9 w-9 sm:h-10 sm:w-10 p-0 flex-shrink-0 ${activeChat === 'ai' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-primary hover:bg-primary/90'}`}
                  >
                    <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="h-full p-3 sm:p-6 overflow-y-auto">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4 sm:mb-6">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search documents..." className="pl-10 w-full sm:w-64" />
                </div>
                <Button onClick={() => fileInputRef.current?.click()} className="bg-primary hover:bg-primary/90">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block bg-white rounded-xl border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Name</th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Size</th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Uploaded</th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Status</th>
                      <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {documents.map(doc => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {getFileIcon(doc.type)}
                            <span className="font-medium text-gray-900">{doc.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{doc.size}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {doc.uploadedAt.toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={getStatusColor(doc.status)}>
                            {doc.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteDocument(doc.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-3">
                {documents.map(doc => (
                  <div key={doc.id} className="bg-white rounded-xl border p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getFileIcon(doc.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{doc.name}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>{doc.uploadedAt.toLocaleDateString()}</span>
                        </div>
                        <div className="mt-2">
                          <Badge className={`${getStatusColor(doc.status)} text-xs`}>
                            {doc.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleDeleteDocument(doc.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div className="h-full p-3 sm:p-6 overflow-y-auto">
              {/* Payment Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
                <div className="bg-white rounded-xl border p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500">Consultation Fee</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">₹{lawyer?.consultationFee || 2500}</p>
                  <Badge className="mt-2 bg-green-100 text-green-800 text-xs">Paid</Badge>
                </div>

                <div className="bg-white rounded-xl border p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500">Pending</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">₹0</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2">No pending payments</p>
                </div>

                <div className="bg-white rounded-xl border p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500">Total Paid</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">₹{lawyer?.consultationFee || 2500}</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2">Across 1 transaction</p>
                </div>
              </div>

              {/* Transaction History */}
              <div className="bg-white rounded-xl border overflow-hidden">
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Transaction History</h3>
                </div>
                <div className="divide-y">
                  <div className="px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">Consultation Fee - {lawyer?.name}</p>
                        <p className="text-xs sm:text-sm text-gray-500">Initial consultation payment</p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right pl-11 sm:pl-0">
                      <p className="font-medium text-gray-900 text-sm sm:text-base">₹{lawyer?.consultationFee || 2500}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};

export default Dashboard;
