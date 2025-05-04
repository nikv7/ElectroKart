
import React, { useState } from 'react';
import { MobileLayout } from '../components/MobileLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

const Addresses = () => {
  const { toast } = useToast();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: 'Home',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      isDefault: true
    },
    {
      id: '2',
      name: 'Work',
      street: '456 Office Blvd',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      isDefault: false
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState<Omit<Address, 'id'>>({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    isDefault: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      name: address.name,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      isDefault: address.isDefault
    });
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter(address => address.id !== id));
    toast({
      title: "Address deleted",
      description: "The address has been removed successfully."
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAddress) {
      // Update existing address
      const updatedAddresses = addresses.map(addr => 
        addr.id === editingAddress.id ? { ...formData, id: editingAddress.id } : addr
      );
      setAddresses(updatedAddresses);
      toast({
        title: "Address updated",
        description: "Your address has been updated successfully."
      });
    } else {
      // Add new address
      const newAddress: Address = {
        ...formData,
        id: Date.now().toString()
      };
      setAddresses([...addresses, newAddress]);
      toast({
        title: "Address added",
        description: "Your new address has been added successfully."
      });
    }
    
    // Reset form
    setShowAddForm(false);
    setEditingAddress(null);
    setFormData({
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      isDefault: false
    });
  };

  return (
    <MobileLayout showBackButton title="Addresses" gradient>
      <div className="bg-zinc-100 min-h-screen pt-6 pb-24">
        {!showAddForm ? (
          <>
            <div className="px-6 mb-6 flex justify-between items-center">
              <h2 className="text-xl font-lexend">My Addresses</h2>
              <Button 
                onClick={() => setShowAddForm(true)}
                variant="outline"
                className="border-violet-400 text-violet-600"
              >
                Add New
              </Button>
            </div>
            
            <div className="px-6 space-y-4">
              {addresses.map((address) => (
                <div 
                  key={address.id} 
                  className="bg-white rounded-lg p-4 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-lexend text-lg">
                      {address.name}
                      {address.isDefault && (
                        <span className="ml-2 text-xs bg-violet-100 text-violet-600 py-1 px-2 rounded-full">
                          Default
                        </span>
                      )}
                    </h3>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(address)}
                        className="text-blue-500 text-sm"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(address.id)}
                        className="text-red-500 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{address.street}</p>
                  <p className="text-gray-600 text-sm">{address.city}, {address.state} {address.zipCode}</p>
                </div>
              ))}
              
              {addresses.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No addresses found. Add an address to get started.
                </div>
              )}
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="w-80 mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-lexend mb-4">
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </h2>
              
              <div className="mb-4">
                <label className="block text-sm font-lexend text-gray-700 mb-1">
                  Address Name
                </label>
                <Input
                  type="text"
                  name="name"
                  placeholder="e.g. Home, Work"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border-gray-300"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-lexend text-gray-700 mb-1">
                  Street Address
                </label>
                <Input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                  className="w-full border-gray-300"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-lexend text-gray-700 mb-1">
                  City
                </label>
                <Input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full border-gray-300"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-lexend text-gray-700 mb-1">
                    State
                  </label>
                  <Input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-lexend text-gray-700 mb-1">
                    ZIP Code
                  </label>
                  <Input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    className="w-full border-gray-300"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isDefault"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="isDefault" className="text-sm font-lexend text-gray-700">
                  Set as default address
                </label>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button 
                type="button"
                variant="outline"
                className="flex-1 border-gray-300"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingAddress(null);
                }}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="flex-1 bg-violet-400 hover:bg-violet-500 text-black"
              >
                Save
              </Button>
            </div>
          </form>
        )}
      </div>
    </MobileLayout>
  );
};

export default Addresses;
