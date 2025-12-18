import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { authAPI } from '@/services/api';
import {
  Scale,
  User,
  Mail,
  Phone,
  Camera,
  ArrowLeft,
  Save,
  LayoutDashboard,
  Loader2,
} from 'lucide-react';

const AVATAR_CONFIG = {
  maxSizeBytes: 1 * 1024 * 1024, // 1MB (reduced for better upload success)
  maxSizeMB: 1,
  validTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  acceptString: 'image/jpeg,image/png,image/gif,image/webp',
};

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // Generate avatar URL (fallback to DiceBear if no custom avatar)
  const avatarSeed = user?.name || user?.email || 'user';
  const defaultAvatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(avatarSeed)}`;
  const avatarUrl = user?.avatar || defaultAvatarUrl;

  const handleAvatarClick = () => {
    avatarInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!AVATAR_CONFIG.validTypes.includes(file.type)) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a JPEG, PNG, GIF, or WebP image.',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size
    if (file.size > AVATAR_CONFIG.maxSizeBytes) {
      toast({
        title: 'File too large',
        description: `Please upload an image smaller than ${AVATAR_CONFIG.maxSizeMB}MB.`,
        variant: 'destructive',
      });
      return;
    }

    setIsUploadingAvatar(true);

    try {
      // Convert to base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // Save to MongoDB via API
      const { user: updatedUser } = await authAPI.updateProfile({ avatar: base64 });

      // Update user context with server response
      updateUser({ avatar: updatedUser.avatar });

      toast({
        title: 'Profile picture updated',
        description: 'Your new profile picture has been saved.',
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Could not save the image.';
      const is413Error = errorMessage.includes('413') || errorMessage.includes('Payload Too Large');
      
      toast({
        title: 'Upload failed',
        description: is413Error 
          ? 'Image file is too large. Please upload a smaller image (under 1MB) or compress it first.'
          : errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsUploadingAvatar(false);
      // Reset input so same file can be selected again
      if (avatarInputRef.current) {
        avatarInputRef.current.value = '';
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // In a real app, this would call the API
      updateUser({ name: formData.name, phone: formData.phone });
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: 'Update failed',
        description: 'Could not update profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-bg via-white to-primary/5">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Scale className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <span className="text-lg sm:text-xl font-bold">Find My Vakeel</span>
          </Link>
          <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm">
            <Link to="/dashboard">
              <LayoutDashboard className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Dashboard</span>
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-2xl">
        {/* Back Link */}
        <Link
          to="/dashboard"
          className="inline-flex items-center text-xs sm:text-sm text-muted-foreground hover:text-foreground mb-4 sm:mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl sm:rounded-2xl shadow-lg border overflow-hidden"
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 px-4 sm:px-6 py-6 sm:py-8 text-white">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
              <div className="relative flex-shrink-0">
                <img
                  src={avatarUrl}
                  alt={user?.name || 'User'}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/20 border-4 border-white/30 object-cover"
                />
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept={AVATAR_CONFIG.acceptString}
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <button
                  onClick={handleAvatarClick}
                  disabled={isUploadingAvatar}
                  className="absolute bottom-0 right-0 p-1.5 sm:p-2 bg-white rounded-full text-primary shadow-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                  {isUploadingAvatar ? (
                    <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                  ) : (
                    <Camera className="h-3 w-3 sm:h-4 sm:w-4" />
                  )}
                </button>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">{user?.name || 'User'}</h1>
                <p className="text-white/80 text-sm sm:text-base break-all">{user?.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-xs sm:text-sm">
                  {user?.role === 'client' ? 'Client' : user?.role}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Personal Information</h2>
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="self-start sm:self-auto">
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2 self-start sm:self-auto">
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Saving...
                      </span>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>

            <div className="grid gap-4 sm:gap-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Full Name
                </Label>
                {isEditing ? (
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="text-sm"
                  />
                ) : (
                  <p className="text-foreground py-2 text-sm sm:text-base">{user?.name || 'Not set'}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  Email Address
                </Label>
                <p className="text-foreground py-2 text-sm sm:text-base break-all">{user?.email}</p>
                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  Phone Number
                </Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="text-sm"
                  />
                ) : (
                  <p className="text-foreground py-2 text-sm sm:text-base">{user?.phone || 'Not set'}</p>
                )}
              </div>
            </div>

            {/* Account Stats */}
            <div className="border-t pt-4 sm:pt-6 mt-4 sm:mt-6">
              <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-3 sm:mb-4">Account Activity</h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <p className="text-xl sm:text-2xl font-bold text-primary">1</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Active Cases</p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <p className="text-xl sm:text-2xl font-bold text-primary">2</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Documents</p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <p className="text-xl sm:text-2xl font-bold text-primary">5</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Messages</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;
