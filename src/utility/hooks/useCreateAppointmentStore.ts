import create from 'zustand';
import { combine } from 'zustand/middleware';

export type CreateAppointmentUserDataFormValue = {
  klienId: string;
};

const useCreateAppointmentStore = create(
  combine(
    {
      isServiceDrawerOpen: false,

      serviceIds: [] as number[],

      klienId: '',
    },
    (set, get) => ({
      toggleServiceDrawer: () =>
        set(({ isServiceDrawerOpen }) => ({
          isServiceDrawerOpen: !isServiceDrawerOpen,
        })),
      closeServiceDrawer: () => set(() => ({ isServiceDrawerOpen: false })),

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
    })
  )
);

export default useCreateAppointmentStore;
