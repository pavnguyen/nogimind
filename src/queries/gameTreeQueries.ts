import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getGameTree, updateGameTree } from '../repositories/gameTreeRepository'

export const useGameTreeQuery = () =>
  useQuery({
    queryKey: ['gameTree'],
    queryFn: getGameTree,
  })

export const useUpdateGameTreeMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateGameTree,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gameTree'] })
    },
  })
}
