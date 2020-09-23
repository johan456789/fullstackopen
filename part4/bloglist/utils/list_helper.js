const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.map(x => x.likes).reduce((acc, val) => acc + val, 0)
}

module.exports = {
  dummy,
  totalLikes
}