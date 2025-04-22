import { useState } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface FilterProps {
  onFilterChange: (filters: {
    searchTerm: string;
    matchThreshold: number;
    locations: string[];
    skills: string[];
    resources: string[];
    values: string[];
  }) => void;
}

// Sample data for dropdowns
const SAMPLE_LOCATIONS = [
  { value: "portland", label: "Portland, OR" },
  { value: "seattle", label: "Seattle, WA" },
  { value: "austin", label: "Austin, TX" },
  { value: "sanfrancisco", label: "San Francisco, CA" },
  { value: "denver", label: "Denver, CO" },
  { value: "newyork", label: "New York, NY" },
  { value: "boston", label: "Boston, MA" },
  { value: "chicago", label: "Chicago, IL" },
];

const SAMPLE_SKILLS = [
  { value: "sustainability", label: "Sustainability" },
  { value: "marketing", label: "Marketing" },
  { value: "web_development", label: "Web Development" },
  { value: "permaculture", label: "Permaculture" },
  { value: "renewable_energy", label: "Renewable Energy" },
  { value: "design", label: "Design" },
  { value: "finance", label: "Finance" },
  { value: "legal", label: "Legal" },
  { value: "community_organizing", label: "Community Organizing" },
  { value: "project_management", label: "Project Management" },
];

const SAMPLE_RESOURCES = [
  { value: "land", label: "Land" },
  { value: "equipment", label: "Equipment" },
  { value: "workspace", label: "Workspace" },
  { value: "funding", label: "Funding" },
  { value: "network", label: "Network" },
  { value: "vehicle", label: "Vehicle" },
  { value: "tools", label: "Tools" },
  { value: "market_access", label: "Market Access" },
];

const SAMPLE_VALUES = [
  { value: "ecological_restoration", label: "Ecological Restoration" },
  { value: "shared_leadership", label: "Shared Leadership" },
  { value: "equitable_economics", label: "Equitable Economics" },
  { value: "community_focus", label: "Community Focus" },
  { value: "innovation", label: "Innovation" },
  { value: "circular_economy", label: "Circular Economy" },
];

const MatchFilter = ({ onFilterChange }: FilterProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [matchThreshold, setMatchThreshold] = useState([40]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [openLocation, setOpenLocation] = useState(false);
  const [openSkills, setOpenSkills] = useState(false);
  const [openResources, setOpenResources] = useState(false);
  const [openValues, setOpenValues] = useState(false);

  const handleFilterApply = () => {
    onFilterChange({
      searchTerm,
      matchThreshold: matchThreshold[0],
      locations: selectedLocations,
      skills: selectedSkills,
      resources: selectedResources,
      values: selectedValues,
    });
  };

  const handleReset = () => {
    setSearchTerm("");
    setMatchThreshold([40]);
    setSelectedLocations([]);
    setSelectedSkills([]);
    setSelectedResources([]);
    setSelectedValues([]);
    
    onFilterChange({
      searchTerm: "",
      matchThreshold: 40,
      locations: [],
      skills: [],
      resources: [],
      values: [],
    });
  };

  return (
    <Card>
      <CardHeader className="py-4">
        <CardTitle className="text-lg">Filter Matches</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-neutral-500" />
            <Input
              placeholder="Search by name, skills..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Minimum Match Score: {matchThreshold}%
          </label>
          <Slider
            defaultValue={[40]}
            max={100}
            step={5}
            value={matchThreshold}
            onValueChange={setMatchThreshold}
            className="my-4"
          />
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium mb-2 block">Location</label>
            <Popover open={openLocation} onOpenChange={setOpenLocation}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openLocation}
                  className="w-full justify-between text-left font-normal"
                >
                  {selectedLocations.length === 0
                    ? "Select location..."
                    : `${selectedLocations.length} selected`}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search locations..." />
                  <CommandEmpty>No location found.</CommandEmpty>
                  <CommandGroup className="max-h-64 overflow-auto">
                    {SAMPLE_LOCATIONS.map((location) => (
                      <CommandItem
                        key={location.value}
                        value={location.value}
                        onSelect={() => {
                          const newLocations = selectedLocations.includes(location.value)
                            ? selectedLocations.filter((l) => l !== location.value)
                            : [...selectedLocations, location.value];
                          setSelectedLocations(newLocations);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedLocations.includes(location.value)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {location.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Skills Needed</label>
            <Popover open={openSkills} onOpenChange={setOpenSkills}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openSkills}
                  className="w-full justify-between text-left font-normal"
                >
                  {selectedSkills.length === 0
                    ? "Select skills..."
                    : `${selectedSkills.length} selected`}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search skills..." />
                  <CommandEmpty>No skill found.</CommandEmpty>
                  <CommandGroup className="max-h-64 overflow-auto">
                    {SAMPLE_SKILLS.map((skill) => (
                      <CommandItem
                        key={skill.value}
                        value={skill.value}
                        onSelect={() => {
                          const newSkills = selectedSkills.includes(skill.value)
                            ? selectedSkills.filter((s) => s !== skill.value)
                            : [...selectedSkills, skill.value];
                          setSelectedSkills(newSkills);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedSkills.includes(skill.value)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {skill.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Resources Available</label>
            <Popover open={openResources} onOpenChange={setOpenResources}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openResources}
                  className="w-full justify-between text-left font-normal"
                >
                  {selectedResources.length === 0
                    ? "Select resources..."
                    : `${selectedResources.length} selected`}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search resources..." />
                  <CommandEmpty>No resource found.</CommandEmpty>
                  <CommandGroup className="max-h-64 overflow-auto">
                    {SAMPLE_RESOURCES.map((resource) => (
                      <CommandItem
                        key={resource.value}
                        value={resource.value}
                        onSelect={() => {
                          const newResources = selectedResources.includes(resource.value)
                            ? selectedResources.filter((r) => r !== resource.value)
                            : [...selectedResources, resource.value];
                          setSelectedResources(newResources);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedResources.includes(resource.value)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {resource.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Values</label>
            <Popover open={openValues} onOpenChange={setOpenValues}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openValues}
                  className="w-full justify-between text-left font-normal"
                >
                  {selectedValues.length === 0
                    ? "Select values..."
                    : `${selectedValues.length} selected`}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search values..." />
                  <CommandEmpty>No value found.</CommandEmpty>
                  <CommandGroup className="max-h-64 overflow-auto">
                    {SAMPLE_VALUES.map((value) => (
                      <CommandItem
                        key={value.value}
                        value={value.value}
                        onSelect={() => {
                          const newValues = selectedValues.includes(value.value)
                            ? selectedValues.filter((v) => v !== value.value)
                            : [...selectedValues, value.value];
                          setSelectedValues(newValues);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedValues.includes(value.value)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {value.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="pt-4 flex gap-2">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button 
            className="flex-1 bg-primary hover:bg-primary-dark"
            onClick={handleFilterApply}
          >
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchFilter;
