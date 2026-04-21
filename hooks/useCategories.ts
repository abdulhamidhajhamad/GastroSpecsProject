import { useState, useCallback } from 'react';
import { Category, SubCategory } from '../types/category';

type ModalMode = 'add-parent' | 'add-sub' | 'edit-parent' | 'edit-sub';

export function useCategories() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('add-parent');
  
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
  const [parentForNewSub, setParentForNewSub] = useState<Category | null>(null);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | SubCategory | null>(null);
  
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const openAddParentModal = useCallback(() => {
    setModalMode('add-parent');
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setParentForNewSub(null);
    setIsModalOpen(true);
  }, []);

  const openAddSubModal = useCallback((parent: Category) => {
    setModalMode('add-sub');
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setParentForNewSub(parent);
    setIsModalOpen(true);
  }, []);

  const openEditParentModal = useCallback((category: Category) => {
    setModalMode('edit-parent');
    setSelectedCategory(category);
    setSelectedSubCategory(null);
    setParentForNewSub(null);
    setIsModalOpen(true);
  }, []);

  const openEditSubModal = useCallback((sub: SubCategory, parent: Category) => {
    setModalMode('edit-sub');
    setSelectedCategory(null);
    setSelectedSubCategory(sub);
    setParentForNewSub(parent);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    // Optional: delay clearing to allow transition
    setTimeout(() => {
      setSelectedCategory(null);
      setSelectedSubCategory(null);
      setParentForNewSub(null);
      setModalMode('add-parent');
    }, 200);
  }, []);

  const openDeleteModal = useCallback((item: Category | SubCategory) => {
    setCategoryToDelete(item);
    setIsDeleteModalOpen(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setTimeout(() => {
      setCategoryToDelete(null);
    }, 200);
  }, []);

  const confirmDelete = useCallback(() => {
    if (!categoryToDelete) return;
    
    console.log(`Deleting category/subcategory with id: ${categoryToDelete.id}`);
    // Simulate delete process
    
    closeDeleteModal();
  }, [categoryToDelete, closeDeleteModal]);

  return {
    isModalOpen,
    modalMode,
    selectedCategory,
    selectedSubCategory,
    parentForNewSub,
    
    isDeleteModalOpen,
    categoryToDelete,
    
    isUploadingImage,
    setIsUploadingImage,
    
    openAddParentModal,
    openAddSubModal,
    openEditParentModal,
    openEditSubModal,
    closeModal,
    
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  };
}
