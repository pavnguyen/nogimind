import { useMutation } from '@tanstack/react-query'
import { importUserData, resetUserData } from '../repositories/userDataRepository'
import type { UserDataExport } from '../types/userData'

export const useResetUserDataMutation = () =>
  useMutation({
    mutationFn: resetUserData,
  })

export const useImportUserDataMutation = () =>
  useMutation({
    mutationFn: (data: Partial<UserDataExport>) => importUserData(data),
  })
