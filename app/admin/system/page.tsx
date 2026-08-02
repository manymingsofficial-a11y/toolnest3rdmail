'use client';

import * as React from 'react';
import { getDataProvider } from '@/lib/admin/static-provider';
import type { AdminSystemInfo, AdminLogEntry } from '@/lib/admin/types';
import { PageHeader, SectionCard, LoadingSpinner } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/admin/stat-card';
import { Database, Download, Upload, Trash2, HardDrive, Clock, Activity, Zap } from 'lucide-react';

export default function AdminSystemPage() {
  const [info, setInfo] = React.useState<AdminSystemInfo | null>(null);
  const [logs, setLogs] = React.useState<AdminLogEntry[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [backingUp, setBackingUp] = React.useState(false);
  const [clearing, setClearing] = React.useState(false);
  const [backupResult, setBackupResult] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    const [sysInfo, logEntries] = await Promise.all([
      getDataProvider().getSystemInfo(),
      getDataProvider().getLogs(),
    ]);
    setInfo(sysInfo);
    setLogs(logEntries);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const handleBackup = async () => {
    setBackingUp(true);
    const result = await getDataProvider().createBackup();
    setBackingUp(false);
    setBackupResult(`Backup created: ${result.filename} (${result.size})`);
    setTimeout(() => setBackupResult(null), 5000);
    await load();
  };

  const handleRestore = async () => {
    const filename = prompt('Enter the backup filename to restore:');
    if (!filename) return;
    await getDataProvider().restoreBackup(filename);
    await load();
  };

  const handleClearCache = async () => {
    setClearing(true);
    await getDataProvider().clearCache();
    setClearing(false);
    await load();
  };

  if (loading || !info) return <LoadingSpinner />;

  const levelColors: Record<string, string> = {
    info: 'bg-blue-500/15 text-blue-600',
    warning: 'bg-amber-500/15 text-amber-600',
    error: 'bg-rose-500/15 text-rose-600',
  };

  return (
    <div className="space-y-6">
      <PageHeader title="System" description="Backup, logs, cache, and performance" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Cache Size" value={info.cacheSize} icon={<HardDrive className="h-5 w-5" />} gradient="from-blue-500/30 to-blue-500/10" />
        <StatCard label="Log Entries" value={info.logCount} icon={<Activity className="h-5 w-5" />} gradient="from-amber-500/30 to-amber-500/10" />
        <StatCard label="Uptime" value={info.uptime} icon={<Clock className="h-5 w-5" />} gradient="from-emerald-500/30 to-emerald-500/10" />
        <StatCard label="Version" value={info.version} icon={<Zap className="h-5 w-5" />} gradient="from-violet-500/30 to-violet-500/10" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Backup & Restore" description="Create and restore system backups">
          <div className="space-y-4">
            <div className="rounded-lg border border-border/60 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Last Backup</p>
                  <p className="text-xs text-muted-foreground">
                    {info.lastBackup ? new Date(info.lastBackup).toLocaleString() : 'No backups yet'}
                  </p>
                </div>
                <Database className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
            {backupResult && (
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600">
                {backupResult}
              </div>
            )}
            <div className="flex gap-2">
              <Button onClick={handleBackup} disabled={backingUp} className="bg-gradient-brand text-white gap-2">
                <Download className="h-4 w-4" />
                {backingUp ? 'Creating...' : 'Create Backup'}
              </Button>
              <Button variant="outline" onClick={handleRestore} className="gap-2">
                <Upload className="h-4 w-4" />
                Restore
              </Button>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Cache Management" description="Clear cached data and improve performance">
          <div className="space-y-4">
            <div className="rounded-lg border border-border/60 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Current Cache Size</p>
                  <p className="text-xs text-muted-foreground">{info.cacheSize}</p>
                </div>
                <HardDrive className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
            <Button onClick={handleClearCache} disabled={clearing} variant="outline" className="gap-2 hover:text-rose-500">
              <Trash2 className="h-4 w-4" />
              {clearing ? 'Clearing...' : 'Clear Cache'}
            </Button>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="System Logs" description={`${logs.length} log entries`}>
        <div className="max-h-[400px] space-y-2 overflow-y-auto">
          {logs.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">No logs recorded.</p>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 rounded-lg border border-border/40 p-3">
                <Badge className={levelColors[log.level]} variant="secondary">
                  {log.level}
                </Badge>
                <div className="flex-1">
                  <p className="text-sm">{log.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(log.timestamp).toLocaleString()} - {log.source}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </SectionCard>
    </div>
  );
}
