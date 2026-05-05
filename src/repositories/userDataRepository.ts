import { defaultGameTree } from './gameTreeRepository'
import type { UserDataExport } from '../types/userData'
import { readJson, removeStorageKeys, storageKeys, writeJson } from '../utils/storage'

export const exportUserData = async (): Promise<UserDataExport> => ({
  version: 1,
  exportedAt: new Date().toISOString(),
  gameTree: readJson(storageKeys.gameTree, defaultGameTree),
  settings: readJson(storageKeys.settings, {}),
})

export const importUserData = async (data: Partial<UserDataExport>): Promise<void> => {
  if (data.gameTree) writeJson(storageKeys.gameTree, data.gameTree)
  if (data.settings) writeJson(storageKeys.settings, data.settings)
}

export const resetUserData = async (): Promise<void> => {
  removeStorageKeys([
    storageKeys.gameTree,
    storageKeys.settings,
  ])
}
