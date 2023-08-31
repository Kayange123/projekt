'use client'
import Image from 'next/image';
import React, { useCallback, useRef } from 'react'
import {useRouter} from 'next/navigation' 

const Modal = ({children}:{children: React.ReactNode}) => {
    const overlay = useRef<HTMLDivElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const onDismiss =useCallback(()=>{
        router.push('/');
    },[router]);

    const handleClick =useCallback((e: React.MouseEvent)=>{
        if((e.target=== overlay.current)&& onDismiss){
            onDismiss();
        }
    },[onDismiss, overlay]);
    
  return (
    <div ref={overlay} className='modal' onClick={handleClick}>
        <div onClick={onDismiss} className='absolute top-4 right-8 mb-3 cursor-pointer'>
            <Image src={'/close.svg'} alt='close' width={20} height={20} />
        </div>
        <div ref={wrapper} className='modal_wrapper'>
            {children}
        </div>
    </div>
  )
}

export default Modal