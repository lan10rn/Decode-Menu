import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type BaseDiet =
  | "standard"
  | "pescatarian"
  | "vegetarian"
  | "vegan"
  | "jain";

interface DietState {
  baseDiet: BaseDiet;
  meatExclusions: string[]; // ['pork', 'beef']
  restrictions: string[]; //  ['peanuts', 'cilantro']

  setBaseDiet: (diet: BaseDiet) => void;
  toggleMeatExclusion: (meat: string) => void;
  addRestriction: (restriction: string) => void;
  removeRestriction: (restriction: string) => void;
}

export const useDietStore = create<DietState>()(
  persist(
    (set) => ({
      baseDiet: "standard",
      meatExclusions: [],
      restrictions: [],

      setBaseDiet: (diet) => set({ baseDiet: diet }),

      toggleMeatExclusion: (meat) =>
        set((state) => ({
          meatExclusions: state.meatExclusions.includes(meat)
            ? state.meatExclusions.filter((m) => m !== meat)
            : [...state.meatExclusions, meat],
        })),

      addRestriction: (restriction) =>
        set((state) => {
          const clean = restriction.trim().toLowerCase();
          if (!clean || state.restrictions.includes(clean)) return state;
          return { restrictions: [...state.restrictions, clean] };
        }),

      removeRestriction: (restriction) =>
        set((state) => ({
          restrictions: state.restrictions.filter((r) => r !== restriction),
        })),
    }),
    {
      name: "diet-preferences-v2",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
