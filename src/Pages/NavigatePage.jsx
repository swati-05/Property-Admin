import React from 'react'
import { useNavigate } from 'react-router-dom'

function NavigatePage() {
    const navigate = useNavigate()
    navigate('/home')
}

export default NavigatePage