import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "wouter";
import { CheckCircle } from "lucide-react";
import ProfileForm from "@/components/profile/ProfileForm";

const benefits = [
  "Add skills and expertise you bring to collaborative ventures",
  "Specify tangible resources you can share (land, equipment, facilities)",
  "Define your ecological values and business ethics priorities",
  "Connect with others who complement your capabilities"
];

const ProfileSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:w-1/2 md:pr-12">
            <h2 className="text-3xl font-bold text-neutral-900">Create Your Collaborative Profile</h2>
            <p className="mt-4 text-lg text-neutral-800">
              Share your unique combination of skills, resources, and values to find perfect matches for ecological business creation.
            </p>
            
            <ul className="mt-6 space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="text-primary h-5 w-5 mt-1 mr-2" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-8">
              <Button size="lg" className="bg-primary hover:bg-primary-dark text-white">
                <Link href="/profile">Create Profile</Link>
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 mt-10 md:mt-0">
            <ProfileForm preview={true} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
