'use client'

import React, {useEffect, useState} from 'react'
import {getProviders,  signIn} from 'next-auth/react'


type Provider = {
  name: string;
  id: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | null;
}
type Providers = Record<string, Provider>;


const AuthProviders = () => {
const [providers, setProviders] = useState<Providers | null>(null);
  
useEffect(()=>{
  const fetchProviders = async () => {
    const res = await getProviders();
    setProviders(res);
  }

  fetchProviders();
},[])
if(providers){
  return (
    <div>
      {Object.values(providers).map((provider: Provider) => (
        <button type='button' onClick={()=> signIn(provider.id)} key={provider.id}>{provider.id}</button>
      ))}
    </div>
  )
}
}

export default AuthProviders