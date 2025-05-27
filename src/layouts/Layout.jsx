// components/Layout.js
import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Cart, Header } from 'components/index.components'

const Layout = ({ children, showBarSearch = true }) => {
  const [openCart, setOpenCart] = useState(false)
  const toggleOpenCart = () => setOpenCart(!openCart)

  useEffect(() => {
    console.log(showBarSearch)
  }, [showBarSearch])

  return (
    <View className="flex-1 flex flex-col ">
      <Header toggleOpenCart={toggleOpenCart} showBarSearch={showBarSearch} />
      {children}
      {openCart && <Cart openCart={openCart} toggleOpenCart={toggleOpenCart} />}
    </View>
  )
}
export default Layout
