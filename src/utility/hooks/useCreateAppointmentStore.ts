import { Dayjs } from '@utility/dayjs';
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
      isCreateScheduleDrawerOpen: false,

      serviceIds: [] as number[],

      klienId: undefined as number | undefined,

      stylishId: undefined as number | undefined,
      jamId: undefined as string | undefined,
      tanggal: undefined as Dayjs | undefined,

      note: '',
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

      toggleCreateScheduleDrawer: () =>
        set(({ isCreateScheduleDrawerOpen }) => ({
          isCreateScheduleDrawerOpen: !isCreateScheduleDrawerOpen,
        })),
      closeCreateScheduleDrawer: () =>
        set({ isCreateScheduleDrawerOpen: false }),

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

      setKlienId: (klienId: number) => set({ klienId }),

      setSchedule: ({
        stylishId,
        jamId,
        tanggal,
      }: {
        stylishId?: number;
        jamId?: string;
        tanggal?: Dayjs;
      }) =>
        set({
          stylishId,
          jamId,
          tanggal,
        }),

      setNote: (note: string) => set({ note }),
    })
  )
);

export default useCreateAppointmentStore;
