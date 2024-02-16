import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      FREE_DELIVERY_THRESHOLD: 200,
      SMALL_ORDER_SURCHARGE: 10,
      DISTANCE_BASE_DISTANCE: 1000,
      DISTANCE_BASE_COST: 2,
      DISTANCE_SURCHARGE_DISTANCE: 500,
      DISTANCE_SURCHARGE_UNIT_COST: 1,
      ITEM_SURCHARGE_BASE_ITEMS: 4,
      ITEM_SURCHARGE_UNIT_COST: 0.5,
      ITEM_SURCHARGE_BULK_ITEMS: 12,
      ITEM_SURCHARGE_BULK_COST: 1.2,
      RUSH_HOUR_MULTIPLIER: 0.2,
      CAP_PRICE: 15,
    }
  }
})