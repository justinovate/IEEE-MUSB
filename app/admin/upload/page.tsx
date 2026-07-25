'use client';

import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Database, CheckCircle2, FileCheck } from 'lucide-react';

export default function AdminUploadPage() {
  const [selectedBucket, setSelectedBucket] = useState<'officer-photos' | 'announcement-images' | 'event-posters'>('officer-photos');
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; url: string; bucket: string }[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const mockUrl = URL.createObjectURL(file);
      setUploadedFiles([
        { name: file.name, url: mockUrl, bucket: selectedBucket },
        ...uploadedFiles,
      ]);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Database className="w-6 h-6 text-amber-400" />
          <span>Supabase Storage Photo Upload Hub</span>
        </h1>
        <p className="text-xs text-slate-400">
          Upload officer avatars, event posters, and announcement cover images directly to Supabase Buckets.
        </p>
      </div>

      {/* Bucket Selector Pills */}
      <div className="flex items-center gap-3">
        {[
          { id: 'officer-photos', label: 'officer-photos bucket' },
          { id: 'announcement-images', label: 'announcement-images bucket' },
          { id: 'event-posters', label: 'event-posters bucket' },
        ].map((b) => (
          <button
            key={b.id}
            onClick={() => setSelectedBucket(b.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              selectedBucket === b.id
                ? 'bg-[#00629B] text-white shadow-md'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>

      {/* Drag and Drop Zone */}
      <div className="p-12 rounded-3xl bg-slate-900 border-2 border-dashed border-slate-700 text-center space-y-4 shadow-2xl hover:border-[#00629B] transition-colors">
        <div className="w-16 h-16 rounded-2xl bg-[#00629B]/10 text-[#00629B] dark:text-blue-400 flex items-center justify-center mx-auto">
          <Upload className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h3 className="text-base font-bold text-white">
            Upload images to <span className="font-mono text-blue-400">{selectedBucket}</span>
          </h3>
          <p className="text-xs text-slate-400">
            Supports PNG, JPG, WebP up to 5MB. RLS public read policies enforced.
          </p>
        </div>

        <div>
          <label className="px-6 py-3 rounded-xl text-xs font-bold btn-ieee-primary inline-flex items-center gap-2 cursor-pointer shadow-lg">
            <ImageIcon className="w-4 h-4" />
            <span>Select Image File</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Uploaded Files Log */}
      {uploadedFiles.length > 0 && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Uploaded Assets History</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {uploadedFiles.map((file, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-slate-800 border border-slate-700 space-y-2 text-xs"
              >
                <div className="h-32 w-full rounded-xl overflow-hidden bg-slate-950">
                  <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                </div>
                <div className="font-bold text-white truncate">{file.name}</div>
                <div className="font-mono text-[10px] text-blue-400">{file.bucket}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
