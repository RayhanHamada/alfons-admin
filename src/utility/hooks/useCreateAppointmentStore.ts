import create from 'zustand';
import { combine } from 'zustand/middleware';

export type CreateAppointmentUserDataFormValue = {
  klienId: string;
};

const useCreateAppointmentStore = create(
  combine(
    {
      isServiceDrawerOpen: false,
      isCreateKlienDrawerOpen: false,

      serviceIds: [] as number[],

      klienId: '',
    },
    (set, get) => ({
      toggleServiceDrawer: () =>
        set(({ isServiceDrawerOpen }) => ({
          isServiceDrawerOpen: !isServiceDrawerOpen,
        })),
      closeServiceDrawer: () => set({ isServiceDrawerOpen: false }),

      toggleCreateKlienDrawer: () =>
        set(({ isCreateKlienDrawerOpen }) => ({
          isCreateKlienDrawerOpen: !isCreateKlienDrawerOpen,
        })),
      closeCreateKlienDrawer: () => set({ isCreateKlienDrawerOpen: false }),

      addServiceId: (id: number) =>
        get().serviceIds.includes(id)
          ? undefined
          : set({
              serviceIds: [...get().serviceIds, id],
            }),

      removeServiceId: (id: number) =>
        set(({ serviceIds }) => ({
          serviceIds: serviceIds.filter((v) => v !== id),
        })),

      setKlienId: (id: string) => set({ klienId: id }),
    })
  )
);

export default useCreateAppointmentStore;
