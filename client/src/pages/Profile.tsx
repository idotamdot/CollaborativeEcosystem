import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import ProfileForm from "@/components/profile/ProfileForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Profile = () => {
  const { toast } = useToast();
  
  const createProfileMutation = useMutation({
    mutationFn: async (profileData: any) => {
      return apiRequest("POST", "/api/users", profileData);
    },
    onSuccess: () => {
      toast({
        title: "Profile Created",
        description: "Your profile has been successfully created. You can now start connecting with others.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create profile: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  const handleProfileSubmit = (profileData: any) => {
    // In a real app, we would format the data properly
    // and handle authentication state
    createProfileMutation.mutate({
      username: `user_${Date.now()}`,
      password: "tempPassword123",
      ...profileData
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            Create Your Collaborative Profile
          </CardTitle>
          <CardDescription>
            Share your unique skills, resources, and values to find the perfect match for sustainable business ventures
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm onSubmit={handleProfileSubmit} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
