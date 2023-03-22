import React from 'react'
import { TbWebhook } from 'react-icons/tb'


export default function TitleTag(props) {
  return (
    <span className='bg-sky-100 border-l border-b border-white text-black col-span-12 sm:col-span-2 sm:col-start-11 pl-4 rounded-l shadow-lg font-semibold pr-4 '><TbWebhook className='inline' /> {props.title}</span>
  )
}
