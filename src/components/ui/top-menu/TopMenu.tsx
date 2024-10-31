"use client";
import { useEffect, useState } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSession } from "next-auth/react";
import { logout } from '@/actions/auth/logout';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { IoSearchCircleOutline } from 'react-icons/io5';

export const TopMenu = () => {

    const { data: session } = useSession();
    const isAuthenticated = !!session?.user;
    const pathname = usePathname()

    return (

        <nav className="flex px-5 justify-between items-center w-full border-gray-200 dark:bg-gray-900">
            <div>
                <Link href="/">
                    <span className={`antialiased font-bold text-slate-50`}>
                        DUVENTUS
                    </span>
                </Link>
            </div>
            <div>
                <Link
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-800 text-slate-50"
                    href="/empleado/list"
                >
                    Empleados
                </Link>
                <Link
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-800 text-slate-50"
                    href="/usuarios/list"
                >
                    Usuarios
                </Link>
            </div>


            <div className="flex items-center text-slate-50 ">
                <h4 className={`text-right antialiased font-semibold my-7 text-gray-900 text-slate-50`}>Bienvenido {session?.user != undefined ? session?.user.name : ''}</h4>
                <Menu as="div" className="relative ml-3">
                    <div>
                        <MenuButton className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View User</span>
                            <UserIcon aria-hidden="true" className="h-6 w-6" />
                        </MenuButton>
                    </div>
                    <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                        <MenuItem>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                Your Profile
                            </a>
                        </MenuItem>
                        <MenuItem>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                Settings
                            </a>
                        </MenuItem>
                        {isAuthenticated && (
                            <MenuItem>
                                <a onClick={() => logout()} href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                    Sign out
                                </a>
                            </MenuItem>)}
                    </MenuItems>
                </Menu>
            </div>
        </nav>
    );
};
