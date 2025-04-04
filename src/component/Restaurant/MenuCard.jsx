import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addItemToCart } from "../State/Cart/Action"
import { Button, Card } from "@mui/material"

export const MenuCard = ({ item }) => {
  const [quantity, setQuantity] = useState(0)
  const dispatch = useDispatch()

  const handleAddToCart = (e) => {
    e.preventDefault()
    if (quantity === 0) {
      setQuantity(1)
      dispatch(
        addItemToCart({
          token: localStorage.getItem("jwt"),
          cartItem: {
            foodId: item.id,
            quantity: 1,
          },
        }),
      )
    }
  }

  const handleUpdateCartItem = (value) => {
    const newQuantity = quantity + value

    if (newQuantity < 1) {
      // Reset quantity if it goes below 1
      setQuantity(0)
      // Here you might want to add a removeFromCart action
      // For now, we'll use addItemToCart with quantity 0 to remove it
      dispatch(
        addItemToCart({
          token: localStorage.getItem("jwt"),
          cartItem: {
            foodId: item.id,
            quantity: 0,
          },
        }),
      )
    } else {
      setQuantity(newQuantity)
      dispatch(
        addItemToCart({
          token: localStorage.getItem("jwt"),
          cartItem: {
            foodId: item.id,
            quantity: value, // Send the increment/decrement value
          },
        }),
      )
    }
  }

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-col sm:flex-row items-center gap-4 p-4">
        {/* Food Image */}
        <div className="w-full sm:w-auto flex-shrink-0">
          <img
            className="w-full h-48 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover rounded-md mx-auto"
            src={item.images[0] || "/placeholder.svg"}
            alt={item.name}
          />
        </div>

        {/* Food Details */}
        <div className="flex-1 w-full">
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg md:text-xl">{item.name}</h3>
              <p className="font-medium text-base md:text-lg">₹{item.price}</p>
            </div>
            <p className="text-muted-foreground text-sm line-clamp-2">{item.description}</p>
          </div>

          {/* Add to Cart Button or Quantity Controls */}
          <div className="mt-4 flex justify-end">
            {quantity > 0 ? (
              <div className="flex items-center gap-3 bg-primary/10 rounded-full px-3 py-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => handleUpdateCartItem(-1)}
                >
                  <RemoveCircleOutlineIcon className="h-4 w-4" />
                </Button>
                <span className="font-medium text-base w-6 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => handleUpdateCartItem(1)}
                >
                  <AddCircleOutlineIcon className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button disabled={!item.available} variant="contained" className="rounded-full px-4 bg-rose-700" onClick={handleAddToCart}>
                {item.available ? "Add to Cart" : "Sold Out"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

