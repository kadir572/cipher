import { create } from 'zustand'
import { StripeState } from '../types'

export const useStripeStore = create<StripeState>(set => ({
  clientSecret: null,
  setClientSecret: clientSecret =>
    set({
      clientSecret,
    }),
}))
