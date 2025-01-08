export const valideURLConvert = (name) => {
  return name
    ?.toString()
    .replace(/[\s,&#]+/g, "-") // Thay các ký tự đặc biệt bằng "-"
    .replace(/^-+|-+$/g, "") // Loại bỏ gạch ngang thừa ở đầu/cuối
    .toLowerCase();
};
