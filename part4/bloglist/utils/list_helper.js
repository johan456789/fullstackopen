const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.map(x => x.likes).reduce((acc, val) => acc + val, 0)
}


/*
 * The function finds out which blog has most likes.
 * If there are many top favorites, it is enough to return the first one.
 */
const favoriteBlog = (blogs) => {
  return blogs.reduce(
    (prev, cur) => (prev.likes >= cur.likes) ? prev : cur,
    { likes: 0 }
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}