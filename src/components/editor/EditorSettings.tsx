
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

interface EditorSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectName: string;
  setProjectName: (name: string) => void;
  darkMode: boolean;
  setDarkMode: (enabled: boolean) => void;
}

const EditorSettings: React.FC<EditorSettingsProps> = ({
  open,
  onOpenChange,
  projectName,
  setProjectName,
  darkMode,
  setDarkMode,
}) => {
  const handleSaveChanges = () => {
    onOpenChange(false);
    
    // Show toast notification
    toast({
      title: "Settings Saved",
      description: "Your editor preferences have been updated.",
    });
  };

  const handleDarkModeToggle = (enabled: boolean) => {
    setDarkMode(enabled);
    
    // Show toast for theme change
    toast({
      title: enabled ? "Dark Mode Enabled" : "Light Mode Enabled",
      description: `The editor theme has been switched to ${enabled ? 'dark' : 'light'} mode.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editor Settings</DialogTitle>
          <DialogDescription>
            Customize your EduWarn HTML editor experience.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="projectName" className="text-right">
              Project Name
            </Label>
            <input
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="col-span-3 px-3 py-2 border rounded-md"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="darkMode" className="text-right">
              Dark Mode
            </Label>
            <div className="col-span-3 flex items-center gap-2">
              <Switch
                id="darkMode"
                checked={darkMode}
                onCheckedChange={handleDarkModeToggle}
              />
              <span className="text-sm text-muted-foreground">
                {darkMode ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditorSettings;
