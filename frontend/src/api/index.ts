export const getBooks = async (page: number = 0, size: number = 12) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/get/page?page=${page}&size=${size}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Error fetching books");

  return await res.json();
};