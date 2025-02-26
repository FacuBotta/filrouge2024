/**
 * Retrieves a string value from a FormData object. If the value is a string, it trims any extra whitespace.
 * If the key does not exist or the value is not a string, it returns null.
 *
 * @param {FormData} formData - The FormData object containing the form data.
 * @param {string} key - The key corresponding to the desired string value.
 * @returns {string | null} - The trimmed string value or null if the key is not found or the value is not a string.
 */
export const getFormDataStringValue = (
  formData: FormData,
  key: string
): string => {
  const value = formData.get(key);
  if (typeof value === 'string') {
    return value.trim();
  }
  return '';
};

/**
 * Retrieves a File object from a FormData object. If the value is a File, it returns the File object.
 * If the key does not exist or the value is not a File, it returns null.
 *
 * @param {FormData} formData - The FormData object containing the form data.
 * @param {string} key - The key corresponding to the desired File object.
 * @returns {File | null} - The File object or null if the key is not found or the value is not a File.
 */
export const getFormDataFileValue = (
  formData: FormData,
  key: string
): File | null => {
  const value = formData.get(key);
  if (value instanceof File) {
    return value;
  }
  return null;
};
