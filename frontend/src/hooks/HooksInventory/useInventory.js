import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { inventoryService } from '../../services/ServiceInventory/InventoryService'
import Swal from 'sweetalert2';

export const useUnitCatalog = () => {
    // Fetch Inventory with optional search
    const unitCatalogQuery = useQuery({
        queryKey: ['unit_catalog'],
        queryFn: () => inventoryService.getUnitCatalog(),
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
        retry: 3,
        retryDelay: 1000,
    });

    return unitCatalogQuery;
}

export const useEditUnitCatalog = (id) => {
  return useQuery({
    queryKey: ['show_unit_catalog', id],
    queryFn: () => inventoryService.editUnitCatalog(id),
    enabled: !!id, // Tatakbo lang ito kung may ID (Edit mode)
  });
};

export const useCreateNewCatalog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: inventoryService.createCatalog,
    onSuccess: () => {
      // ETO ANG PINAKAMAHALAGA:
      // Sinasabi nito sa React Query na "luma na yung listahan ng Inquirys, i-fetch mo uli"
      queryClient.invalidateQueries({ queryKey: ['unit_catalog'] });
      
      Swal.fire({
        icon: "success",
        title: "Creating New Unit Catalog",
        text: "Unit Catalog added successfully!",
        footer: 'Record has been saved.'
      });
    },
    onError: (error) => {
      // console.error("API Error Object:", error); 
      // console.error("Server Message:", error.response?.data);

      Swal.fire({
        icon: "error",
        title: "Saving Unit Catalog Error",
        text: error.response?.data?.message || "Failed to add new Unit Catalog",
        footer: 'Something went wrong'
      });
    }
  });
};

export const useUpdateCatalog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ( { id, catalogData } ) => inventoryService.updateCatalog(id, catalogData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['unit_catalog'], exact: false }); // Mas malawak na invalidation para ma-refresh lahat ng related queries
      queryClient.invalidateQueries({ queryKey: ['show_unit_catalog'], exact: false });
      Swal.fire({
        icon: "success",
        title: "Updating Unit Catalog",
        text: "Unit Catalog updated successfully!",
        footer: 'Record has been saved.'
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Updating Unit Catalog Error",
        text: error.response?.data?.message || "Failed to update Unit Catalog",
        footer: 'Something went wrong'
      });
    }
  });
};

export const useInventory = () => {
    // Fetch Inventory with optional search
    const inventoryQuery = useQuery({
        queryKey: ['inventories'],
        queryFn: () => inventoryService.getInventory(),
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
        retry: 3,
        retryDelay: 1000,
    });

    return inventoryQuery;
}