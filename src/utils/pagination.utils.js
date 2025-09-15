export const getPegination = (current_page, total_count, query_limit) => {
  const total_pages = Math.ceil(total_count / query_limit);
  return {
    current_page,
    next_page:
      Number(current_page) < total_pages ? Number(current_page) + 1 : null,
    previous_page: Number(current_page) > 1 ? Number(current_page) - 1 : null,
    total_pages,
    total_count,
  };
};
