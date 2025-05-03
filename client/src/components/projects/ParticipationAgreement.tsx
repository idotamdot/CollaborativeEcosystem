import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from '@/lib/queryClient';
import { queryClient } from '@/lib/queryClient';
import { format } from 'date-fns';

interface ParticipationAgreementProps {
  projectId: number;
  projectTitle: string;
  userId: number;
  userName: string;
  userEmail: string;
  trigger?: React.ReactNode;
}

const ParticipationAgreement: React.FC<ParticipationAgreementProps> = ({
  projectId,
  projectTitle,
  userId,
  userName,
  userEmail,
  trigger
}) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState(5);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const currentDate = format(new Date(), "MMMM dd, yyyy");
  
  const agreementText = `
### Eco CoLab Participation Agreement

**Project Title:** ${projectTitle}
**Participant:** ${userName} (${userEmail})
**Role:** ${selectedRole}
**Start Date:** ${currentDate}
**Hours Committed:** ${hoursPerWeek} hrs/week

#### Shared Commitments
- I agree to uphold the Stewardship Investment System.
- I agree to treat labor, learning, and time with equal dignity.
- I agree to operate transparently and uphold community values.

#### Financial Terms
- All revenue will be shared equally per hour of verified contribution.
- I understand that investor capital will be reimbursed with fair pacing.
`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      toast({
        title: "Agreement Required",
        description: "You must agree to the terms before signing the agreement",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await apiRequest(
        "POST", 
        "/api/agreements", 
        {
          userId,
          projectId,
          role: selectedRole,
          hoursCommitted: hoursPerWeek,
          contractText: agreementText
        }
      );
      
      // Invalidate relevant query caches
      queryClient.invalidateQueries({ queryKey: [`/api/projects/${projectId}/agreements`] });
      queryClient.invalidateQueries({ queryKey: [`/api/users/${userId}/agreements`] });
      
      setIsOpen(false);
      
      toast({
        title: "Agreement Signed",
        description: "You have successfully signed the participation agreement"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign the agreement. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button className="w-full">Sign Participation Agreement</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Eco-CoLab Participation Agreement</DialogTitle>
          <DialogDescription>
            Review and sign the participation agreement for this project.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="role">Select Your Role</Label>
            <select
              id="role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">-- Select Role --</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Marketing">Marketing</option>
              <option value="Community Manager">Community Manager</option>
              <option value="Content Creator">Content Creator</option>
              <option value="Project Manager">Project Manager</option>
              <option value="Advisor">Advisor</option>
              <option value="Resource Provider">Resource Provider</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="hours">Weekly Hours Commitment</Label>
            <Input
              id="hours"
              type="number"
              min={1}
              max={40}
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
              required
            />
          </div>
          
          <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
            <h3 className="text-lg font-medium mb-2">Agreement Preview</h3>
            <div className="whitespace-pre-line text-sm">
              {agreementText}
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="terms" 
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
            />
            <label 
              htmlFor="terms" 
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the terms of this participation agreement and understand that this constitutes a digital signature.
            </label>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!selectedRole || !agreedToTerms}
              className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
            >
              Sign Agreement
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ParticipationAgreement;