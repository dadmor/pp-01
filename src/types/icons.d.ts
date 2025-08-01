// src/types/icons.d.ts
/// <reference types="unplugin-icons/types/react" />

declare module '~icons/*' {
    import { FunctionComponent, SVGProps } from 'react'
    const component: FunctionComponent<SVGProps<SVGSVGElement>>
    export default component
  }
  
  declare module 'virtual:icons/*' {
    import { FunctionComponent, SVGProps } from 'react'
    const component: FunctionComponent<SVGProps<SVGSVGElement>>
    export default component
  }