import { Menu } from '@headlessui/react';
import Image from 'next/image';

interface CustomMenuProps{
    title: string;
    state: string;
    filters: string[];
    setState: (state: string) => void;
}

const CustomMenu = ({title, setState, state, filters}: CustomMenuProps) => {
  return (
    <div className='flex-start flex-col w-full gap-7'>
        <label htmlFor={title} className='w-full text-gray-100'>
            {title}
        </label>
        <Menu as={'div'} className={'flexStart relative'}>
            <div>
                <Menu.Button className={'flexCenter custom_menu-btn'}>
                    {state || 'Select a category'}
                    <Image src={'/arrow-down.svg'} width={10} height={6} alt='arrow-down' />
                </Menu.Button>
            </div>
            <Menu.Items className={'custom_menu-items flexStart'}>
                {filters.map(category =>(
                    <Menu.Item key={category}>
                        <button onClick={(e)=> setState(e.currentTarget.value)} type='button' value={category} className='custom_menu-item'>
                             {category}
                        </button>
                    </Menu.Item>
                ))}
            </Menu.Items>
        </Menu>
    </div>
  )
}

export default CustomMenu