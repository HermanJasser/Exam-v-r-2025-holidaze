import React from 'react';
import { LuMapPinned } from "react-icons/lu";


const Header = () => {  
    return (    <header className="h-[80px] flex items-center justify-center bg-primBG w-full fixed top-0 left-0 z-50 px-20">
        <div className='flex max-w-screen-xl w-full'>
<a href="/">
    <img src="/assets/Holidaze.svg" alt="holidaze-logo" className='h-[35px]'/>
</a>

<a href="" className='flex items-center text-2xl font-medium font-dmsans'><LuMapPinned className='text-4xl mr-[2px]'/> Venue</a>
</div>
    </header>)
}

export default Header;