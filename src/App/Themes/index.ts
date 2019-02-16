import colors, { colorsObject } from './colors'
import images, { imagesObject } from './images'
import metrics, { metricsObject } from './metrics'

export interface ThemeInterface {
  colors: colorsObject
  images: imagesObject
  metrics: metricsObject
}

export default {
  colors,
  images,
  metrics,
}
