import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import SkillsInput from "@/components/profile/SkillsInput";

interface ProfileFormProps {
  preview?: boolean;
  onSubmit?: (profileData: any) => void;
}

const SAMPLE_VALUES = [
  { id: "ecological-restoration", label: "Ecological Restoration" },
  { id: "shared-leadership", label: "Shared Leadership" },
  { id: "equitable-economics", label: "Equitable Economics" },
  { id: "community-focus", label: "Community Focus" },
  { id: "innovation", label: "Innovation" },
  { id: "circular-economy", label: "Circular Economy" }
];

const ProfileForm = ({ preview = false, onSubmit }: ProfileFormProps) => {
  const [name, setName] = useState(preview ? "Your Name" : "");
  const [skills, setSkills] = useState<string[]>(preview ? ["Permaculture", "Web Development", "Marketing"] : []);
  const [resources, setResources] = useState<string[]>(preview ? ["Land (2 acres)", "Office Space"] : []);
  const [selectedValues, setSelectedValues] = useState<string[]>(
    preview ? ["ecological-restoration", "shared-leadership", "equitable-economics"] : []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({
        name,
        skills,
        resources,
        values: selectedValues
      });
    }
  };

  const handleValueChange = (valueId: string, checked: boolean) => {
    if (checked) {
      setSelectedValues([...selectedValues, valueId]);
    } else {
      setSelectedValues(selectedValues.filter(v => v !== valueId));
    }
  };

  return (
    <div className="bg-neutral-50 rounded-xl p-6 shadow-md">
      <h3 className="text-xl font-semibold text-neutral-900 mb-4">
        {preview ? "Profile Preview" : "Create Your Profile"}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">Your Name</Label>
          <Input 
            id="name" 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
        </div>
        
        <div>
          <Label htmlFor="skills">Skills & Expertise</Label>
          <SkillsInput 
            items={skills}
            onChange={setSkills}
            placeholder="Add more skills..."
            variant="skill"
          />
        </div>
        
        <div>
          <Label htmlFor="resources">Resources You Can Share</Label>
          <SkillsInput 
            items={resources}
            onChange={setResources}
            placeholder="Add resources..."
            variant="resource"
          />
        </div>
        
        <div>
          <Label>Values & Priorities</Label>
          <div className="mt-1 grid grid-cols-2 gap-2">
            {SAMPLE_VALUES.map((value) => (
              <div key={value.id} className="flex items-center">
                <Checkbox 
                  id={value.id}
                  checked={selectedValues.includes(value.id)}
                  onCheckedChange={(checked) => 
                    handleValueChange(value.id, checked as boolean)
                  }
                  className="h-4 w-4 text-primary focus:ring-primary"
                />
                <label 
                  htmlFor={value.id}
                  className="ml-2 text-sm text-neutral-800"
                >
                  {value.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {!preview && (
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md font-medium transition-colors"
            >
              Save Profile
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileForm;
