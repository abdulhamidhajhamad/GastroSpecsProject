'use client'

import * as React from 'react'

import type { Machine } from '@/types/machine'

type DrawerStep = 'info' | 'images' | 'suppliers'

export function useMachines() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
  const [drawerStep, setDrawerStep] = React.useState<DrawerStep>('info')
  const [selectedMachine, setSelectedMachine] = React.useState<Machine | null>(null)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [machineToDelete, setMachineToDelete] = React.useState<Machine | null>(null)

  const [isAddSupplierDrawerOpen, setIsAddSupplierDrawerOpen] = React.useState(false)
  const [machineForSupplier, setMachineForSupplier] = React.useState<Machine | null>(null)

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

  const confirmDelete = React.useCallback(() => {
    if (machineToDelete) {
      console.log('Delete machine:', {
        id: machineToDelete.id,
        name: machineToDelete.name,
      })
    } else {
      console.log('Delete machine: no machine selected')
    }

    closeDeleteModal()
  }, [machineToDelete, closeDeleteModal])

  const openAddSupplierDrawer = React.useCallback((machine: Machine) => {
    setMachineForSupplier(machine)
    setIsAddSupplierDrawerOpen(true)
  }, [])

  const closeAddSupplierDrawer = React.useCallback(() => {
    setIsAddSupplierDrawerOpen(false)
    setMachineForSupplier(null)
  }, [])

  return {
    isDrawerOpen,
    drawerStep,
    selectedMachine,
    isDeleteModalOpen,
    machineToDelete,
    isAddSupplierDrawerOpen,
    machineForSupplier,
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
