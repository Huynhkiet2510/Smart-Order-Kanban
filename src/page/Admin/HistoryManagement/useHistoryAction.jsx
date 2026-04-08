import React, { useState } from 'react'

export const useHistoryAction = () => {
    const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
    const [selectOrder, setSelectOrder] = useState(null)

    const handleViewDetail = (order) => {
        setIsOpenDetailModal(true);
        setSelectOrder(order);
    }

    return {
        handleViewDetail,
        isOpenDetailModal,
        setIsOpenDetailModal,
        selectOrder,
        setSelectOrder
    }
}
