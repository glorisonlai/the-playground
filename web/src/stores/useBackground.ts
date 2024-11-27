import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useBackgroundStore = create(
  persist(
    (set, get) => ({
      bgId: 0,
      setBgId: (id) => set({bgId: id}),
      pwBg1: '',
      setBg1: (pw) => set({pgBg1: pw}),
      pwBg2: '',
      setBg2: (pw) => set({pgBg2: pw}),
      pwBg3: '',
      setBg3: (pw) => set({pgBg3: pw}),
      pwBg3: '',
      setBg3: (pw) => set({pgBg3: pw}),
      pwBg4: '',
      setBg4: (pw) => set({pgBg4: pw}),
    }),
    {
      name: 'background', // name of the item in the storage (must be unique)
    },
  )
)
