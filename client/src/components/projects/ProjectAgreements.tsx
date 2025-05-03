import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserIcon, ClockIcon, CalendarIcon } from 'lucide-react';

interface Agreement {
  id: number;
  userId: number;
  projectId: number;
  role: string;
  hoursCommitted: number;
  contractText: string;
  signedOn: string;
  status: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  profileImage?: string;
}

interface ProjectAgreementsProps {
  projectId: number;
  includeTitle?: boolean;
}

const ProjectAgreements: React.FC<ProjectAgreementsProps> = ({ projectId, includeTitle = true }) => {
  // Fetch agreements for this project
  const { data: agreements = [], isLoading: isLoadingAgreements } = useQuery<Agreement[]>({
    queryKey: [`/api/projects/${projectId}/agreements`],
    retry: 1,
  });
  
  // Fetch users to map user info to agreements
  const { data: users = [], isLoading: isLoadingUsers } = useQuery<User[]>({
    queryKey: ['/api/users'],
    retry: 1,
  });
  
  // Map user info to agreements
  const agreementsWithUserInfo = agreements.map(agreement => {
    const user = users.find(u => u.id === agreement.userId);
    return {
      ...agreement,
      userName: user?.name || 'Unknown User',
      userEmail: user?.email || '',
      userProfileImage: user?.profileImage || ''
    };
  });
  
  // Sort active agreements first, then by role
  const sortedAgreements = [...agreementsWithUserInfo].sort((a, b) => {
    if (a.status !== b.status) {
      return a.status === 'active' ? -1 : 1;
    }
    return a.role.localeCompare(b.role);
  });
  
  if (isLoadingAgreements || isLoadingUsers) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (agreements.length === 0) {
    return (
      <Card>
        {includeTitle && (
          <CardHeader>
            <CardTitle>Team Agreements</CardTitle>
            <CardDescription>
              No participation agreements have been signed for this project yet.
            </CardDescription>
          </CardHeader>
        )}
        <CardContent>
          <div className="text-center py-6 text-gray-500">
            <p>No agreements have been signed for this project.</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      {includeTitle && (
        <CardHeader>
          <CardTitle>Team Agreements</CardTitle>
          <CardDescription>
            Team members who have signed participation agreements for this project.
          </CardDescription>
        </CardHeader>
      )}
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Participant</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Hours/Week</TableHead>
              <TableHead>Signed On</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAgreements.map((agreement) => (
              <TableRow key={agreement.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      {agreement.userProfileImage ? (
                        <img 
                          src={agreement.userProfileImage} 
                          alt={agreement.userName}
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        <UserIcon className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <div>{agreement.userName}</div>
                      <div className="text-xs text-gray-500">{agreement.userEmail}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{agreement.role}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="h-3.5 w-3.5 text-gray-500" />
                    {agreement.hoursCommitted}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-3.5 w-3.5 text-gray-500" />
                    {format(new Date(agreement.signedOn), 'MMM d, yyyy')}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={agreement.status === 'active' ? 'default' : 'secondary'}>
                    {agreement.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <Accordion type="single" collapsible className="mt-6">
          <AccordionItem value="agreements">
            <AccordionTrigger>View Agreement Details</AccordionTrigger>
            <AccordionContent>
              {sortedAgreements.map((agreement) => (
                <div key={agreement.id} className="mb-6 pb-6 border-b last:border-b-0">
                  <h4 className="font-medium mb-2">{agreement.userName} - {agreement.role}</h4>
                  <div className="bg-slate-50 p-3 rounded-md text-sm whitespace-pre-line">
                    {agreement.contractText}
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default ProjectAgreements;