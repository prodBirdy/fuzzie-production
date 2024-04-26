import { CardBody, CardContainer, CardItem } from '@/components/global/3d-card'
import { HeroParallax } from '@/components/global/connect-parallax'
import { ContainerScroll } from '@/components/global/container-scroll-animation'
import { InfiniteMovingCards } from '@/components/global/infinite-moving-cards'
import { LampComponent } from '@/components/global/lamp'
import Navbar from '@/components/global/navbar'
import { Button } from '@/components/ui/button'
import { clients, products } from '@/lib/constant'
import { CheckIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {

  return (
    <main className="flex items-center justify-center flex-col">
      <Navbar />

      <LampComponent />

      <Link href="/dashboard">
        <Button>
          Enter
        </Button>
      </Link>

      

    </main>
  )
}
