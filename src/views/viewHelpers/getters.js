export function getContainerByID(id) {
  return $('.disc-container').filter((idx, cont) => {
    return $(cont).data('containerID') === id;
  })
}

export function getDiscByID(id) {
  return $('.disc').filter((idx, disc) => {
    return $(disc).data('discID') === id;
  })
}