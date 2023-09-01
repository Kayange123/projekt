import AuthProviders from '@/components/AuthProviders'
import Modal from '@/components/Modal'
import React from 'react'

const Auth = () => {
  return (
    <Modal>
        <AuthProviders />
        <h1>Home</h1>
    </Modal>
  )
}

export default Auth