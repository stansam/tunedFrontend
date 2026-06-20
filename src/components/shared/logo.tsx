import Image from 'next/image'
 
export default function Logo() {
  return (
    <Image
      src="/logo.svg"
      width={24}
      height={24}
      alt="logo"
    //   unoptimized={true}
    />
  )
}