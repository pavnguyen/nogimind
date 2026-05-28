import { create } from 'zustand'

type UiStore = {
  mobileNavOpen: boolean
  selectedSkillId?: string
  showKeyboardShortcuts: boolean
  setMobileNavOpen: (open: boolean) => void
  setSelectedSkillId: (skillId?: string) => void
  setShowKeyboardShortcuts: (show: boolean) => void
  toggleKeyboardShortcuts: () => void
}

export const useUiStore = create<UiStore>((set) => ({
  mobileNavOpen: false,
  selectedSkillId: undefined,
  showKeyboardShortcuts: false,
  setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),
  setSelectedSkillId: (selectedSkillId) => set({ selectedSkillId }),
  setShowKeyboardShortcuts: (showKeyboardShortcuts) => set({ showKeyboardShortcuts }),
  toggleKeyboardShortcuts: () => set((state) => ({ showKeyboardShortcuts: !state.showKeyboardShortcuts })),
}))
