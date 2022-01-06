import create from 'zustand';
import { combine } from 'zustand/middleware';

export type CreateAppointmentUserDataFormValue = {
  klienId: string;
};

const useCreateAppointmentStore = create(
  combine(
    {
      isDrawerOpen: false,

      serviceIds: [] as number[],

      klienId: '',
    },
    (set, get) => ({
      toggleDrawer: () =>
        set(({ isDrawerOpen }) => ({
          isDrawerOpen: !isDrawerOpen,
        })),
      closeDrawer: () => set(() => ({ isDrawerOpen: false })),

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
