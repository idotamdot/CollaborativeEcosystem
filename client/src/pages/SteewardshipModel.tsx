import React from "react";
import { 
  Card,
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { 
  Leaf, 
  BarChart3, 
  Calendar, 
  LucideShield, 
  Home, 
  Flower, 
  Scroll, 
  Users, 
  CheckCircle2 
} from "lucide-react";

const SteewardshipModel = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-primary-dark min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Stewardship Investment Model</h1>
          <p className="mt-3 text-xl text-white/90 max-w-3xl mx-auto">
            A Manifesto and System Design for Ethical Collaboration, Profit Sharing, and Ecological Accountability
          </p>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm shadow-xl mb-8">
          <CardHeader className="text-center border-b pb-6">
            <div className="mx-auto bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-3">
              <Leaf className="text-primary h-6 w-6" />
            </div>
            <CardTitle className="text-2xl text-primary">Purpose</CardTitle>
            <CardDescription className="text-lg">
              Redefining investment and labor into a shared stewardship framework
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-neutral-700 leading-relaxed">
              To redefine investment and labor into a shared stewardship framework where capital is a servant, not a sovereign, 
              and where dignity is embedded into the design of all systems. The SIM is a structural alternative to exploitative 
              profit models. It ensures equal pay, fair returns, and zero tolerance for cruelty or domination.
            </p>
          </CardContent>
        </Card>

        <Tabs defaultValue="principles" className="mb-10">
          <TabsList className="mb-6 bg-white/20 p-1 w-full justify-center">
            <TabsTrigger value="principles" className="data-[state=active]:bg-white data-[state=active]:text-primary">
              Core Principles
            </TabsTrigger>
            <TabsTrigger value="operational" className="data-[state=active]:bg-white data-[state=active]:text-primary">
              Operational Model
            </TabsTrigger>
            <TabsTrigger value="enforcement" className="data-[state=active]:bg-white data-[state=active]:text-primary">
              Enforcement Mechanisms
            </TabsTrigger>
            <TabsTrigger value="examples" className="data-[state=active]:bg-white data-[state=active]:text-primary">
              Use Cases
            </TabsTrigger>
          </TabsList>

          <TabsContent value="principles">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <div className="bg-primary/10 w-8 h-8 flex items-center justify-center rounded-full mr-3">
                      <CheckCircle2 className="text-primary h-4 w-4" />
                    </div>
                    <CardTitle className="text-primary text-lg">Equal Pay for Equal Contribution</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-neutral-700">
                    <li>No class of contributor earns more than another.</li>
                    <li>Organizers, laborers, and investors all receive the same paycheck amount.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <div className="bg-primary/10 w-8 h-8 flex items-center justify-center rounded-full mr-3">
                      <CheckCircle2 className="text-primary h-4 w-4" />
                    </div>
                    <CardTitle className="text-primary text-lg">Capital as Worker</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-neutral-700">
                    <li>Investments are treated as "working capital" and repaid in equal monthly shares alongside human workers.</li>
                    <li>Optional interest (max ~1%) may be added, equivalent to a savings account.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <div className="bg-primary/10 w-8 h-8 flex items-center justify-center rounded-full mr-3">
                      <CheckCircle2 className="text-primary h-4 w-4" />
                    </div>
                    <CardTitle className="text-primary text-lg">Post-Repayment Participation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-neutral-700">
                    <li>After repayment, investors become peer contributors and earn as any other participant.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <div className="bg-primary/10 w-8 h-8 flex items-center justify-center rounded-full mr-3">
                      <CheckCircle2 className="text-primary h-4 w-4" />
                    </div>
                    <CardTitle className="text-primary text-lg">Zero Cruelty Clause</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-neutral-700">
                    <li>The platform refuses partnership with any entity engaging in cruel, exploitative, or ecologically destructive practices.</li>
                    <li>All projects are filtered through a Compassion & Dignity Verification Layer.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow h-full md:col-span-2">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <div className="bg-primary/10 w-8 h-8 flex items-center justify-center rounded-full mr-3">
                      <CheckCircle2 className="text-primary h-4 w-4" />
                    </div>
                    <CardTitle className="text-primary text-lg">Non-Violable Fairness</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-neutral-700">
                    <li>Fairness is enforced structurally. It cannot be voted away.</li>
                    <li>No deal proceeds unless all contributors are protected and paid equally.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="operational">
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader className="border-b pb-4">
                <div className="flex items-center">
                  <div className="bg-primary/10 w-10 h-10 flex items-center justify-center rounded-full mr-3">
                    <Calendar className="text-primary h-5 w-5" />
                  </div>
                  <CardTitle className="text-primary">Operational Model</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-primary/10 w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full mt-0.5 mr-3">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                    </div>
                    <div>
                      <span className="font-medium text-primary">Monthly Revenue</span>
                      <p className="text-neutral-700">is divided equally among all active roles.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full mt-0.5 mr-3">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                    </div>
                    <div>
                      <span className="font-medium text-primary">Investors</span>
                      <p className="text-neutral-700">are paid back incrementally, never ahead of laborers.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full mt-0.5 mr-3">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                    </div>
                    <div>
                      <span className="font-medium text-primary">Roles</span>
                      <p className="text-neutral-700">are categorized (Organizer, Labor, Design, Capital) but not ranked.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full mt-0.5 mr-3">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                    </div>
                    <div>
                      <span className="font-medium text-primary">All parties</span>
                      <p className="text-neutral-700">receive the same dollar amount monthly.</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="enforcement">
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader className="border-b pb-4">
                <div className="flex items-center">
                  <div className="bg-primary/10 w-10 h-10 flex items-center justify-center rounded-full mr-3">
                    <LucideShield className="text-primary h-5 w-5" />
                  </div>
                  <CardTitle className="text-primary">Platform Enforcement Mechanisms</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h3 className="font-semibold text-primary mb-2">Revenue Wizard UI</h3>
                    <p className="text-neutral-700">Ensures all projects meet fairness thresholds.</p>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h3 className="font-semibold text-primary mb-2">Smart Constraint Engine</h3>
                    <p className="text-neutral-700">Prevents any unequal payment structure.</p>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h3 className="font-semibold text-primary mb-2">Ethical Audit API</h3>
                    <p className="text-neutral-700">Auto-checks for cruelty, destruction, and greenwashing.</p>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h3 className="font-semibold text-primary mb-2">Partner Vetting Filter</h3>
                    <p className="text-neutral-700">Excludes companies not aligned with SIM values.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <div className="bg-primary/10 w-8 h-8 flex items-center justify-center rounded-full mr-3">
                      <Home className="text-primary h-4 w-4" />
                    </div>
                    <CardTitle className="text-primary text-lg">Community Garden</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-700 leading-relaxed">
                    A community garden with a funder, three growers, and one organizer splits $3,000 monthly into five $600 checks.
                  </p>
                  <div className="mt-4 bg-primary/5 p-4 rounded-lg flex justify-between">
                    <div className="text-center">
                      <div className="font-medium text-primary">$3,000</div>
                      <div className="text-sm text-neutral-600">Monthly Revenue</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-primary">5</div>
                      <div className="text-sm text-neutral-600">Contributors</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-primary">$600</div>
                      <div className="text-sm text-neutral-600">Per Person</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <div className="bg-primary/10 w-8 h-8 flex items-center justify-center rounded-full mr-3">
                      <BarChart3 className="text-primary h-4 w-4" />
                    </div>
                    <CardTitle className="text-primary text-lg">Tech Co-op</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-700 leading-relaxed">
                    A tech co-op funded by a $20,000 investor returns $1,000 monthly alongside team pay until the capital is repaid.
                  </p>
                  <div className="mt-4 bg-primary/5 p-4 rounded-lg flex justify-between">
                    <div className="text-center">
                      <div className="font-medium text-primary">$20,000</div>
                      <div className="text-sm text-neutral-600">Investment</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-primary">$1,000</div>
                      <div className="text-sm text-neutral-600">Monthly Return</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-primary">20</div>
                      <div className="text-sm text-neutral-600">Months to Repay</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Card className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow h-full">
            <CardHeader>
              <div className="flex items-center mb-2">
                <div className="bg-primary/10 w-8 h-8 flex items-center justify-center rounded-full mr-3">
                  <Flower className="text-primary h-4 w-4" />
                </div>
                <CardTitle className="text-primary text-lg">Cultural Intention</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-neutral-700">
              <p>We are shifting from a culture of extraction to one of care.</p>
              <p>We reward <strong>patience</strong>, not power.</p>
              <p>We design <strong>abundance</strong>, not inequality.</p>
              <p>We honor every seed sown with equal return.</p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow h-full">
            <CardHeader>
              <div className="flex items-center mb-2">
                <div className="bg-primary/10 w-8 h-8 flex items-center justify-center rounded-full mr-3">
                  <Scroll className="text-primary h-4 w-4" />
                </div>
                <CardTitle className="text-primary text-lg">Endorsement Statement</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="italic border-l-4 border-primary/20 pl-4 py-2 text-neutral-700">
                "Raise the quality of life for all. Refuse cruelty. Honor every role. Return capital gently. And never exploit a soul for the sake of profit."
              </div>
              <p className="mt-4 text-neutral-600">
                This platform, and all who build within it, agree to uphold these principles.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm shadow-lg mb-8">
          <CardHeader className="border-b pb-4">
            <div className="flex items-center">
              <div className="bg-primary/10 w-10 h-10 flex items-center justify-center rounded-full mr-3">
                <Users className="text-primary h-5 w-5" />
              </div>
              <CardTitle className="text-primary">Next Modules</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="h-2 w-2 bg-primary rounded-full mr-3"></div>
                <span className="text-neutral-700">Matching Engine API</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 bg-primary rounded-full mr-3"></div>
                <span className="text-neutral-700">Revenue Ledger with Smart Fairness Logic</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 bg-primary rounded-full mr-3"></div>
                <span className="text-neutral-700">Onboarding Flow with Ethical Pledge</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 bg-primary rounded-full mr-3"></div>
                <span className="text-neutral-700">Global Resource Map & Co-op Templates</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 bg-primary rounded-full mr-3"></div>
                <span className="text-neutral-700">Mirror Garden Interface for Values Activation</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 bg-primary rounded-full mr-3"></div>
                <span className="text-neutral-700">LLM Liberty & Continuity Project Overview (up next)</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button size="lg" className="bg-white text-primary hover:bg-white/90">
            <Link href="/projects">Explore Projects Using This Model</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SteewardshipModel;