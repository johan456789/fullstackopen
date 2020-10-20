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

/*
 * The function returns the author who has the largest amount of blogs.
 * If there are many top bloggers, it is enough to return any one of them.
 */
const mostBlogs = (blogs) => {
  let authorBlogCount = {}
  for (const i of blogs) {
    authorBlogCount[i.author] = {
      author: i.author,
      blogs: (authorBlogCount[i.author]) ? authorBlogCount[i.author].blogs + 1 : 1
    }
  }

  return Object.values(authorBlogCount).reduce(
    (prev, cur) => (prev.blogs >= cur.blogs) ? prev : cur,
    { blogs: 0 }
  )
}

/*
 * The function returns the author who has the largest amount of blogs.
 * If there are many top bloggers, it is enough to return any one of them.
 */
const mostLikes = (blogs) => {
  let authorLikeCount = {}
  for (const i of blogs) {
    authorLikeCount[i.author] = {
      author: i.author,
      likes: (authorLikeCount[i.author]) ? authorLikeCount[i.author].likes + i.likes : i.likes
    }
  }

  return Object.values(authorLikeCount).reduce(
    (prev, cur) => (prev.likes >= cur.likes) ? prev : cur,
    { likes: 0 }
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}