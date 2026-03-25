import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService, createNewUser } from '../../services/ServiceUser/userService';
import Swal from 'sweetalert2';

// Dagdagan ng 'filters' na parameter
export const useUsers = (filters = {}) => {
  return useQuery({
    // IMPORTANT: Isama ang filters sa queryKey. 
    // Kapag nagbago ang search, mag-re-fetch ang query na 'to.
    queryKey: ['users', filters],

    // Ipasa ang filters sa service function
    queryFn: () => userService.getAllUsers(filters), // Mas malinis na!
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: 1000,
  });
};

export const useCreateNewUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.createNewUser,
    onSuccess: () => {
      // ETO ANG PINAKAMAHALAGA:
      // Sinasabi nito sa React Query na "luma na yung listahan ng users, i-fetch mo uli"
      queryClient.invalidateQueries({ queryKey: ['users'] });
      
      Swal.fire({
        icon: "success",
        title: "Creating New User",
        text: "User added successfully!",
        footer: 'Record has been saved.'
      });
    },
    onError: (error) => {
      // console.error("API Error Object:", error); 
      // console.error("Server Message:", error.response?.data);

      Swal.fire({
        icon: "error",
        title: "Saving User Error",
        text: error.response?.data?.message || "Failed to add user",
        footer: 'Something went wrong'
      });
    }
  });
};

export const useEditUser = (id) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getUserById(id),
    enabled: !!id, // Tatakbo lang ito kung may ID (Edit mode)
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => userService.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      Swal.fire({
        icon: "success",
        title: "Updating User Information",
        text: "User updated successfully!",
        footer: 'Record has been updated.'
      });
    },
    onError: (error) => {
      // console.error("API Error Object:", error); 
      // console.error("Server Message:", error.response?.data);

      Swal.fire({
        icon: "error",
        title: "Updating User Error",
        text: error.response?.data?.message || "Failed to update user",
        footer: 'Something went wrong'
      });
    }
  });
};