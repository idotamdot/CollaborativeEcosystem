import { useState, KeyboardEvent, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SkillsInputProps {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  variant?: "skill" | "resource" | "value";
  className?: string;
}

const SkillsInput = ({ 
  items, 
  onChange, 
  placeholder = "Add more...", 
  variant = "skill",
  className = ""
}: SkillsInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      if (!items.includes(inputValue.trim())) {
        onChange([...items, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const handleRemoveItem = (itemToRemove: string) => {
    onChange(items.filter(item => item !== itemToRemove));
  };

  useEffect(() => {
    // Focus input when clicking on the container
    const handleContainerClick = (e: MouseEvent) => {
      if (containerRef.current && containerRef.current.contains(e.target as Node) && inputRef.current) {
        inputRef.current.focus();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('click', handleContainerClick);
    }

    return () => {
      if (container) {
        container.removeEventListener('click', handleContainerClick);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`p-2 bg-white border border-neutral-300 rounded-md min-h-[80px] focus-within:ring-1 focus-within:ring-primary focus-within:border-primary ${className}`}
    >
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <Badge key={index} variant={variant} className="flex items-center px-2 py-1 text-sm">
            {item}
            <button
              type="button"
              className="ml-1 text-xs"
              onClick={() => handleRemoveItem(item)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        <input
          ref={inputRef}
          type="text"
          className="bg-transparent border-none outline-none text-sm flex-grow min-w-[100px]"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleInputKeyDown}
        />
      </div>
    </div>
  );
};

export default SkillsInput;
