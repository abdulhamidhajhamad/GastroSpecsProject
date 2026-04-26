'use client'

import * as React from 'react'

import { machinesApi } from '@/lib/api/machines.api'
import type { Machine, MachineImage, MachineSupplier } from '@/types/machine'

type DrawerStep = 'info' | 'images' | 'suppliers'

type MachineApiResponse = Omit<Machine, 'images' | 'machineSuppliers'> & {
  images?: string[] | MachineImage[]
}

function mapMachineFromApi(machine: MachineApiResponse): Machine {
  const normalizedImages: MachineImage[] = Array.isArray(machine.images)
    ? machine.images.map((image, index) => {
        if (typeof image === 'string') {
          return {
            id: `${machine.id}-img-${index}`,
            machineId: machine.id,
            url: image,
            isPrimary: index === 0,
            order: index,
          }
        }

        return {
          id: image.id,
          machineId: image.machineId,
          url: image.url,
          isPrimary: Boolean(image.isPrimary),
          order: image.order ?? index,
        }
      })
    : []

  const normalizedSuppliers: MachineSupplier[] = machine.supplierId
    ? [
        {
          id: `${machine.id}-${machine.supplierId}`,
          machineId: machine.id,
          supplierId: machine.supplierId,
          supplierName: machine.supplierName ?? 'Unknown Supplier',
          costPrice: machine.costPrice ?? 0,
          moq: machine.moq ?? 0,
          leadTimeDays: machine.leadTimeDays,
          modelNumber: machine.modelNumber,
          qualityNotes: machine.notes,
          createdAt: machine.createdAt,
        },
      ]
    : []

  return {
    ...machine,
    images: normalizedImages,
    machineSuppliers: normalizedSuppliers,
  }
}

export function useMachines() {
  const [machines, setMachines] = React.useState<Machine[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [search, setSearch] = React.useState('')

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
  const [drawerStep, setDrawerStep] = React.useState<DrawerStep>('info')
  const [selectedMachine, setSelectedMachine] = React.useState<Machine | null>(null)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [machineToDelete, setMachineToDelete] = React.useState<Machine | null>(null)

  const [isAddSupplierDrawerOpen, setIsAddSupplierDrawerOpen] = React.useState(false)
  const [machineForSupplier, setMachineForSupplier] = React.useState<Machine | null>(null)

  const fetchMachines = React.useCallback(async (nextSearch?: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await machinesApi.list<MachineApiResponse[]>(nextSearch ?? search)
      setMachines(data.map(mapMachineFromApi))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch machines'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [search])

  React.useEffect(() => {
    void fetchMachines(search)
  }, [fetchMachines, search])

  const openAddDrawer = React.useCallback(() => {
    setSelectedMachine(null)
    setDrawerStep('info')
    setIsDrawerOpen(true)
  }, [])

  const openEditDrawer = React.useCallback((machine: Machine) => {
    setSelectedMachine(machine)
    setDrawerStep('info')
    setIsDrawerOpen(true)
  }, [])

  const closeDrawer = React.useCallback(() => {
    setIsDrawerOpen(false)
    setSelectedMachine(null)
    setDrawerStep('info')
  }, [])

  const openDeleteModal = React.useCallback((machine: Machine) => {
    setMachineToDelete(machine)
    setIsDeleteModalOpen(true)
  }, [])

  const closeDeleteModal = React.useCallback(() => {
    setIsDeleteModalOpen(false)
    setMachineToDelete(null)
  }, [])

  const confirmDelete = React.useCallback(async () => {
    if (!machineToDelete) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await machinesApi.delete(machineToDelete.id)
      await fetchMachines(search)
      closeDeleteModal()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete machine'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [machineToDelete, closeDeleteModal, fetchMachines, search])

  const openAddSupplierDrawer = React.useCallback((machine: Machine) => {
    setMachineForSupplier(machine)
    setIsAddSupplierDrawerOpen(true)
  }, [])

  const closeAddSupplierDrawer = React.useCallback(() => {
    setIsAddSupplierDrawerOpen(false)
    setMachineForSupplier(null)
  }, [])

  return {
    machines,
    isLoading,
    error,
    search,
    isDrawerOpen,
    drawerStep,
    selectedMachine,
    isDeleteModalOpen,
    machineToDelete,
    isAddSupplierDrawerOpen,
    machineForSupplier,
    setSearch,
    fetchMachines,
    openAddDrawer,
    openEditDrawer,
    setDrawerStep,
    closeDrawer,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
    openAddSupplierDrawer,
    closeAddSupplierDrawer,
  }
}
