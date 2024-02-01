export const colorizeRatingStar = (rating: number): string => {
  let className = ''

  if (rating === 0) {
    className = ''
  } else if (rating === 1) {
    className = 'nthStar1'
  } else if (rating === 2) {
    className = 'nthStar2'
  } else if (rating === 3) {
    className = 'nthStar3'
  } else if (rating === 4) {
    className = 'nthStar4'
  } else if (rating === 5) {
    className = 'nthStar5'
  }

  return className
}