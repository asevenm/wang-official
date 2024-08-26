'use client';

import React from "react";
import { NavbarMenuToggle, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, NavbarMenu, NavbarMenuItem, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import {SearchIcon} from "./SearchIcon";
import {AcmeLogo} from "./AcmeLogo";
import { usePathname } from "next/navigation";

const navs = [
  { name: '首页', href: '/' },
  { name: '公司简介', href: '/about' },
  { name: '产品展示', href: '/product' },
  // { name: '耗材试剂', href: '/comsumables' },
  // { name: '技术资料', href: '/tech' },
  // { name: '代理品牌', href: '/agent' },
  { name: '联系我们', href: '/contact' },
  { name: '公司新闻', href: '/news' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand className="mr-4">
          <AcmeLogo />
          <p className="hidden sm:block font-bold text-inherit">ACME</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3">
          {navs.map((nav) => {
            const isActive = pathname === nav.href;
            return (
              <NavbarItem key={nav.href} isActive={isActive}>
                <Link
                  className="rounded-md px-1 py-2 text-sm font-medium"
                  color={isActive ? "primary" : "foreground"}  href={nav.href}>
                  {nav.name}
                </Link>
              </NavbarItem>
            )
          })}
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="关键字搜索..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarMenu>
        {navs.map((item) => {
          const isActive = item.href === pathname;
          return (
            <NavbarMenuItem key={item.href}>
              <Link
                color={
                  isActive ? "primary" : "foreground"
                }
                className="w-full"
                href={item.href}
                size="lg"
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          )
        })}
      </NavbarMenu>
    </Navbar>
  );
}
