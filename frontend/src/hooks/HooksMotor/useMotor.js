import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motorService } from '../../services/ServiceMotor/motorService';
import Swal from 'sweetalert2';

export const useMotorBrands = (options = {}) => {
  return useQuery({
    // IMPORTANT: Isama ang filters sa queryKey. 
    // Kapag nagbago ang search, mag-re-fetch ang query na 'to.
    queryKey: ['brands'],

    // Ipasa ang brand sa service function
    queryFn: () => motorService.getMotorByBrand(), // Mas malinis na!
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: 1000,
    ...options
  });
};

export const useMotorModels = (brand) => {
  return useQuery({
    // IMPORTANT: Isama ang filters sa queryKey. 
    // Kapag nagbago ang search, mag-re-fetch ang query na 'to.
    queryKey: ['models', brand],

    // Ipasa ang brand sa service function
    queryFn: () => motorService.getMotorModels(brand), // Mas malinis na!
    enabled: !!brand,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: 1000,
  });
};

export const useMotorColors = (model) => {
  return useQuery({
    queryKey: ['colors', model],
    queryFn: () => motorService.getMotorColors(model),
    enabled: !!model, // TATAKBO LANG KUNG MAY MODEL NA
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: 1000,
  });
};

export const useMotorChassis = (color) => {
  return useQuery({
    queryKey: ['chassis', color],
    queryFn: () => motorService.getMotorChassis(color),
    enabled: !!color,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: 1000,
  });
};