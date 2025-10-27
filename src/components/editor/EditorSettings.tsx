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
import { Input } from '@/components/ui/input';
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

    toast({
      title: "Settings Saved",
      description: "Your editor preferences have been updated.",
    });
  };

  const handleDarkModeToggle = (enabled: boolean) => {
    setDarkMode(enabled);

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
            Customize your code editor experience.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="projectName">
              Project Name
            </Label>
            <Input
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="darkMode">
                Dark Mode
              </Label>
              <p className="text-sm text-muted-foreground">
                Enable dark theme for the editor
              </p>
            </div>
            <Switch
              id="darkMode"
              checked={darkMode}
              onCheckedChange={handleDarkModeToggle}
            />
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
