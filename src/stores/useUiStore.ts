import { create } from 'zustand'

type UiStore = {
  mobileNavOpen: boolean
  selectedSkillId?: string
  setMobileNavOpen: (open: boolean) => void
  setSelectedSkillId: (skillId?: string) => void
}

export const useUiStore = create<UiStore>((set) => ({
  mobileNavOpen: false,
  selectedSkillId: undefined,
  setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),
  setSelectedSkillId: (selectedSkillId) => set({ selectedSkillId }),
}))
