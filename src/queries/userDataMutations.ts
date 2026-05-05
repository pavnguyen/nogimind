import { useMutation, useQueryClient } from '@tanstack/react-query'
import { importUserData, resetUserData } from '../repositories/userDataRepository'
import type { UserDataExport } from '../types/userData'

const invalidateUserData = (queryClient: ReturnType<typeof useQueryClient>) => {
  queryClient.invalidateQueries({ queryKey: ['gameTree'] })
}

export const useResetUserDataMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: resetUserData,
    onSuccess: () => invalidateUserData(queryClient),
  })
}

export const useImportUserDataMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<UserDataExport>) => importUserData(data),
    onSuccess: () => invalidateUserData(queryClient),
  })
}
