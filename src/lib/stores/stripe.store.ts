import { create } from 'zustand'

export type StripeState = {
  clientSecret: string | null
  setClientSecret: (clientSecret: string | null) => void
}

export const useStripeStore = create<StripeState>(set => ({
  clientSecret: null,
  setClientSecret: clientSecret =>
    set({
      clientSecret,
    }),
}))
