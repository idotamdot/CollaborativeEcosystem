import React, { useState } from 'react';
import { FileIcon, FileText, Download, Search, Eye, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LegalTemplate {
  id: string;
  title: string;
  description: string;
  category: 'entity-formation' | 'governance' | 'agreements' | 'policies' | 'intellectual-property';
  tags: string[];
  fileType: 'pdf' | 'docx';
  complexity: 'beginner' | 'intermediate' | 'advanced';
  previewText: string;
}

const legalTemplates: LegalTemplate[] = [
  {
    id: 'coop-formation',
    title: 'Worker Cooperative Formation',
    description: 'Legal documents for establishing a worker-owned cooperative business with democratic governance and profit sharing.',
    category: 'entity-formation',
    tags: ['cooperative', 'worker-owned', 'democratic', 'equitable'],
    fileType: 'docx',
    complexity: 'intermediate',
    previewText: `
# ARTICLES OF INCORPORATION FOR A WORKER COOPERATIVE

## ARTICLE I: NAME
The name of this cooperative is [NAME OF COOPERATIVE], Worker Cooperative.

## ARTICLE II: PURPOSE
This cooperative is organized to provide employment to its members by engaging in the business of [DESCRIBE BUSINESS PURPOSE]. The cooperative shall operate on a cooperative basis for the mutual benefit of its members.

## ARTICLE III: COOPERATIVE PRINCIPLES
This cooperative subscribes to the following cooperative principles:
1. Voluntary and Open Membership
2. Democratic Member Control (One Member, One Vote)
3. Member Economic Participation
4. Autonomy and Independence
5. Education, Training, and Information
6. Cooperation Among Cooperatives
7. Concern for Community
8. Worker Ownership and Control

## ARTICLE IV: MEMBERSHIP
Membership in this cooperative shall be limited to natural persons who are employed by the cooperative. Each member shall own only one membership share.

## ARTICLE V: INTERNAL CAPITAL ACCOUNTS
The cooperative shall maintain an internal capital account system to reflect each member's equity in the cooperative, including:
1. A collective account
2. Individual capital accounts for each member

## ARTICLE VI: ALLOCATION OF NET PROFITS AND LOSSES
The net profits and losses of the cooperative shall be allocated to members on the basis of patronage, measured by labor contributed to the cooperative.

## ARTICLE VII: GOVERNANCE
The cooperative shall be governed by its members on a one-member, one-vote basis. The cooperative shall establish a Board of Directors elected from among the membership.

...
[Truncated for preview]
    `
  },
  {
    id: 'stewardship-agreement',
    title: 'Stewardship Investment Model Agreement',
    description: 'Legal framework for implementing the Stewardship Investment Model, ensuring equitable resource allocation and collaborative ownership.',
    category: 'agreements',
    tags: ['stewardship', 'investment', 'collaboration', 'revenue-sharing'],
    fileType: 'docx',
    complexity: 'advanced',
    previewText: `
# STEWARDSHIP INVESTMENT MODEL AGREEMENT

THIS STEWARDSHIP INVESTMENT MODEL AGREEMENT (the "Agreement") is made this [DATE] by and between the undersigned parties (collectively "Participants").

## 1. PURPOSE AND PRINCIPLES

1.1 PURPOSE. The Participants enter into this Agreement to establish a framework for collaborative investment, resource sharing, and equitable distribution of benefits in connection with [PROJECT NAME] (the "Project").

1.2 STEWARDSHIP PRINCIPLES. This Agreement is guided by the following principles:
   a) Resources contributed to the Project are stewarded for collective benefit, not private accumulation
   b) Decision-making authority is distributed equitably among Participants
   c) Benefits are shared in proportion to contributions
   d) Ecological health and sustainability are prioritized in all decisions
   e) Transparency and accountability govern all Project activities

## 2. CONTRIBUTIONS

2.1 TYPES OF CONTRIBUTIONS. Participants may contribute the following to the Project:
   a) Financial capital
   b) Labor and expertise
   c) Material resources
   d) Intellectual property
   e) Relationships and social capital

2.2 VALUATION OF CONTRIBUTIONS. All contributions shall be valued according to the Contribution Valuation Protocol attached as Exhibit A.

2.3 RECORD OF CONTRIBUTIONS. All contributions shall be recorded in the Project's Contribution Ledger, which shall be accessible to all Participants.

## 3. GOVERNANCE

3.1 DECISION-MAKING. Project decisions shall be made by consent of all affected Participants using the process outlined in Exhibit B.

3.2 STEWARDSHIP COUNCIL. A Stewardship Council consisting of [NUMBER] Participants shall be responsible for day-to-day operations.

## 4. BENEFITS DISTRIBUTION

4.1 REVENUE SHARING. Project revenues shall be distributed as follows:
   a) [PERCENTAGE]% to a Project Sustainability Fund
   b) [PERCENTAGE]% to a Community Benefit Fund
   c) Remaining proceeds to be distributed to Participants in proportion to their contributions

...
[Truncated for preview]
    `
  },
  {
    id: 'sociocratic-bylaws',
    title: 'Sociocratic Bylaws Template',
    description: 'Corporate bylaws incorporating sociocratic governance methods, including consent decision-making and double-linked circles.',
    category: 'governance',
    tags: ['sociocracy', 'consent-based', 'circles', 'governance'],
    fileType: 'docx',
    complexity: 'advanced',
    previewText: `
# SOCIOCRATIC BYLAWS

## ARTICLE I: ORGANIZATION NAME AND PURPOSE

Section 1.1 Name
The name of this organization shall be [ORGANIZATION NAME].

Section 1.2 Purpose
The purpose of this organization is to [STATE PURPOSE].

Section 1.3 Governance Philosophy
This organization shall be governed according to sociocratic principles and methods, including consent decision-making, double-linked circle structure, and continuous improvement through measured feedback.

## ARTICLE II: CIRCLE STRUCTURE

Section 2.1 General Circle Structure
The organization shall be structured as a series of semi-autonomous, double-linked circles. Each circle shall have:
a) A defined aim that supports the organization's overall purpose
b) The authority to create policy within its domain
c) Members with the expertise and resources needed to achieve its aim
d) A Circle Lead (operational leader)
e) A Facilitator
f) A Secretary
g) A Representative to the next higher circle

Section 2.2 General Circle
The General Circle shall coordinate the activities of all other circles and shall include:
a) The organization's CEO/Executive Director
b) Circle Leads from all Primary Circles
c) Representatives elected from all Primary Circles
d) A Facilitator, Secretary, and any other roles deemed necessary

Section 2.3 Primary Circles
The following Primary Circles are established:
a) [LIST PRIMARY CIRCLES, e.g., "Operations Circle", "Marketing Circle", etc.]

Section 2.4 Double-Linking
Each Primary Circle shall be linked to the General Circle by two persons:
a) The Circle Lead, appointed by the General Circle
b) The Representative, elected by the members of the Primary Circle

## ARTICLE III: CONSENT DECISION-MAKING

Section 3.1 Consent Principle
All policy decisions shall be made by consent. Consent exists when no member present has a paramount and reasoned objection to a proposed decision.

Section 3.2 Objections
An objection is paramount and reasoned when:
a) It is based on evidence that the proposed decision will interfere with a circle's ability to fulfill its aim
b) It is explained with clear reasoning that can be understood by others
c) It is not based merely on preference, opinion, or veto power

...
[Truncated for preview]
    `
  },
  {
    id: 'community-ownership-model',
    title: 'Community Ownership Legal Structure',
    description: 'Template for establishing community-owned enterprises with broad stakeholder governance and equitable profit distribution.',
    category: 'entity-formation',
    tags: ['community-ownership', 'multi-stakeholder', 'local-economy'],
    fileType: 'pdf',
    complexity: 'intermediate',
    previewText: `
# COMMUNITY OWNERSHIP LEGAL STRUCTURE

## SECTION I: LEGAL ENTITY AND PURPOSE

1.1 Legal Form: [LEGAL ENTITY NAME] shall be organized as a [LEGAL STRUCTURE: e.g., "benefit corporation," "L3C," "cooperative," etc.].

1.2 Purpose: The purpose of this entity is to:
   a) Operate a [BUSINESS TYPE] that meets community needs
   b) Maintain community ownership and governance
   c) Generate benefits that are shared equitably among stakeholders
   d) Preserve long-term community assets

1.3 Multi-Stakeholder Approach: This entity recognizes and incorporates the interests of multiple stakeholder groups, including:
   a) Workers
   b) Consumers/Users
   c) Local Community Members
   d) Supporting Organizations
   e) Ecological Representatives

## SECTION II: OWNERSHIP STRUCTURE

2.1 Community Ownership Shares: The entity shall issue the following classes of shares:
   a) Worker Shares: Held by employees
   b) Consumer Shares: Held by regular users or customers
   c) Community Shares: Held by local residents and organizations
   d) Stewardship Shares: Held in trust for environmental interests

2.2 Ownership Limitations: No single stakeholder may own more than [PERCENTAGE]% of any share class.

2.3 Asset Lock: The physical and financial assets of the entity shall include provisions that prevent their privatization or sale without extraordinary approval processes.

## SECTION III: GOVERNANCE

3.1 Stakeholder Council: The entity shall be governed by a Stakeholder Council consisting of representatives from each stakeholder group.

3.2 Representation: Each stakeholder group shall have representation proportional to their stake, but no group shall hold a controlling majority.

3.3 Decision Thresholds:
   a) Ordinary decisions: [SPECIFY THRESHOLD]
   b) Significant decisions: [SPECIFY THRESHOLD]
   c) Fundamental changes: [SPECIFY THRESHOLD]

...
[Truncated for preview]
    `
  },
  {
    id: 'revenue-sharing-agreement',
    title: 'Equitable Revenue Sharing Agreement',
    description: 'Contract template for fair distribution of revenue based on varied stakeholder contributions and ecological impact.',
    category: 'agreements',
    tags: ['revenue-sharing', 'fair-compensation', 'stakeholder'],
    fileType: 'docx',
    complexity: 'intermediate',
    previewText: `
# EQUITABLE REVENUE SHARING AGREEMENT

This EQUITABLE REVENUE SHARING AGREEMENT (the "Agreement") is entered into as of [DATE] by and between the undersigned parties (collectively, "Participants").

## 1. PURPOSE

1.1 The Participants have agreed to collaborate on [PROJECT/BUSINESS DESCRIPTION] (the "Venture") and wish to establish a fair and transparent framework for sharing the Venture's revenues.

1.2 This Agreement establishes the principles, formulas, and processes by which revenue generated by the Venture will be distributed among Participants.

## 2. CONTRIBUTION CATEGORIES AND VALUATION

2.1 The Participants recognize the following categories of contributions to the Venture:
   a) Financial Capital: Direct monetary investments
   b) Labor Capital: Time, skills, and expertise
   c) Social Capital: Networks, relationships, and market access
   d) Intellectual Capital: Ideas, innovations, and intellectual property
   e) Material Capital: Equipment, space, and tangible resources

2.2 Contribution Tracking: All contributions shall be documented in the Contribution Ledger (Appendix A), which shall be updated [FREQUENCY] and accessible to all Participants.

2.3 Contribution Valuation: Contributions shall be valued according to the following principles:
   a) Financial Capital: Valued at actual amount contributed
   b) Labor Capital: Valued at [RATE DETERMINATION METHOD]
   c) Social Capital: Valued based on [VALUATION METHOD]
   d) Intellectual Capital: Valued based on [VALUATION METHOD]
   e) Material Capital: Valued based on [VALUATION METHOD]

## 3. REVENUE ALLOCATION

3.1 Revenue Distribution Formula: The Venture's revenues shall be distributed as follows:
   a) Operating Reserve: [PERCENTAGE]% allocated to the Venture's operating reserve
   b) Regenerative Fund: [PERCENTAGE]% allocated to ecological and social regeneration
   c) Participant Compensation: Remaining revenues distributed to Participants

3.2 Participant Revenue Sharing: The Participant Compensation portion shall be distributed according to the following formula:
   [DETAILED FORMULA BASED ON CONTRIBUTION TYPES AND VALUES]

...
[Truncated for preview]
    `
  },
  {
    id: 'commons-based-ip',
    title: 'Commons-Based Intellectual Property Agreement',
    description: 'Legal framework for managing collectively created intellectual property while protecting against extraction and enclosure.',
    category: 'intellectual-property',
    tags: ['commons', 'intellectual-property', 'copyleft', 'open-source'],
    fileType: 'docx',
    complexity: 'advanced',
    previewText: `
# COMMONS-BASED INTELLECTUAL PROPERTY AGREEMENT

## ARTICLE 1: PURPOSE AND PRINCIPLES

1.1 Purpose. This Agreement establishes a framework for managing intellectual property (IP) created collaboratively by members of [COLLECTIVE/ORGANIZATION NAME] (the "Collective") in accordance with commons-based principles.

1.2 Commons Principles. This Agreement is guided by the following principles:
   a) Collective Stewardship: IP is collectively stewarded rather than individually owned
   b) Equitable Access: All members have equitable access to use and build upon the IP
   c) Protected Commons: The IP is protected against privatization and enclosure
   d) Reciprocity: Those who benefit from the commons contribute back to it
   e) Ecological Alignment: IP is managed in ways that support ecological health

## ARTICLE 2: SCOPE AND DEFINITIONS

2.1 Covered IP. This Agreement covers all intellectual property created:
   a) By members during their work with the Collective
   b) Using significant Collective resources
   c) As part of explicitly designated Collective projects

2.2 Types of IP. This Agreement covers all forms of intellectual property, including:
   a) Copyright: Creative works, software, documentation
   b) Patent: Inventions and processes
   c) Trademark: Names, logos, and brand elements
   d) Trade Secrets: Confidential information and know-how
   e) Data: Datasets and data structures

## ARTICLE 3: COMMONS LICENSING FRAMEWORK

3.1 Internal Commons. All Covered IP is part of the Collective's Internal Commons, accessible to all members for use, modification, and development.

3.2 External Licensing Categories:
   a) Solidarity Commons: IP licensed freely to aligned organizations and purposes
   b) Reciprocity Commons: IP licensed to others with reciprocal contributions required
   c) Commercial Commons: IP licensed commercially with revenue supporting the Collective

3.3 Protective Measures. To prevent enclosure of the commons:
   a) Copyleft Provisions: Derivatives must be shared under compatible licenses
   b) Patent Defensive Provisions: Patents are used defensively to protect the commons
   c) Anti-Extraction Provisions: Commercial use by extractive entities is restricted

...
[Truncated for preview]
    `
  },
  {
    id: 'multi-stakeholder-governance',
    title: 'Multi-Stakeholder Governance Policy',
    description: 'Governance policy for organizations with diverse stakeholder groups, ensuring equitable representation and balanced decision-making.',
    category: 'governance',
    tags: ['multi-stakeholder', 'governance', 'representation', 'decision-making'],
    fileType: 'pdf',
    complexity: 'intermediate',
    previewText: `
# MULTI-STAKEHOLDER GOVERNANCE POLICY

## SECTION 1: PURPOSE AND PRINCIPLES

1.1 Purpose
This policy establishes the governance structure and decision-making processes for [ORGANIZATION NAME] (the "Organization"), which serves multiple stakeholder groups.

1.2 Governance Principles
The Organization's governance is guided by these principles:
a) Inclusive Representation: All stakeholder groups affected by the Organization's activities have meaningful representation
b) Balanced Power: No single stakeholder group holds dominant power
c) Transparent Processes: Governance processes are clear, accessible, and documented
d) Deliberative Decision-making: Decisions involve substantive discussion across stakeholder perspectives
e) Accountability: Representatives are accountable to their stakeholder constituencies

## SECTION 2: STAKEHOLDER GROUPS

2.1 Recognized Stakeholder Groups
The Organization recognizes the following stakeholder groups:
a) Workers/Staff: Those employed by or regularly volunteering with the Organization
b) Beneficiaries/Users: Those directly using or benefiting from the Organization's services
c) Community Members: Residents of the communities where the Organization operates
d) Supporting Organizations: Organizations that provide financial or other support
e) Environmental Representatives: Those representing ecological interests

2.2 Stakeholder Identification and Membership
a) Each stakeholder group shall establish criteria for membership
b) The Organization shall maintain a registry of stakeholders by group
c) Individuals may belong to multiple stakeholder groups but must choose a primary group for voting purposes

## SECTION 3: GOVERNANCE STRUCTURE

3.1 Multi-Stakeholder Board
a) Composition: The Board shall include representatives from each stakeholder group, allocated as follows:
   • Workers/Staff: [NUMBER] seats
   • Beneficiaries/Users: [NUMBER] seats
   • Community Members: [NUMBER] seats
   • Supporting Organizations: [NUMBER] seats
   • Environmental Representatives: [NUMBER] seats
b) Term: Board members shall serve [LENGTH] terms, staggered to ensure continuity
c) Selection: Each stakeholder group shall select its representatives through a documented democratic process

...
[Truncated for preview]
    `
  },
  {
    id: 'ecological-bylaws',
    title: 'Ecological Bylaws Amendment',
    description: 'Bylaw provisions that embed ecological responsibility into organizational governance and operations.',
    category: 'governance',
    tags: ['ecological', 'bylaws', 'governance', 'sustainability'],
    fileType: 'docx',
    complexity: 'beginner',
    previewText: `
# ECOLOGICAL BYLAWS AMENDMENT

The following provisions amend the Bylaws of [ORGANIZATION NAME] to incorporate ecological responsibility into the organization's governance and operations.

## ARTICLE I: ECOLOGICAL PURPOSE

Section 1.1 Ecological Mission
The organization's mission shall include a commitment to ecological regeneration. All activities shall be evaluated based on their ecological impact as well as their social and economic outcomes.

Section 1.2 Commitment to Future Generations
The organization acknowledges its responsibility to future generations and non-human life. This responsibility shall be considered in all significant decisions.

## ARTICLE II: ECOLOGICAL GOVERNANCE

Section 2.1 Ecological Representation
The Board of Directors shall include at least [NUMBER] directors with ecological expertise or who explicitly represent ecological interests.

Section 2.2 Ecological Advisory Council
An Ecological Advisory Council shall be established to:
a) Advise the Board and management on ecological matters
b) Review and report on the organization's ecological impacts
c) Recommend improvements to ecological practices
d) Hold rights of consultation on decisions with significant ecological implications

Section 2.3 Rights of Nature
The organization recognizes the rights of natural systems to exist, regenerate, and evolve. These rights shall be represented in governance processes through:
a) Regular assessment of organizational impacts on ecosystems
b) Inclusion of ecological indicators in strategic planning
c) Allocation of resources for ecological regeneration

## ARTICLE III: ECOLOGICAL DECISION-MAKING

Section 3.1 Ecological Impact Assessment
All major organizational decisions shall include an assessment of:
a) Short and long-term ecological impacts
b) Carbon footprint and climate implications
c) Biodiversity effects
d) Resource use and waste generation
e) Potential for regenerative outcomes

Section 3.2 Ecological Decision Threshold
Decisions with significant negative ecological impact shall require a [PERCENTAGE] supermajority vote of the Board.

...
[Truncated for preview]
    `
  },
  {
    id: 'perpetual-purpose-trust',
    title: 'Perpetual Purpose Trust for Ecological Business',
    description: 'Legal structure to lock in ecological purpose and stakeholder governance for the long term, preventing extraction or mission drift.',
    category: 'entity-formation',
    tags: ['perpetual-purpose-trust', 'steward-ownership', 'mission-lock'],
    fileType: 'pdf',
    complexity: 'advanced',
    previewText: `
# PERPETUAL PURPOSE TRUST FOR ECOLOGICAL BUSINESS

## ARTICLE I: ESTABLISHMENT AND PURPOSE

1.1 Establishment
This Perpetual Purpose Trust (the "Trust") is hereby established by [FOUNDER(S) NAME(S)] (the "Founder(s)") for the benefit of the purposes set forth herein.

1.2 Trust Name
The name of this Trust shall be the [TRUST NAME] Perpetual Purpose Trust.

1.3 Charitable Purpose
The Trust is organized and shall be operated exclusively for the following charitable, educational, and ecological purposes:
a) To steward [BUSINESS NAME] (the "Business") as an ecological enterprise that [SPECIFIC ECOLOGICAL PURPOSE]
b) To ensure the Business operates according to the Stewardship Principles defined in Schedule A
c) To protect the Business from extraction, financialization, and mission drift
d) To preserve the Business as a multi-stakeholder enterprise that benefits workers, community, and nature

## ARTICLE II: TRUST PROPERTY

2.1 Initial Trust Property
The initial property of the Trust shall consist of [DESCRIPTION OF INITIAL PROPERTY, typically voting shares or membership interests in the Business].

2.2 Trust Structure
The Trust shall hold the voting rights of the Business to ensure adherence to its purpose, while economic rights may be allocated to various stakeholders as appropriate.

2.3 Stewardship Not Ownership
The Trust does not "own" the Business in the conventional sense, but rather stewards it for its stated purposes. No individual may extract the fundamental value of the Business for private gain.

## ARTICLE III: GOVERNANCE STRUCTURE

3.1 Trust Protector Committee
The Trust shall be overseen by a Trust Protector Committee responsible for:
a) Ensuring the Trust's purposes are honored
b) Selecting, evaluating, and if necessary, removing Trustees
c) Resolving interpretation questions regarding the Trust's purpose
d) Approving any amendments to the Trust as permitted herein

3.2 Trustees
The Trust shall have [NUMBER] Trustees who are responsible for:
a) Exercising the Trust's voting rights in the Business
b) Ensuring the Business adheres to the Stewardship Principles
c) Managing Trust assets
d) Reporting to the Trust Protector Committee

...
[Truncated for preview]
    `
  },
  {
    id: 'cooperative-conversion',
    title: 'Business Conversion to Cooperative Ownership',
    description: 'Legal roadmap and templates for converting a conventional business to worker or multi-stakeholder cooperative ownership.',
    category: 'entity-formation',
    tags: ['cooperative-conversion', 'worker-ownership', 'business-transition'],
    fileType: 'docx',
    complexity: 'advanced',
    previewText: `
# BUSINESS CONVERSION TO COOPERATIVE OWNERSHIP

## SECTION 1: CONVERSION OVERVIEW AND PROCESS

1.1 Purpose of This Document
This document provides the legal framework for converting [BUSINESS NAME] (the "Business") from its current structure as a [CURRENT LEGAL STRUCTURE] to a [TYPE OF COOPERATIVE] cooperative (the "Cooperative").

1.2 Conversion Process Summary
The conversion shall proceed through the following phases:
a) Feasibility and Planning (current phase)
b) Legal Structure Design
c) Governance Development
d) Financial Restructuring
e) Legal Conversion
f) Transitional Operations
g) Full Cooperative Operations

1.3 Timeline
The conversion is expected to be completed within [TIMEFRAME], with specific milestones detailed in Schedule A.

## SECTION 2: LEGAL CONVERSION STRUCTURE

2.1 Conversion Method
The Business shall be converted to a cooperative through the following method:
[SELECT ONE OR COMBINE:
- Entity Conversion: Direct conversion of the existing legal entity to a cooperative structure
- Asset Sale: Formation of a new cooperative entity that purchases the assets of the Business
- Statutory Merger: Merger of the Business into a newly formed cooperative]

2.2 Resulting Cooperative Type
The resulting cooperative shall be a [SELECT ONE:
- Worker Cooperative: Owned and governed by employees
- Consumer Cooperative: Owned and governed by customers/users
- Multi-stakeholder Cooperative: Owned and governed by multiple stakeholder groups
- Producer Cooperative: Owned and governed by producers/suppliers]

2.3 Legal Documentation
The conversion shall require the following legal documents:
a) [DOCUMENTS SPECIFIC TO CONVERSION METHOD]
b) New Articles of Incorporation
c) Cooperative Bylaws
d) Membership Agreements
e) Internal Capital Account System Documentation
f) [ADDITIONAL DOCUMENTS AS NEEDED]

...
[Truncated for preview]
    `
  },
];

const LegalTemplates: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedComplexity, setSelectedComplexity] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [openTemplateId, setOpenTemplateId] = useState<string | null>(null);

  const handleCopy = (templateId: string) => {
    const template = legalTemplates.find(t => t.id === templateId);
    if (template) {
      navigator.clipboard.writeText(template.previewText);
      setCopiedId(templateId);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const filteredTemplates = legalTemplates.filter(template => {
    const matchesSearch = 
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    
    const matchesComplexity = selectedComplexity === 'all' || template.complexity === selectedComplexity;
    
    return matchesSearch && matchesCategory && matchesComplexity;
  });

  const getCategoryName = (category: string) => {
    switch(category) {
      case 'entity-formation': return 'Entity Formation';
      case 'governance': return 'Governance';
      case 'agreements': return 'Agreements';
      case 'policies': return 'Policies';
      case 'intellectual-property': return 'Intellectual Property';
      default: return category;
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch(complexity) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 mb-2">
          Legal Templates for Equitable Business Structures
        </h1>
        <p className="text-slate-600 max-w-3xl">
          Access customizable legal templates designed specifically for creating equitable, ecological, 
          and collaborative business ventures. These templates provide the legal foundation for implementing 
          the Stewardship Investment Model and democratic governance structures.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search templates by name, description, or tags..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="entity-formation">Entity Formation</SelectItem>
              <SelectItem value="governance">Governance</SelectItem>
              <SelectItem value="agreements">Agreements</SelectItem>
              <SelectItem value="policies">Policies</SelectItem>
              <SelectItem value="intellectual-property">Intellectual Property</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedComplexity} onValueChange={setSelectedComplexity}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Complexity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="mt-4 text-lg font-medium text-slate-900">No templates found</h3>
            <p className="mt-2 text-sm text-slate-600">
              Try adjusting your search or filters to find what you're looking for
            </p>
          </div>
        ) : (
          filteredTemplates.map(template => (
            <Card key={template.id} className="flex flex-col h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {template.fileType === 'pdf' ? (
                      <FileIcon className="h-5 w-5 text-red-500" />
                    ) : (
                      <FileText className="h-5 w-5 text-blue-500" />
                    )}
                    <span className="text-xs uppercase ml-2 text-slate-500">{template.fileType}</span>
                  </div>
                  <Badge variant="outline" className={getComplexityColor(template.complexity)}>
                    {template.complexity}
                  </Badge>
                </div>
                <CardTitle className="text-xl mt-2">{template.title}</CardTitle>
                <CardDescription className="text-sm font-medium text-slate-700">
                  {getCategoryName(template.category)}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <p className="text-slate-600 text-sm">{template.description}</p>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {template.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex gap-2 border-t pt-4">
                <Dialog open={openTemplateId === template.id} onOpenChange={(open) => setOpenTemplateId(open ? template.id : null)}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>{template.title}</DialogTitle>
                      <DialogDescription className="text-slate-700">
                        {getCategoryName(template.category)} • {template.complexity} • {template.fileType.toUpperCase()}
                      </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="h-[500px] mt-4 border rounded-md p-4 bg-slate-50">
                      <pre className="whitespace-pre-wrap font-mono text-sm text-slate-800">
                        {template.previewText}
                      </pre>
                    </ScrollArea>
                    <div className="flex justify-between mt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => handleCopy(template.id)}
                        className={`${copiedId === template.id ? "text-green-600" : ""}`}
                      >
                        {copiedId === template.id ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <FileText className="h-4 w-4 mr-2" />
                            Copy Text
                          </>
                        )}
                      </Button>
                      <a
                        href={`/forms/${template.id}.${template.fileType}`}
                        download
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-primary-foreground hover:bg-blue-700 h-10 px-4 py-2"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Template
                      </a>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <a
                  href={`/forms/${template.id}.${template.fileType}`}
                  download
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-primary-foreground hover:bg-blue-700 h-10 px-4 py-2 flex-1"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </a>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
      
      <div className="bg-blue-50 rounded-lg p-6 mt-10">
        <h2 className="text-xl font-bold text-blue-800 mb-2">Need a Custom Legal Template?</h2>
        <p className="text-blue-700 mb-4">
          These templates provide a starting point, but should be customized for your specific situation and reviewed by a qualified legal professional in your jurisdiction.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Legal Consultation</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm">Book a consultation with legal experts in cooperative and equitable business structures.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Request Consultation</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Template Customization</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm">Get help adapting these templates to your specific business needs and local jurisdiction.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Request Customization</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Legal Resources</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm">Access our library of legal guides, case studies, and additional resources.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Browse Resources</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LegalTemplates;