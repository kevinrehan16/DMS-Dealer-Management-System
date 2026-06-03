import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { inventoryService } from '../../services/ServiceInventory/InventoryService'

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