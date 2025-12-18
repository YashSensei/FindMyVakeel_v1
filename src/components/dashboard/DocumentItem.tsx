import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Trash2, FileText, Image, File } from 'lucide-react';
import { DashboardDocument } from '@/types';

interface DocumentItemProps {
  document: DashboardDocument;
  onDelete: (id: string) => void;
  variant?: 'table' | 'card';
}

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

const DocumentItem = memo(({ document, onDelete, variant = 'card' }: DocumentItemProps) => {
  const uploadedAt = document.uploadedAt instanceof Date
    ? document.uploadedAt
    : new Date(document.uploadedAt);

  if (variant === 'table') {
    return (
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            {getFileIcon(document.type)}
            <span className="font-medium text-gray-900">{document.name}</span>
          </div>
        </td>
        <td className="px-6 py-4 text-sm text-gray-500">{document.size}</td>
        <td className="px-6 py-4 text-sm text-gray-500">
          {uploadedAt.toLocaleDateString()}
        </td>
        <td className="px-6 py-4">
          <Badge className={getStatusColor(document.status)}>
            {document.status}
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
              onClick={() => onDelete(document.id)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </td>
      </tr>
    );
  }

  // Card variant for mobile
  return (
    <div className="bg-white rounded-xl border p-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {getFileIcon(document.type)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 truncate">{document.name}</p>
          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
            <span>{document.size}</span>
            <span>•</span>
            <span>{uploadedAt.toLocaleDateString()}</span>
          </div>
          <div className="mt-2">
            <Badge className={`${getStatusColor(document.status)} text-xs`}>
              {document.status}
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
            onClick={() => onDelete(document.id)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </div>
    </div>
  );
});

DocumentItem.displayName = 'DocumentItem';

export default DocumentItem;
