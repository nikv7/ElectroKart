
import React, { useState } from 'react';
import { MobileLayout } from '../components/MobileLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const PersonalInformation = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'email@email.com',
    phone: '+1 (123) 456-7890',
    dateOfBirth: '1990-01-01'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Information updated",
      description: "Your personal information has been updated successfully."
    });
  };

  return (
    <MobileLayout showBackButton title="Personal Information" gradient>
      <div className="bg-zinc-100 min-h-screen pt-6 pb-24">
        <form onSubmit={handleSubmit} className="w-80 mx-auto">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="mb-4">
              <label className="block text-sm font-lexend text-gray-700 mb-1">
                First Name
              </label>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border-gray-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-lexend text-gray-700 mb-1">
                Last Name
              </label>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border-gray-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-lexend text-gray-700 mb-1">
                Email
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-gray-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-lexend text-gray-700 mb-1">
                Phone Number
              </label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border-gray-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-lexend text-gray-700 mb-1">
                Date of Birth
              </label>
              <Input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full border-gray-300"
              />
            </div>
          </div>

          <Button 
            type="submit"
            className="w-full mt-6 bg-violet-400 hover:bg-violet-500 text-black font-lexend rounded-[20px]"
          >
            SAVE CHANGES
          </Button>
        </form>
      </div>
    </MobileLayout>
  );
};

export default PersonalInformation;
