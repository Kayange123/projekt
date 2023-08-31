import { footerLinks } from '@/constants/constants'
import { formatNumberWithCommas } from '@/utils/formatNumber'
import Image from 'next/image'
import Link from 'next/link'
import { type } from 'os'
import React from 'react'

type FooterProps = {
    title: string;
    links: string[];
}
const Footer = () => {
    const year: number  = new Date().getFullYear();
    const projectsSubmitted: string = formatNumberWithCommas(200);
  return (
    <footer className='flexStart footer'>
        <div className='flex flex-col gap-12 w-full '>
            <div className='flex items-start flex-col'>
                <Image src={'/logo-purple.svg'} alt='logo' width={115} height={40} />
                <p className='text-start mt-5 max-w-xs text-sm font-normal'>
                    Projekt is the best place to showcase your work, build your portfolio, and find inspiration from a global network of creators.
                </p>
            </div>
            <div className='flex flex-wrap gap-12'>
                <FooterColumn title={footerLinks[0].title} links={footerLinks[0].links} />
                <div className='flex flex-1 flex-col gap-4'>
                    <FooterColumn title={footerLinks[1].title} links={footerLinks[1].links} />
                    <FooterColumn title={footerLinks[2].title} links={footerLinks[2].links} />
                </div>
                <FooterColumn title={footerLinks[3].title} links={footerLinks[3].links} />
                <div className='flex flex-1 flex-col gap-4'>
                    <FooterColumn title={footerLinks[4].title} links={footerLinks[4].links} />
                    <FooterColumn title={footerLinks[5].title} links={footerLinks[5].links} />
                </div>
                <FooterColumn title={footerLinks[6].title} links={footerLinks[6].links} />
            </div>
        </div>
        <div className='flexBetween footer_copyright'>
            <p>@{year} Projekt - All rights reserved</p>
            <p className='text-black/60'>
                <span className='text-black font-semibold'>{projectsSubmitted+ " "}</span>  
                projects submitted
            </p>
        </div>
    </footer>
  )
}

export default Footer


const FooterColumn = ({title, links}: FooterProps) =>(
    <div className='footer_column'>
        <h4 className='font-semibold'>
            {title}
        </h4>
        <ul className='flex flex-col gap-2 font-normal'>
            {links.map((link) => (
                <Link href='/' key={link}>{link}</Link>
            ))}
        </ul>
    </div>
)