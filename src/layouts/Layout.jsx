// components/Layout.js
import { View } from 'react-native'
import React, { useState } from 'react'
import { Cart, Header } from '../components/index.components'

const Layout = ({ children }) => {
  const [openCart, setOpenCart] = useState(false)
  const toggleOpenCart = () => setOpenCart(!openCart)

  return (
    <View className="flex-1 flex flex-col">
      <Header toggleOpenCart={toggleOpenCart} />
      {children}
      <Cart openCart={openCart} toggleOpenCart={toggleOpenCart} />
    </View>
  )
}
export default Layout
