import React, { useState } from 'react';
import { format, startOfWeek, endOfWeek, addDays, parseISO, addWeeks, subWeeks } from 'date-fns';
import { ChevronLeft, ChevronRight, Clock, Calendar, Car, Save, Plus, Trash2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TimeEntry {
  id: string;
  date: string;
  project: string;
  task: string;
  hours: number;
  notes: string;
}

interface MileageEntry {
  id: string;
  date: string;
  project: string;
  startLocation: string;
  endLocation: string;
  miles: number;
  purpose: string;
}

const projects = [
  { id: 'proj1', name: 'Urban Garden Collective' },
  { id: 'proj2', name: 'Renewable Energy Co-op' },
  { id: 'proj3', name: 'Sustainable Housing Initiative' },
  { id: 'proj4', name: 'Zero Waste Store' },
];

const defaultTimeEntries: TimeEntry[] = [
  {
    id: '1',
    date: '2025-05-01',
    project: 'proj1',
    task: 'Planning meeting',
    hours: 2,
    notes: 'Created initial planting layout'
  },
  {
    id: '2',
    date: '2025-05-02',
    project: 'proj2',
    task: 'Research',
    hours: 4,
    notes: 'Researched local regulations'
  },
];

const defaultMileageEntries: MileageEntry[] = [
  {
    id: '1',
    date: '2025-05-01',
    project: 'proj1',
    startLocation: 'Office',
    endLocation: 'Community Garden',
    miles: 12,
    purpose: 'Initial site survey'
  },
  {
    id: '2',
    date: '2025-05-03',
    project: 'proj3',
    startLocation: 'Home',
    endLocation: 'Building Site',
    miles: 18,
    purpose: 'Meeting with contractors'
  },
];

const TimesheetTracker: React.FC = () => {
  // Get the tab from the URL query parameter
  const getTabFromURL = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const tab = searchParams.get('tab');
    if (tab === 'mileage' || tab === 'reports' || tab === 'tax') {
      return tab;
    }
    return 'timesheet';
  };

  const [activeTab, setActiveTab] = useState(getTabFromURL());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>(defaultTimeEntries);
  const [mileageEntries, setMileageEntries] = useState<MileageEntry[]>(defaultMileageEntries);
  const [newTimeEntry, setNewTimeEntry] = useState<Partial<TimeEntry>>({
    date: format(new Date(), 'yyyy-MM-dd'),
    hours: 0
  });
  const [newMileageEntry, setNewMileageEntry] = useState<Partial<MileageEntry>>({
    date: format(new Date(), 'yyyy-MM-dd'),
    miles: 0
  });
  
  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const url = new URL(window.location.href);
    if (value !== 'timesheet') {
      url.searchParams.set('tab', value);
    } else {
      url.searchParams.delete('tab');
    }
    window.history.pushState({}, '', url.toString());
  };

  // Get current week dates
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 1 });
  const formattedDateRange = `${format(startOfCurrentWeek, 'MMM d')} - ${format(endOfCurrentWeek, 'MMM d, yyyy')}`;

  // Generate an array of dates for the current week
  const weekDays = Array.from({ length: 7 }).map((_, index) => addDays(startOfCurrentWeek, index));

  // Filter entries for current week
  const weekTimeEntries = timeEntries.filter(entry => {
    const entryDate = parseISO(entry.date);
    return entryDate >= startOfCurrentWeek && entryDate <= endOfCurrentWeek;
  });

  const weekMileageEntries = mileageEntries.filter(entry => {
    const entryDate = parseISO(entry.date);
    return entryDate >= startOfCurrentWeek && entryDate <= endOfCurrentWeek;
  });

  // Calculate totals
  const totalHours = weekTimeEntries.reduce((sum, entry) => sum + entry.hours, 0);
  const totalMiles = weekMileageEntries.reduce((sum, entry) => sum + entry.miles, 0);

  const handleAddTimeEntry = () => {
    if (!newTimeEntry.project || !newTimeEntry.task || !newTimeEntry.hours) return;

    const entry: TimeEntry = {
      id: Date.now().toString(),
      date: newTimeEntry.date || format(new Date(), 'yyyy-MM-dd'),
      project: newTimeEntry.project,
      task: newTimeEntry.task,
      hours: newTimeEntry.hours,
      notes: newTimeEntry.notes || ''
    };

    setTimeEntries([...timeEntries, entry]);
    setNewTimeEntry({
      date: format(new Date(), 'yyyy-MM-dd'),
      hours: 0
    });
  };

  const handleAddMileageEntry = () => {
    if (!newMileageEntry.project || !newMileageEntry.startLocation || !newMileageEntry.endLocation || !newMileageEntry.miles) return;

    const entry: MileageEntry = {
      id: Date.now().toString(),
      date: newMileageEntry.date || format(new Date(), 'yyyy-MM-dd'),
      project: newMileageEntry.project,
      startLocation: newMileageEntry.startLocation,
      endLocation: newMileageEntry.endLocation,
      miles: newMileageEntry.miles,
      purpose: newMileageEntry.purpose || ''
    };

    setMileageEntries([...mileageEntries, entry]);
    setNewMileageEntry({
      date: format(new Date(), 'yyyy-MM-dd'),
      miles: 0
    });
  };

  const handleDeleteTimeEntry = (id: string) => {
    setTimeEntries(timeEntries.filter(entry => entry.id !== id));
  };

  const handleDeleteMileageEntry = (id: string) => {
    setMileageEntries(mileageEntries.filter(entry => entry.id !== id));
  };

  const navigateWeek = (direction: 'next' | 'prev') => {
    setCurrentDate(direction === 'next'
      ? addWeeks(currentDate, 1)
      : subWeeks(currentDate, 1)
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">Timesheet & Mileage Tracker</h1>
        <p className="text-slate-600 max-w-3xl">
          Track your hours, tasks, and travel for different projects to maintain accurate records for
          contribution tracking, billing, and tax purposes.
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-slate-800">{formattedDateRange}</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigateWeek('prev')}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigateWeek('next')}>
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-6">
          <TabsTrigger value="timesheet">Time Tracking</TabsTrigger>
          <TabsTrigger value="mileage">Mileage Tracking</TabsTrigger>
          <TabsTrigger value="reports">Weekly Reports</TabsTrigger>
          <TabsTrigger value="tax">Tax Summary</TabsTrigger>
        </TabsList>

        {/* Time Tracking Tab */}
        <TabsContent value="timesheet">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Current Week Summary */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Week Summary</CardTitle>
                <CardDescription>Time tracked this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Total Hours:</span>
                    <span className="text-lg font-medium">{totalHours.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Projects:</span>
                    <span className="text-lg font-medium">{new Set(weekTimeEntries.map(e => e.project)).size}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Entries:</span>
                    <span className="text-lg font-medium">{weekTimeEntries.length}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600">
                  <Save className="h-4 w-4 mr-2" /> Export Timesheet
                </Button>
              </CardFooter>
            </Card>

            {/* Time Entries */}
            <div className="lg:col-span-3 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Add New Time Entry</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input 
                        id="date" 
                        type="date" 
                        value={newTimeEntry.date} 
                        onChange={e => setNewTimeEntry({...newTimeEntry, date: e.target.value})} 
                      />
                    </div>
                    <div>
                      <Label htmlFor="project">Project</Label>
                      <Select 
                        onValueChange={value => setNewTimeEntry({...newTimeEntry, project: value})}
                        value={newTimeEntry.project}
                      >
                        <SelectTrigger id="project">
                          <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                        <SelectContent>
                          {projects.map(project => (
                            <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="task">Task</Label>
                      <Input 
                        id="task" 
                        placeholder="What did you work on?" 
                        value={newTimeEntry.task || ''} 
                        onChange={e => setNewTimeEntry({...newTimeEntry, task: e.target.value})} 
                      />
                    </div>
                    <div>
                      <Label htmlFor="hours">Hours</Label>
                      <Input 
                        id="hours" 
                        type="number" 
                        step="0.25" 
                        min="0" 
                        placeholder="0.0" 
                        value={newTimeEntry.hours || ''} 
                        onChange={e => setNewTimeEntry({...newTimeEntry, hours: parseFloat(e.target.value)})} 
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="notes">Notes</Label>
                    <Input 
                      id="notes" 
                      placeholder="Additional details" 
                      value={newTimeEntry.notes || ''} 
                      onChange={e => setNewTimeEntry({...newTimeEntry, notes: e.target.value})} 
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleAddTimeEntry} 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Entry
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">This Week's Time Entries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weekTimeEntries.length === 0 ? (
                      <p className="text-center text-slate-500 py-4">No time entries for this week</p>
                    ) : (
                      weekTimeEntries.map(entry => {
                        const project = projects.find(p => p.id === entry.project);
                        return (
                          <div key={entry.id} className="border rounded-lg p-4 flex flex-col md:flex-row justify-between">
                            <div className="flex-1">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 text-slate-500 mr-2" />
                                <span className="text-sm text-slate-500">{format(parseISO(entry.date), 'MMM d, yyyy')}</span>
                              </div>
                              <h4 className="text-md font-medium mt-1">{project?.name || 'Unknown Project'}</h4>
                              <p className="text-sm mt-1">{entry.task}</p>
                              {entry.notes && <p className="text-xs text-slate-500 mt-1">{entry.notes}</p>}
                            </div>
                            <div className="flex items-center mt-2 md:mt-0">
                              <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-md mr-4">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{entry.hours} hrs</span>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleDeleteTimeEntry(entry.id)}
                                className="text-red-600 hover:text-red-800 hover:bg-red-100"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Mileage Tracking Tab */}
        <TabsContent value="mileage">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Current Week Summary */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Week Summary</CardTitle>
                <CardDescription>Mileage tracked this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Total Miles:</span>
                    <span className="text-lg font-medium">{totalMiles}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Projects:</span>
                    <span className="text-lg font-medium">{new Set(weekMileageEntries.map(e => e.project)).size}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Trips:</span>
                    <span className="text-lg font-medium">{weekMileageEntries.length}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600">
                  <Save className="h-4 w-4 mr-2" /> Export Mileage Log
                </Button>
              </CardFooter>
            </Card>

            {/* Mileage Entries */}
            <div className="lg:col-span-3 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Add New Mileage Entry</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="date-mileage">Date</Label>
                      <Input 
                        id="date-mileage" 
                        type="date" 
                        value={newMileageEntry.date} 
                        onChange={e => setNewMileageEntry({...newMileageEntry, date: e.target.value})} 
                      />
                    </div>
                    <div>
                      <Label htmlFor="project-mileage">Project</Label>
                      <Select 
                        onValueChange={value => setNewMileageEntry({...newMileageEntry, project: value})}
                        value={newMileageEntry.project}
                      >
                        <SelectTrigger id="project-mileage">
                          <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                        <SelectContent>
                          {projects.map(project => (
                            <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="miles">Miles</Label>
                      <Input 
                        id="miles" 
                        type="number" 
                        min="0" 
                        placeholder="0" 
                        value={newMileageEntry.miles || ''} 
                        onChange={e => setNewMileageEntry({...newMileageEntry, miles: parseInt(e.target.value)})} 
                      />
                    </div>
                    <div>
                      <Label htmlFor="start-location">Start Location</Label>
                      <Input 
                        id="start-location" 
                        placeholder="Where did you start?" 
                        value={newMileageEntry.startLocation || ''} 
                        onChange={e => setNewMileageEntry({...newMileageEntry, startLocation: e.target.value})} 
                      />
                    </div>
                    <div>
                      <Label htmlFor="end-location">End Location</Label>
                      <Input 
                        id="end-location" 
                        placeholder="Where did you end?" 
                        value={newMileageEntry.endLocation || ''} 
                        onChange={e => setNewMileageEntry({...newMileageEntry, endLocation: e.target.value})} 
                      />
                    </div>
                    <div>
                      <Label htmlFor="purpose">Purpose</Label>
                      <Input 
                        id="purpose" 
                        placeholder="Purpose of the trip" 
                        value={newMileageEntry.purpose || ''} 
                        onChange={e => setNewMileageEntry({...newMileageEntry, purpose: e.target.value})} 
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleAddMileageEntry} 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Entry
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">This Week's Mileage Entries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weekMileageEntries.length === 0 ? (
                      <p className="text-center text-slate-500 py-4">No mileage entries for this week</p>
                    ) : (
                      weekMileageEntries.map(entry => {
                        const project = projects.find(p => p.id === entry.project);
                        return (
                          <div key={entry.id} className="border rounded-lg p-4 flex flex-col md:flex-row justify-between">
                            <div className="flex-1">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 text-slate-500 mr-2" />
                                <span className="text-sm text-slate-500">{format(parseISO(entry.date), 'MMM d, yyyy')}</span>
                              </div>
                              <h4 className="text-md font-medium mt-1">{project?.name || 'Unknown Project'}</h4>
                              <p className="text-sm mt-1">{entry.startLocation} → {entry.endLocation}</p>
                              {entry.purpose && <p className="text-xs text-slate-500 mt-1">{entry.purpose}</p>}
                            </div>
                            <div className="flex items-center mt-2 md:mt-0">
                              <div className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-md mr-4">
                                <Car className="h-4 w-4 mr-1" />
                                <span>{entry.miles} miles</span>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleDeleteMileageEntry(entry.id)}
                                className="text-red-600 hover:text-red-800 hover:bg-red-100"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Weekly Reports Tab */}
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Reports</CardTitle>
              <CardDescription>Generate detailed reports of your activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-20">
                <h3 className="text-xl font-medium text-blue-600 mb-2">Weekly Reports Coming Soon</h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  This feature will allow you to generate detailed reports of your time, mileage, 
                  and accomplishments for each week or custom time period.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tax Summary Tab */}
        <TabsContent value="tax">
          <Card>
            <CardHeader>
              <CardTitle>Tax Summary</CardTitle>
              <CardDescription>Track business expenses for tax purposes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-20">
                <h3 className="text-xl font-medium text-blue-600 mb-2">Tax Reporting Coming Soon</h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  This feature will help you generate tax reports and summaries of your
                  business expenses, mileage, and contributions for tax filing purposes.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TimesheetTracker;