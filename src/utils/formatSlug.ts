export default function formatSlug(brand: string, name: string): string {
   const slugify = (str: string) => {
      return str
         .toLowerCase()
         .trim()
         .replace(/[^\w\s-]/g, "") // Elimina caracteres especiales
         .replace(/[\s_-]+/g, "-") // Reemplaza espacios y guiones bajos con guiones
         .replace(/^-+|-+$/g, ""); // Elimina guiones del principio y final
   };

   const slugBrand = slugify(brand);
   const slugName = slugify(name);

   return `${slugBrand}-${slugName}`;
}
