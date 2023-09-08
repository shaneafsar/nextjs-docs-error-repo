export const cookieExists = (
  name: string,
  cookieHeader: string | null
): boolean => {
  if (!cookieHeader) return false;
  const cookiePattern = new RegExp("(^| )" + name + "=([^;]+)");
  return cookiePattern.test(cookieHeader);
};
