'use client';

import React, { useState } from 'react';
import { QrCode, Camera, CheckCircle2, AlertCircle, Scan, UserCheck, Clock } from 'lucide-react';

interface ScannedRecord {
  id: string;
  name: string;
  studentNo: string;
  ieeeNo: string;
  program: string;
  timestamp: string;
  status: 'SUCCESS' | 'DUPLICATE';
}

export default function AdminScannerPage() {
  const [manualCode, setManualCode] = useState('IEEE-99887766');
  const [scannedLogs, setScannedLogs] = useState<ScannedRecord[]>([]);
  const [lastScanned, setLastScanned] = useState<ScannedRecord | null>(null);

  const handleScan = (codeToScan: string) => {
    const isDuplicate = scannedLogs.some((l) => l.ieeeNo === codeToScan);
    const newRecord: ScannedRecord = {
      id: Math.random().toString(),
      name: codeToScan === 'IEEE-99887766' ? 'Justin Andre De Leon' : 'Mapúa Student Member',
      studentNo: '2022109876',
      ieeeNo: codeToScan,
      program: 'CpE',
      timestamp: new Date().toLocaleTimeString(),
      status: isDuplicate ? 'DUPLICATE' : 'SUCCESS',
    };

    setLastScanned(newRecord);
    setScannedLogs([newRecord, ...scannedLogs]);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <QrCode className="w-6 h-6 text-emerald-400" />
          <span>Event QR Attendance Scanner</span>
        </h1>
        <p className="text-xs text-slate-400">
          Scan digital membership flip cards for instant event check-in and volunteer hour logging.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Scanner Feed Box */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-6 shadow-2xl">
          <div className="relative w-64 h-64 mx-auto rounded-3xl bg-slate-950 border-2 border-dashed border-emerald-500/50 flex flex-col items-center justify-center p-6 space-y-3">
            <Scan className="w-16 h-16 text-emerald-400 animate-pulse" />
            <div className="text-xs font-mono text-emerald-400 font-bold">
              CAMERA SCANNER ACTIVE
            </div>
            <div className="text-[10px] text-slate-400">
              Align Digital Membership QR Code inside frame
            </div>
          </div>

          {/* Manual Input Simulator */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="text-xs font-semibold text-slate-300">
              Test Scanner Input Simulator
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder="Scan or enter IEEE-99887766..."
                className="flex-1 px-3 py-2 rounded-xl text-xs bg-slate-800 border border-slate-700 text-white font-mono"
              />
              <button
                onClick={() => handleScan(manualCode)}
                className="px-4 py-2 rounded-xl text-xs font-bold btn-ieee-primary flex items-center gap-1.5"
              >
                <UserCheck className="w-4 h-4" />
                <span>Simulate Scan</span>
              </button>
            </div>
          </div>

          {/* Feedback Status Alert */}
          {lastScanned && (
            <div
              className={`p-4 rounded-2xl border text-xs text-left space-y-1 ${
                lastScanned.status === 'SUCCESS'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
              }`}
            >
              <div className="font-bold flex items-center gap-1.5 text-sm">
                {lastScanned.status === 'SUCCESS' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                )}
                <span>
                  {lastScanned.status === 'SUCCESS'
                    ? 'Check-In Confirmed!'
                    : 'Duplicate Check-In Detected'}
                </span>
              </div>
              <div>Student: {lastScanned.name} ({lastScanned.studentNo})</div>
              <div className="font-mono text-[11px]">IEEE ID: {lastScanned.ieeeNo} • {lastScanned.timestamp}</div>
            </div>
          )}
        </div>

        {/* Live Attendance Scanned Logs */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Live Attendance Log ({scannedLogs.length})</span>
            </h2>
            <button
              onClick={() => setScannedLogs([])}
              className="text-xs text-slate-500 hover:text-white"
            >
              Clear Log
            </button>
          </div>

          {scannedLogs.length === 0 ? (
            <div className="text-center py-12 text-xs text-slate-500">
              No QR scans recorded yet. Scan a member ID card above.
            </div>
          ) : (
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
              {scannedLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-white">{log.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {log.studentNo} • {log.program}
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-blue-400 text-[11px] font-bold block">
                      {log.ieeeNo}
                    </span>
                    <span className="text-[10px] text-slate-500">{log.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
