import create from 'zustand';
import { combine } from 'zustand/middleware';

const useAppointmentStore = create(
  combine(
    {
      serviceIds: [] as number[],
      isDrawerOpen: false,
    },
    (set, get) => ({
      addServiceId: (id: number) =>
        get().serviceIds.includes(id)
          ? undefined
          : set({
              serviceIds: [...get().serviceIds, id],
            }),

      removeServiceId: (id: number) =>
        set({
          serviceIds: get().serviceIds.filter((v) => v !== id),
        }),

      toggleDrawer: () =>
        set(({ isDrawerOpen }) => ({
          isDrawerOpen: !isDrawerOpen,
        })),
    })
  )
);

export default useAppointmentStore;
