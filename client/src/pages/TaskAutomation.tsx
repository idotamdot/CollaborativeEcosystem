import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Circle, 
  ChevronRight, 
  Play, 
  Calendar, 
  Clock, 
  Award, 
  Gift,
  Users,
  AlertTriangle,
  BadgeCheck,
  Trophy,
  Star,
  Shield,
  Zap,
  Check
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { format, addDays } from 'date-fns';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

interface Task {
  id: string;
  title: string;
  description: string;
  deadline?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  assignedTo?: string[];
  category: string;
  points: number;
  completionPercentage: number;
  subtasks: Subtask[];
  dependencies?: string[];
}

interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
  level: number;
  points: number;
}

interface Project {
  id: string;
  name: string;
  progress: number;
}

const TaskAutomation: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedProject, setSelectedProject] = useState<string>('p1');
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
  const [showCompletedDialog, setShowCompletedDialog] = useState(false);
  const [completedTaskId, setCompletedTaskId] = useState<string | null>(null);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [newTaskForm, setNewTaskForm] = useState({
    title: '',
    description: '',
    deadline: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
    priority: 'medium',
    category: 'general',
    assignedTo: [] as string[],
  });

  // Fetch projects
  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch('/api/projects');
      if (!res.ok) {
        throw new Error('Failed to fetch projects');
      }
      return res.json();
    }
  });

  // Fetch users
  const { data: users = [] } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('/api/users');
      if (!res.ok) {
        throw new Error('Failed to fetch users');
      }
      return res.json();
    }
  });

  // Fetch tasks
  const { data: tasks = [] } = useQuery<Task[]>({
    queryKey: ['tasks', selectedProject],
    queryFn: async () => {
      const res = await fetch(`/api/projects/${selectedProject}/tasks`);
      if (!res.ok) {
        throw new Error('Failed to fetch tasks');
      }
      return res.json();
    },
    enabled: !!selectedProject,
  });

  // Fetch achievements
  const { data: achievements = [] } = useQuery<Achievement[]>({
    queryKey: ['achievements'],
    queryFn: async () => {
      const res = await fetch('/api/achievements');
      if (!res.ok) {
        throw new Error('Failed to fetch achievements');
      }
      return res.json();
    }
  });
  
  // Active user (would come from auth context in a real app)
  const { data: activeUser } = useQuery<User>({
    queryKey: ['activeUser'],
    queryFn: async () => {
      // In a real app, you would fetch the current user's data
      const res = await fetch('/api/users/1'); // Assuming user with ID 1 is the active user
      if (!res.ok) {
        throw new Error('Failed to fetch active user');
      }
      return res.json();
    }
  });
  
  const calculateTaskCompletion = (task: Task) => {
    if (task.subtasks.length === 0) return task.completionPercentage;
    const completedSubtasks = task.subtasks.filter(subtask => subtask.completed).length;
    return Math.round((completedSubtasks / task.subtasks.length) * 100);
  };
  
  const addTaskMutation = useMutation<Task, Error, Partial<Task>>({
    mutationFn: async (newTask) => {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newTask, projectId: selectedProject }),
      });
      if (!res.ok) {
        throw new Error('Failed to add task');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', selectedProject] });
      toast({ title: 'Task added successfully' });
      setShowNewTaskDialog(false);
      setNewTaskForm({
        title: '',
        description: '',
        deadline: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
        priority: 'medium',
        category: 'general',
        assignedTo: [],
      });
    },
    onError: () => {
      toast({ title: 'Error adding task', variant: 'destructive' });
    }
  });

  const handleAddTask = () => {
    addTaskMutation.mutate(newTaskForm);
  };
  
  const updateTaskMutation = useMutation<Task, Error, Partial<Task>>({
    mutationFn: async (updatedTask) => {
      const res = await fetch(`/api/tasks/${updatedTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });
      if (!res.ok) {
        throw new Error('Failed to update task');
      }
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks', selectedProject] });
      if (data.status === 'completed') {
        setCompletedTaskId(data.id);
        setEarnedPoints(data.points);
        setShowCompletedDialog(true);
        // Invalidate user and achievements queries to refetch updated data
        queryClient.invalidateQueries({ queryKey: ['activeUser'] });
        queryClient.invalidateQueries({ queryKey: ['achievements'] });
      }
    },
    onError: () => {
      toast({ title: 'Error updating task', variant: 'destructive' });
    }
  });

  const handleUpdateSubtask = (taskId: string, subtaskId: string, completed: boolean) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const updatedSubtasks = task.subtasks.map(subtask =>
      subtask.id === subtaskId ? { ...subtask, completed } : subtask
    );

    const completionPercentage = Math.round((updatedSubtasks.filter(st => st.completed).length / updatedSubtasks.length) * 100);
    const isNowCompleted = completionPercentage === 100;

    updateTaskMutation.mutate({
      id: taskId,
      subtasks: updatedSubtasks,
      completionPercentage,
      status: isNowCompleted ? 'completed' : task.status,
    });
  };
  
  const getProgressColor = (percentage: number) => {
    if (percentage < 30) return "bg-red-500";
    if (percentage < 70) return "bg-yellow-500";
    return "bg-green-500";
  };
  
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'low': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'high': return 'text-red-500';
      default: return 'text-slate-500';
    }
  };
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-slate-100 text-slate-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };
  
  const getAssignedUsers = (userIds: string[] | undefined) => {
    if (!userIds) return [];
    return users.filter(user => userIds.includes(user.id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 mb-2">
          Interactive Task Automation
        </h1>
        <p className="text-slate-600 max-w-3xl">
          Manage and track all your ecological collaborative project tasks with this interactive system. 
          Earn points, level up, and unlock achievements as you make progress on your collective ventures.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Project Tasks</CardTitle>
                  <CardDescription>
                    Select a project to see and manage its tasks
                  </CardDescription>
                </div>
                <Select
                  value={selectedProject}
                  onValueChange={setSelectedProject}
                >
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map(project => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">
                    Project Progress: {projects.find(p => p.id === selectedProject)?.progress || 0}%
                  </span>
                  <span className="text-xs text-slate-500">
                    {tasks.filter(t => t.status === 'completed').length} of {tasks.length} tasks completed
                  </span>
                </div>
                <Progress 
                  value={projects.find(p => p.id === selectedProject)?.progress || 0} 
                  className="h-2"
                />
              </div>
              
              <div className="space-y-4 mt-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs"
                    >
                      All
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs"
                    >
                      Pending
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs bg-blue-50"
                    >
                      In Progress
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs"
                    >
                      Completed
                    </Button>
                  </div>
                  <Button onClick={() => setShowNewTaskDialog(true)}>
                    Add Task
                  </Button>
                </div>
              
                {tasks.map(task => (
                  <Card key={task.id} className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg flex items-center">
                            {task.title}
                            <Badge className={`ml-2 ${getStatusColor(task.status)}`}>
                              {task.status.replace('-', ' ')}
                            </Badge>
                          </CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <Calendar className={`h-3.5 w-3.5 mr-1 ${task.deadline && new Date(task.deadline) < new Date() ? 'text-red-500' : 'text-slate-500'}`} />
                            {task.deadline ? format(new Date(task.deadline), 'MMM d, yyyy') : 'No deadline'}
                            <Clock className={`h-3.5 w-3.5 ml-3 mr-1 ${getPriorityColor(task.priority)}`} />
                            <span className={`capitalize ${getPriorityColor(task.priority)}`}>{task.priority} priority</span>
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="font-bold">
                          +{task.points} pts
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-slate-700 mb-4">{task.description}</p>
                      
                      <div className="mb-3">
                        <div className="flex justify-between mb-1 items-center">
                          <span className="text-xs font-medium">Progress: {task.completionPercentage}%</span>
                          {task.assignedTo && task.assignedTo.length > 0 && (
                            <div className="flex -space-x-2">
                              {getAssignedUsers(task.assignedTo).map(user => (
                                <TooltipProvider key={user.id}>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div 
                                        className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center border border-white"
                                      >
                                        {user.name.charAt(0)}
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{user.name} - {user.role}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              ))}
                            </div>
                          )}
                        </div>
                        <Progress 
                          value={task.completionPercentage} 
                          className={`h-1.5 ${getProgressColor(task.completionPercentage)}`} 
                        />
                      </div>
                      
                      {task.subtasks.length > 0 && (
                        <div className="space-y-1.5 mt-4">
                          {task.subtasks.map(subtask => (
                            <div 
                              key={subtask.id} 
                              className="flex items-center text-sm"
                              onClick={() => handleUpdateSubtask(task.id, subtask.id, !subtask.completed)}
                            >
                              <div className="flex-none mr-2 cursor-pointer">
                                {subtask.completed ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Circle className="h-4 w-4 text-slate-300" />
                                )}
                              </div>
                              <span className={subtask.completed ? 'line-through text-slate-500' : 'text-slate-700'}>
                                {subtask.title}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="pt-0">
                      <div className="w-full flex justify-between">
                        <Button variant="ghost" size="sm" className="text-xs">
                          Add Subtask
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className={`
                            ${task.status === 'completed' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'} 
                            text-xs
                          `}
                          disabled={task.status === 'completed'}
                          onClick={() => updateTaskMutation.mutate({ ...task, status: 'completed' })}
                        >
                          {task.status === 'completed' ? 'Completed' : 'Mark Complete'}
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Your Progress</span>
                <Badge variant="outline" className="text-lg font-bold bg-blue-50">
                  Level {activeUser?.level || 0}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-500">
                    {activeUser?.points || 0} points
                  </span>
                  <span className="text-xs text-slate-500">
                    {activeUser ? Math.floor(((activeUser.points % 200) / 200) * 100) : 0}% to Level {activeUser ? activeUser.level + 1 : 1}
                  </span>
                </div>
                <Progress 
                  value={activeUser ? ((activeUser.points % 200) / 200) * 100 : 0}
                  className="h-2 bg-blue-100" 
                />
              </div>
              
              <div className="space-y-4 mt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                    <Award className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold">{activeUser?.points || 0} points earned</h3>
                  <p className="text-sm text-slate-500">{tasks.filter(t => t.status === 'completed').length} tasks completed this week</p>
                </div>
                
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  View Progress Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Achievements</CardTitle>
              <CardDescription>
                Unlock achievements by completing challenges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map(achievement => (
                  <div 
                    key={achievement.id} 
                    className={`flex items-center p-3 rounded-lg ${achievement.unlocked ? 'bg-green-50' : 'bg-slate-50'}`}
                  >
                    <div className={`
                      flex-none mr-3 p-2 rounded-full
                      ${achievement.unlocked ? 'bg-green-100' : 'bg-slate-200'}
                    `}>
                      {achievement.icon}
                    </div>
                    <div className="flex-grow">
                      <h4 className={`font-semibold ${achievement.unlocked ? 'text-green-700' : 'text-slate-700'}`}>
                        {achievement.name}
                      </h4>
                      <p className="text-xs text-slate-500">{achievement.description}</p>
                      
                      {achievement.progress !== undefined && achievement.maxProgress !== undefined && (
                        <div className="mt-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-slate-500">
                              Progress: {achievement.progress}/{achievement.maxProgress}
                            </span>
                          </div>
                          <Progress 
                            value={(achievement.progress / achievement.maxProgress) * 100} 
                            className={`h-1.5 ${achievement.unlocked ? 'bg-green-500' : 'bg-blue-500'}`} 
                          />
                        </div>
                      )}
                    </div>
                    {achievement.unlocked && (
                      <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">
                        Unlocked
                      </Badge>
                    )}
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  View All Achievements
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* New Task Dialog */}
      <Dialog open={showNewTaskDialog} onOpenChange={setShowNewTaskDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>
              Add a new task to your project. Define the details and assign it to team members.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                value={newTaskForm.title}
                onChange={(e) => setNewTaskForm({...newTaskForm, title: e.target.value})}
                placeholder="Enter task title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newTaskForm.description}
                onChange={(e) => setNewTaskForm({...newTaskForm, description: e.target.value})}
                placeholder="Describe the task"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="deadline">Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={newTaskForm.deadline}
                  onChange={(e) => setNewTaskForm({...newTaskForm, deadline: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newTaskForm.priority}
                  onValueChange={(value) => setNewTaskForm({...newTaskForm, priority: value})}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newTaskForm.category}
                  onValueChange={(value) => setNewTaskForm({...newTaskForm, category: value})}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="ecological">Ecological</SelectItem>
                    <SelectItem value="legal">Legal</SelectItem>
                    <SelectItem value="governance">Governance</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="assigned">Assigned To</Label>
                <Select
                  value={newTaskForm.assignedTo[0] || ''}
                  onValueChange={(value) => setNewTaskForm({...newTaskForm, assignedTo: [value]})}
                >
                  <SelectTrigger id="assigned">
                    <SelectValue placeholder="Assign to..." />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map(user => (
                      <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowNewTaskDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddTask}>Create Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Task Completed Dialog */}
      <Dialog open={showCompletedDialog} onOpenChange={setShowCompletedDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center text-green-600">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Trophy className="w-8 h-8 text-green-600" />
                </div>
                Task Completed!
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <h3 className="text-2xl font-bold mb-2">+{earnedPoints} Points Earned!</h3>
            <p className="text-slate-600 mb-4">
              Great job completing this task. Keep up the good work!
            </p>
            
            <div className="flex justify-center space-x-4 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{tasks.filter(t => t.status === 'completed').length}</div>
                <div className="text-sm text-slate-500">Tasks Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{activeUser?.points || 0}</div>
                <div className="text-sm text-slate-500">Total Points</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{activeUser?.level || 0}</div>
                <div className="text-sm text-slate-500">Current Level</div>
              </div>
            </div>
            
            {/* Show any achievements unlocked */}
            {achievements.some(a => a.unlocked) && (
              <div className="mb-4">
                <h4 className="font-semibold text-purple-600 mb-2">Achievement Unlocked!</h4>
                <div className="flex justify-center">
                  {achievements.filter(a => a.unlocked).slice(0, 1).map(achievement => (
                    <div key={achievement.id} className="text-center">
                      <div className="bg-purple-100 p-2 rounded-full inline-block mb-1">
                        {achievement.icon}
                      </div>
                      <div className="text-sm font-medium">{achievement.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button 
              onClick={() => setShowCompletedDialog(false)}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Weekly Progress Report */}
      <Tabs defaultValue="tasks" className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tasks">Tasks Progress</TabsTrigger>
          <TabsTrigger value="ecological">Ecological Impact</TabsTrigger>
          <TabsTrigger value="team">Team Progress</TabsTrigger>
          <TabsTrigger value="automation">Task Automations</TabsTrigger>
        </TabsList>
        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Tasks Summary</CardTitle>
              <CardDescription>
                Overview of task progress for the current week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-blue-600">12</CardTitle>
                    <CardDescription>Tasks in Progress</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-green-600">8</CardTitle>
                    <CardDescription>Tasks Completed</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-red-600">2</CardTitle>
                    <CardDescription>Tasks Overdue</CardDescription>
                  </CardHeader>
                </Card>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Category Breakdown</h3>
                  <Badge variant="outline">This Week</Badge>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Ecological Tasks</span>
                      <span className="text-xs font-medium">4/7 completed</span>
                    </div>
                    <Progress value={57} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Governance Tasks</span>
                      <span className="text-xs font-medium">2/3 completed</span>
                    </div>
                    <Progress value={66} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Financial Tasks</span>
                      <span className="text-xs font-medium">1/4 completed</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-.center mb-1">
                      <span className="text-sm">Community Tasks</span>
                      <span className="text-xs font-medium">3/5 completed</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ecological">
          <Card>
            <CardHeader>
              <CardTitle>Ecological Impact Progress</CardTitle>
              <CardDescription>
                Tracking the ecological indicators of your project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-12">
                <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Ecological Impact Tracking Coming Soon</h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  This feature will allow you to track ecological metrics and visualize the
                  environmental impact of your projects with comprehensive dashboards.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Team Progress</CardTitle>
              <CardDescription>
                See how your team members are progressing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {users.map(user => (
                  <div key={user.id} className="flex items-start">
                    <div className="flex-none mr-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                        {user.name.charAt(0)}
                      </div>
                    </div>
                    <div className="flex-grow mr-4">
                      <div className="flex items-center mb-1">
                        <h3 className="font-medium">{user.name}</h3>
                        <Badge className="ml-2" variant="outline">Level {user.level}</Badge>
                      </div>
                      <p className="text-sm text-slate-500">{user.role}</p>
                      <div className="mt-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-slate-500">{user.points} points</span>
                        </div>
                        <Progress value={75} className="h-1.5" />
                      </div>
                    </div>
                    <div className="flex-none text-right">
                      <div className="text-sm font-medium">3 tasks completed</div>
                      <div className="text-xs text-slate-500">This week</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="automation">
          <Card>
            <CardHeader>
              <CardTitle>Task Automations</CardTitle>
              <CardDescription>
                Set up automated workflows and triggers for your tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-12">
                <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Task Automation Coming Soon</h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  This feature will allow you to create automated workflows, set triggers for task
                  creation, and manage recurring tasks to streamline your collaborative processes.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskAutomation;