import React, { useState } from 'react';
import { Search, BookOpen, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DictionaryEntry {
  id: string;
  term: string;
  definition: string;
  category: 'ecological' | 'business' | 'governance' | 'legal' | 'financial';
  relatedTerms?: string[];
  source?: string;
}

const dictionaryEntries: DictionaryEntry[] = [
  {
    id: '1',
    term: 'Stewardship Investment Model (SIM)',
    definition: 'A framework for collaborative business ventures that emphasizes equitable resource sharing, democratic governance, and ecological sustainability. Instead of traditional investment models, SIM focuses on stewarding resources for the collective good while ensuring fair compensation for all contributors.',
    category: 'business',
    relatedTerms: ['Eco-CoLab', 'Revenue Sharing', 'Collective Ownership'],
    source: 'Eco-Collective Governance Framework'
  },
  {
    id: '2',
    term: 'Eco-CoLab',
    definition: 'A governance framework for ecological collaborative ventures that balances individual autonomy with collective decision-making. It includes democratic governance structures, transparent processes, and ecological values integration.',
    category: 'governance',
    relatedTerms: ['Stewardship Investment Model', 'Sociocracy', 'Consent-based Decision Making'],
    source: 'Eco-Collective Governance Framework'
  },
  {
    id: '3',
    term: 'Participation Agreement',
    definition: 'A formal document outlining the terms of participation in a collaborative project, including time commitments, role responsibilities, revenue sharing arrangements, and governance expectations.',
    category: 'legal',
    relatedTerms: ['Commitment Tracking', 'Revenue Sharing Agreement'],
    source: 'Eco-Collective Legal Templates'
  },
  {
    id: '4',
    term: 'Revenue Sharing Agreement',
    definition: 'A legal framework for distributing income among project collaborators based on their contributions, as documented through time tracking and resource provision. Forms the financial backbone of the Stewardship Investment Model.',
    category: 'financial',
    relatedTerms: ['Stewardship Investment Model', 'Contribution Tracking', 'Equity Distribution'],
    source: 'Eco-Collective Financial Framework'
  },
  {
    id: '5',
    term: 'Ecological Accounting',
    definition: 'A system for measuring, valuing, and reporting the ecological impacts and contributions of a business venture, integrating environmental costs and benefits into financial decision-making.',
    category: 'ecological',
    relatedTerms: ['Triple Bottom Line', 'Natural Capital', 'Ecological Footprint'],
    source: 'Ecological Business Assessment Guidelines'
  },
  {
    id: '6',
    term: 'Regenerative Enterprise',
    definition: 'A business that goes beyond sustainability to actively restore and regenerate ecological and social systems through its operations, creating net positive impacts rather than merely reducing harm.',
    category: 'ecological',
    relatedTerms: ['Regenerative Economics', 'Circular Economy', 'Net Positive Impact'],
    source: 'Regenerative Business Design Handbook'
  },
  {
    id: '7',
    term: 'Consent-based Decision Making',
    definition: 'A governance approach where decisions are made when no member has a paramount and reasoned objection. Unlike consensus, consent doesn\'t require enthusiastic agreement from all, just the absence of reasoned objections.',
    category: 'governance',
    relatedTerms: ['Sociocracy', 'Dynamic Governance', 'Eco-CoLab'],
    source: 'Sociocratic Principles and Methods'
  },
  {
    id: '8',
    term: 'Time Banking',
    definition: 'A reciprocity-based work trading system where hours of service provided are recorded and used as alternative currency to receive services in return. In ecological collaboratives, this may be used to track and value various forms of contribution.',
    category: 'financial',
    relatedTerms: ['Alternative Currency', 'Contribution Tracking', 'Mutual Credit Systems'],
    source: 'Alternative Economic Systems Handbook'
  },
  {
    id: '9',
    term: 'Commons-based Peer Production',
    definition: 'A socioeconomic system of production where individuals collaboratively produce goods and services that are made freely available to all, often organized through horizontal networks rather than traditional hierarchical organizations.',
    category: 'business',
    relatedTerms: ['Open Source', 'Peer Governance', 'Knowledge Commons'],
    source: 'Collaborative Economics Research Institute'
  },
  {
    id: '10',
    term: 'Just Transition',
    definition: 'A framework for ensuring that the move toward more sustainable economies happens in a way that\'s fair to all stakeholders, particularly vulnerable communities and workers in polluting industries.',
    category: 'ecological',
    relatedTerms: ['Climate Justice', 'Social Equity', 'Green New Deal'],
    source: 'Environmental Justice Framework'
  },
  {
    id: '11',
    term: 'Contributory Accounting',
    definition: 'A system for tracking, valuing, and compensating diverse forms of contribution to a collective project, including time, skills, resources, and relationships.',
    category: 'financial',
    relatedTerms: ['Value Accounting', 'Contribution Metrics', 'Stewardship Investment Model'],
    source: 'Eco-Collective Financial Framework'
  },
  {
    id: '12',
    term: 'Ecological Impact Assessment',
    definition: 'A formal evaluation of the potential ecological effects of a proposed project or business, including resource use, emissions, waste generation, and biodiversity impacts.',
    category: 'ecological',
    relatedTerms: ['Environmental Impact Statement', 'Life Cycle Assessment', 'Ecological Footprint'],
    source: 'Ecological Business Assessment Guidelines'
  }
];

const EcoDictionary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredEntries = dictionaryEntries.filter(entry => {
    const matchesSearch = 
      entry.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
      entry.definition.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      activeCategory === 'all' || 
      entry.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleCopyDefinition = (id: string, definition: string) => {
    navigator.clipboard.writeText(definition);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">Ecological Collaborative Dictionary</h1>
        <p className="text-slate-600 max-w-3xl">
          A comprehensive reference of terms, concepts, and frameworks used in ecological 
          collaborative ventures, stewardship-based business models, and regenerative enterprises.
        </p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search terms or definitions..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs 
        defaultValue="all" 
        value={activeCategory}
        onValueChange={setActiveCategory}
        className="mb-6"
      >
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Categories</TabsTrigger>
          <TabsTrigger value="ecological">Ecological</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="governance">Governance</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="legal">Legal</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            {filteredEntries.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="mx-auto h-12 w-12 text-slate-300" />
                <h3 className="mt-4 text-lg font-medium text-slate-900">No terms found</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Try adjusting your search or filter to find what you're looking for
                </p>
              </div>
            ) : (
              filteredEntries.map(entry => (
                <Card key={entry.id} className="overflow-hidden">
                  <CardHeader className={`
                    ${entry.category === 'ecological' ? 'bg-green-50' : ''}
                    ${entry.category === 'business' ? 'bg-blue-50' : ''}
                    ${entry.category === 'governance' ? 'bg-purple-50' : ''}
                    ${entry.category === 'financial' ? 'bg-yellow-50' : ''}
                    ${entry.category === 'legal' ? 'bg-slate-50' : ''}
                  `}>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{entry.term}</CardTitle>
                        <CardDescription className="capitalize mt-1">{entry.category}</CardDescription>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleCopyDefinition(entry.id, entry.definition)}
                        className={`
                          ${copiedId === entry.id 
                            ? 'text-green-600 hover:text-green-700 hover:bg-green-50' 
                            : 'text-slate-600 hover:text-slate-700 hover:bg-slate-50'}
                        `}
                      >
                        {copiedId === entry.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-slate-700">{entry.definition}</p>
                    
                    {entry.relatedTerms && entry.relatedTerms.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-slate-700 mb-2">Related Terms:</h4>
                        <div className="flex flex-wrap gap-2">
                          {entry.relatedTerms.map(term => (
                            <span 
                              key={term} 
                              className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700"
                            >
                              {term}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  {entry.source && (
                    <CardFooter className="text-xs text-slate-500 border-t pt-4">
                      Source: {entry.source}
                    </CardFooter>
                  )}
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {['ecological', 'business', 'governance', 'financial', 'legal'].map(category => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 gap-6">
              {filteredEntries.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="mx-auto h-12 w-12 text-slate-300" />
                  <h3 className="mt-4 text-lg font-medium text-slate-900">No {category} terms found</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Try adjusting your search to find what you're looking for
                  </p>
                </div>
              ) : (
                filteredEntries.map(entry => (
                  <Card key={entry.id} className="overflow-hidden">
                    <CardHeader className={`
                      ${entry.category === 'ecological' ? 'bg-green-50' : ''}
                      ${entry.category === 'business' ? 'bg-blue-50' : ''}
                      ${entry.category === 'governance' ? 'bg-purple-50' : ''}
                      ${entry.category === 'financial' ? 'bg-yellow-50' : ''}
                      ${entry.category === 'legal' ? 'bg-slate-50' : ''}
                    `}>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{entry.term}</CardTitle>
                          <CardDescription className="capitalize mt-1">{entry.category}</CardDescription>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleCopyDefinition(entry.id, entry.definition)}
                          className={`
                            ${copiedId === entry.id 
                              ? 'text-green-600 hover:text-green-700 hover:bg-green-50' 
                              : 'text-slate-600 hover:text-slate-700 hover:bg-slate-50'}
                          `}
                        >
                          {copiedId === entry.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-slate-700">{entry.definition}</p>
                      
                      {entry.relatedTerms && entry.relatedTerms.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-slate-700 mb-2">Related Terms:</h4>
                          <div className="flex flex-wrap gap-2">
                            {entry.relatedTerms.map(term => (
                              <span 
                                key={term} 
                                className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700"
                              >
                                {term}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                    {entry.source && (
                      <CardFooter className="text-xs text-slate-500 border-t pt-4">
                        Source: {entry.source}
                      </CardFooter>
                    )}
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default EcoDictionary;