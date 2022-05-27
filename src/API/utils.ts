export function makeImagePath(id: string, format?: string) {
  if (id) {
    return `https://image.tmdb.org/t/p/${format ? format : 'original'}/${id}`;
  } else {
    return 'https://usagi-post.com/wp-content/uploads/2020/05/no-image-found-360x250-1.png';
  }
}

export function makeVideoPath(key?: string) {
  if (key) {
    return `https://www.youtube.com/embed/${key}`;
  } else {
    return 'https://usagi-post.com/wp-content/uploads/2020/05/no-image-found-360x250-1.png';
  }
}
